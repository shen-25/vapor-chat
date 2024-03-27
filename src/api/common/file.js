import { request } from "@/utils/fileRequest";

const FileApi = {
  secUpload: "/storage/file/second-upload",
  mergeChunk: "/storage/file/merge",
};

export function secondUploadApi(data) {
  return request.post(FileApi.secUpload, {
    data,
  });
}
export function mergeChunkApi(data) {
  return request.post(FileApi.mergeChunk, {
    data,
  });
}
