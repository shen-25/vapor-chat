import { request } from "@/utils/request";

const CommentApi = {
  addComment: "/interact/comment/add",
  getComment: "/interact/comment/get",
};

/**
 * 创建评论
 */
export function addCommentApi(data) {
  return request.post(CommentApi.addComment, {
    data,
  });
}
/**
 * 获取评论
 */
export function getCommentListApi(param) {
  return request.get(CommentApi.getComment, { params: param });
}
