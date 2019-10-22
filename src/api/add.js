import request from "./axios";
export function RollCollAdd(data) {
  return request({
    method: "post",
    url: "HR_DailyRecord/Add",
    data
  });
}
export function RollCollUpdate(data) {
  return request({
    method: "post",
    url: "HR_DailyRecord/Update",
    data
  });
}
export function RollCollGet(params) {
  return request({
    method: "get",
    url: "HR_DailyRecord/Get",
    params
  });
}
export function RollCollAudit(params) {
  return request({
    method: "get",
    url: "HR_DailyRecord/Audit",
    params
  });
}
export function RollCollUnAudit(params) {
  return request({
    method: "get",
    url: "HR_DailyRecord/UnAudit",
    params
  });
}
export function RollColl(data) {
  return request({
    method: "post",
    url: "Emp/GetPageList",
    data
  });
}
export function LeaveAdd(data) {
  return request({
    method: "post",
    url: "HR_Leave/Add",
    data
  });
}
export function LeaveUpdate(data) {
  return request({
    method: "post",
    url: "HR_Leave/Update",
    data
  });
}
export function LeaveGet(params) {
  return request({
    method: "get",
    url: "HR_Leave/Get",
    params
  });
}
export function LeaveAudit(params) {
  return request({
    method: "get",
    url: "HR_Leave/Audit",
    params
  });
}
export function LeaveUnAudit(params) {
  return request({
    method: "get",
    url: "HR_Leave/UnAudit",
    params
  });
}
export function repairAdd(data) {
  return request({
    method: "post",
    url: "HR_DailyReRecord/Add",
    data
  });
}
export function repairUpdate(data) {
  return request({
    method: "post",
    url: "HR_DailyReRecord/Update",
    data
  });
}
export function repairGet(params) {
  return request({
    method: "get",
    url: "HR_DailyReRecord/Get",
    params
  });
}
export function repairAudit(params) {
  return request({
    method: "get",
    url: "HR_DailyReRecord/Audit",
    params
  });
}
export function repairUnAudit(params) {
  return request({
    method: "get",
    url: "HR_DailyReRecord/UnAudit",
    params
  });
}
export function dailySureAdd(data) {
  return request({
    method: "post",
    url: "HR_DailySure/Add",
    data
  });
}
export function dailySureUpdate(data) {
  return request({
    method: "post",
    url: "HR_DailySure/Update",
    data
  });
}
export function dailySureGet(params) {
  return request({
    method: "get",
    url: "HR_DailySure/Get",
    params
  });
}
export function dailySureAudit(params) {
  return request({
    method: "get",
    url: "HR_DailySure/Audit",
    params
  });
}
export function dailySureUnAudit(params) {
  return request({
    method: "get",
    url: "HR_DailySure/UnAudit",
    params
  });
}
export function getLeaveType(data) {
  return request({
    method: "post",
    url: "SubMessage/GetPageList",
    data
  });
}
