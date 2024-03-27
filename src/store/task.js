import { defineStore } from "pinia";

export const useTaskStore = defineStore({
  id: "task",
  state() {
    return {
      // 任务列表
      taskList: [],
    };
  },
  getters: {
    getUploadTask(state) {
      return (filename) =>
        state.taskList.find((item) => item.filename === filename);
    },
  },
  actions: {
    addItem(taskItem) {
      if (
        taskItem.filename &&
        !this.taskList.map((item) => item.filename).includes(taskItem.filename)
      ) {
        this.taskList.push(taskItem);
      }
    },
    removeItem(task) {
      if (!task || !task.filename) {
        return;
      }
      const index = this.taskList.findIndex((item) => {
        return item.filename === task.filename;
      });
      this.taskList.splice(index, 1);
    },
    clearTaskList() {
      this.taskList = [];
    },
    updateTaskStatus({ filename, status, statusText }) {
      let taskItem = this.taskList.find((item) => item.filename == filename);

      taskItem.status = status;
      taskItem.statusText = statusText;
    },
    updateTaskProcess({ filename, percentage, uploadedSize }) {
      let taskItem = this.taskList.find(
        (taskItem) => taskItem.filename == filename
      );

      taskItem.percentage = percentage;
      taskItem.uploadedSize = uploadedSize;
    },
    updateTaskIdentifier(filename, identifier) {
      let taskItem = this.taskList.find(
        (taskItem) => taskItem.filename == filename
      );
      if (taskItem) {
        taskItem.identifier = identifier;
      }
    },
  },
});
