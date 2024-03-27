import sparkMD5 from "spark-md5";
import fileUtil from "./fileUtil";

export function MD5(file, callback) {
  const blobSlice =
    File.prototype.slice ||
    File.prototype.mozSlice ||
    File.prototype.webkitSlice;
  const chunkSize = fileUtil.getChunkSize();
  const chunks = Math.ceil(file.size / chunkSize);
  let currentChunk = 0;
  const spark = new sparkMD5.ArrayBuffer();
  const fileReader = new FileReader();

  fileReader.onload = function (e) {
    spark.append(e.target.result);
    currentChunk++;
    if (currentChunk < chunks) {
      loadNext();
    } else {
      callback(null, spark.end());
    }
  };

  fileReader.onerror = function () {
    callback("oops, something went wrong.");
  };

  function loadNext() {
    const start = currentChunk * chunkSize;
    const end = start + chunkSize >= file.size ? file.size : start + chunkSize;
    fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
  }

  loadNext();
}
