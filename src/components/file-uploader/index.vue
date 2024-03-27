<template>
  <div id="upload-content" v-if="show"></div>
</template>
<script>
import fileUtil from "@/utils/fileUtil";
import { onMounted, ref } from "vue";
import Uploader from "simple-uploader.js";
import { secondUploadApi, mergeChunkApi } from "@/api/common/file";
import { useTaskStore } from "@/store/task";
import { MD5 } from "@/utils/md5";
export default {
  name: "fileUpload",
  props: {
    show: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  emit: ["completeOneFile"],
  setup(props, { emit }) {
    const taskStore = useTaskStore();
    const uploadOptions = ref({
      // 目标上传 URL
      target: function () {
        if (fileUtil.getChunkSize() && fileUtil.getChunkSize() > 0) {
          return fileUtil.getUrlPrefix() + "/storage/file/chunk-upload";
        }
        return fileUtil.getUrlPrefix() + "/storage/file/upload";
      },

      // 单文件上传。覆盖式，如果选择了多个会把之前的取消掉。默认 false
      singleFile: false,

      // 分块时按照该值来分。最后一个上传块的大小是可能是大于等于1倍的这个值但是小于两倍的这个值大小
      chunkSize: fileUtil.getChunkSize(),

      // 是否强制所有的块都是小于等于 chunkSize 的值。默认是 false
      forceChunkSize: false,

      //并发上传数，默认 3
      simultaneousUploads: 3,

      //上传文件时文件的参数名，默认 file。
      fileParameterName: "file",

      /**
       *  其他额外的参数，这个可以是一个对象或者是一个函数，
          如果是函数的话，则会传入 Uploader.File 实例、
          当前块 Uploader.Chunk 以及是否是测试模式，默认为 {}。
       */
      query: function () {
        return {};
      },

      // 可选的函数用于根据 XHR 响应内容检测每个块是否上传成功了
      checkChunkUploadedByResponse: function (chunk, message) {
        let objMessage = {};
        try {
          objMessage = JSON.parse(message);
        } catch (e) {}
        // fake response
        // objMessage.uploaded_chunks = [2, 3, 4, 5, 6, 8, 10, 11, 12, 13, 17, 20, 21]
        // check the chunk is uploaded
        return (
          (objMessage.data.uploadedChunks || []).indexOf(chunk.offset + 1) >= 0
        );
      },

      // 最大自动失败重试上传次数，值可以是任意正整数，如果是 undefined 则代表无限次，默认 0。
      maxChunkRetries: 0,

      //重试间隔，值可以是任意正整数，如果是 null 则代表立即重试，默认 null。
      chunkRetryInterval: null,

      //进度回调间隔，默认是 500。
      progressCallbacksInterval: 500,

      //响应式成功的响应码，默认 [200, 201,  202]
      successStatuses: [200, 201, 202],

      // 出错的响应码，默认 [404, 415, 500, 501]
      permanentErrors: [404, 415, 500, 501],

      // 初始文件 paused 状态，默认 false
      initialPaused: false,
    });

    // uploader实例
    const uploader = ref(null);

    /**
     * 初始化
     */
    function initUploader() {
      const simpleUpload = new Uploader(uploadOptions.value);
      // 如果不支持 需要降级的地方
      if (!simpleUpload.support) {
        console.error("本浏览器不支持simple-uploader,请更换浏览器重试");
        return;
      }
      // 绑定进队列 文件添加 单个文件
      simpleUpload.on("filesAdded", filesAdded);
      // 绑定进度,一个文件在上传中
      simpleUpload.on("fileProgress", fileProgress);
      // 上传成功监听,单个文件上传成功
      simpleUpload.on("fileSuccess", fileSuccess);
      // 上传全部完成调用
      simpleUpload.on("complete", uploadComplete);
      // 上传出错调用,某个文件上传失败了
      simpleUpload.on("fileError", uploadError);

      // 根下的单个文件（文件夹）上传完成
      simpleUpload.on("fileComplete", function (rootFile) {
        console.log(rootFile);
      });
      uploader.value = simpleUpload;
    }

    /**
     * 绑定指定 DOM 元素可以选择上传
     */
    function rebindUploader() {
      if (!uploader.value.support) {
        console.error("本浏览器不支持simple-uploader,请更换浏览器重试");
        return;
      }
      uploader.value.assignBrowse(document.getElementById("upload-content"));
      uploader.value.assignDrop(document.getElementById("upload-content"));
    }

    /**
     * 文件添加 用作多个文件的校验
     */
    function filesAdded(files, fileList, event) {
      try {
        files.forEach((file) => {
          // 暂停上传
          file.pause();
          // 文件如果大小最大上传字节
          if (file.size > fileUtil.getMaxFileSize()) {
            throw new Error(
              `${
                file.name
              }大小超过了最大上传文件的限制(${fileUtil.getMaxFileSize()})`
            );
          }
          const task = {
            filename: file.name,
            identifier: undefined,
            totalSize: file.size,
            status: fileUtil.taskStatus.PARSING.code,
            statusText: fileUtil.taskStatus.PARSING.text,
            percentage: 0,
            uploadedSize: fileUtil.translateFileSize(0),
          };
          // 添加
          taskStore.addItem(task);
          // 计算文件md5
          MD5(file.file, async (e, md5) => {
            file["uniqueIdentifier"] = md5;
            // taskStore中的一项数据
            taskStore.updateTaskIdentifier(file.name, md5);
            // 秒传功能
            secondUploadApi({
              filename: file.name,
              identifier: md5,
            })
              .then((res) => {
                const { code, msg, data } = res;
                if (code !== 0) {
                  // 继续上传,任务没有完成
                  file.resume();
                } else {
                  // 任务上传完成
                  console.log(`文件: ${file.name} 上传完成`);
                  file.cancel();
                  // store删除任务
                  taskStore.removeItem(task);
                  emit("completeOneFile", data);
                }
              })
              .catch((error) => {
                f.resume();
                taskStore.updateTaskStatus({
                  filename: file.name,
                  status: fileUtil.taskStatus.WAITING.code,
                  statusText: fileUtil.taskStatus.WAITING.text,
                });
              });
          });
        });
      } catch (e) {
        console.error(e.message);
        //取消所有上传文件，文件会被移除掉
        uploader.value.cancel();
        taskStore.clearTaskList();
        return false;
      }
      return true;
    }

    //绑定进度
    function fileProgress(rootFile, file, chunk) {
      let taskItem = taskStore.getUploadTask(file.name);
      // 更新task的状态
      if (file.isUploading()) {
        if (taskItem.status !== fileUtil.taskStatus.UPLOADING.code) {
          taskStore.updateTaskStatus({
            filename: file.name,
            status: fileUtil.taskStatus.UPLOADING.code,
            statusText: fileUtil.taskStatus.UPLOADING.text,
          });
        }
        // 更新task的进度
        taskStore.updateTaskProcess({
          filename: file.name,
          percentage: Math.floor(file.progress() * 100),
          uploadedSize: fileUtil.translateFileSize(file.sizeUploaded()),
        });
      }
    }

    /**
     *  一个文件上传成功事件
     */
    function fileSuccess(rootFile, file, message, chunk) {
      let res = {};
      try {
        res = JSON.parse(message);
      } catch (e) {}
      if (res.code === 0) {
        // 后端成功返回判断是否可以合并
        if (res.data.mergeFlag) {
          doMerge(file);
        } else if (
          res.data.uploadedChunks &&
          res.data.uploadedChunks.length === file.chunks.length
        ) {
          doMerge(file);
        }
      } else {
        // 失败,更新状态
        file.pause();
        taskStore.updateTaskStatus({
          filename: file.name,
          status: fileUtil.taskStatus.FAIL.code,
          statusText: fileUtil.taskStatus.FAIL.text,
        });
      }
    }

    /**
     * 上传全部完成调用
     */
    function uploadComplete() {}

    function uploadError(rootFile, file, message, chunk) {
      taskStore.updateTaskStatus({
        filename: file.name,
        status: fileUtil.taskStatus.FAIL.code,
        statusText: fileUtil.taskStatus.FAIL.text,
      });
      this.updateTaskProcess({
        filename: file.name,
        percentage: 0,
        uploadedSize: fileUtil.translateFileSize(0),
      });
    }

    async function doMerge(file) {
      // 根据文件名称获取上传任务
      const taskItem = taskStore.getUploadTask(file.name);

      // 更新上传任务为合并
      taskStore.updateTaskStatus({
        filename: taskItem.filename,
        status: fileUtil.taskStatus.MERGE.code,
        statusText: fileUtil.taskStatus.MERGE.text,
      });
      // 更新上传任务进度条
      taskStore.updateTaskProcess({
        filename: taskItem.filename,
        percentage: 99,
        uploadedSize: fileUtil.translateFileSize(file.sizeUploaded()),
      });

      const { code, msg, data } = await mergeChunkApi({
        filename: taskItem.filename,
        identifier: taskItem.identifier,
        totalSize: taskItem.totalSize,
      });
      if (code !== 0) {
        file.parse();
        taskStore.updateTaskStatus({
          filename: file.name,
          status: fileUtil.taskStatus.FAIL.code,
          statusText: fileUtil.taskStatus.FAIL.text,
        });
        return;
      }
      emit("completeOneFile", data);

      console.log(`${file.name}上传成功`);

      // 从上传列表中移除一个指定的 Uploader.File 实例对象。
      uploader.value.removeFile(file);
    }

    onMounted(() => {
      initUploader();
      rebindUploader();
    });
  },
};
</script>
<style lang="scss" scoped></style>
