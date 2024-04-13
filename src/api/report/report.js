import { request } from "@/utils/request";

const ReportApi = {
  addReport: "/interact/report/add",
};

/**
 * 新增举报
 */
export function addReportApi(data) {
  return request.post(ReportApi.addReport, {
    data,
  });
}
