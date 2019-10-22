import request from "./axios";
export function RollCollQuery(data) {
  return request({
    method: "post",
    url: "HR_DailyRecord/GetPageList",
    data
  });
}
export function RollCollDelete(params) {
  return request({
    method: "get",
    url: "HR_DailyRecord/Delete",
    params
  });
}
export function LeaveQuery(data) {
  return request({
    method: "post",
    url: "HR_Leave/GetPageList",
    data
  });
}
export function LeaveDelete(params) {
  return request({
    method: "get",
    url: "HR_Leave/Delete",
    params
  });
}
export function repairQuery(data) {
  return request({
    method: "post",
    url: "HR_DailyReRecord/GetPageList",
    data
  });
}
export function repairDelete(params) {
  return request({
    method: "get",
    url: "HR_DailyReRecord/Delete",
    params
  });
}
export function dailySureQuery(data) {
  return request({
    method: "post",
    url: "HR_DailySure/GetPageList",
    data
  });
}
export function dailySureDelete(params) {
  return request({
    method: "get",
    url: "HR_DailySure/Delete",
    params
  });
}
