import request from "./axios";
import axios from "axios";
let address;
if (process.env.NODE_ENV === "development") {
  address = "http://192.168.1.99:53559/";
} else if (process.env.NODE_ENV === "production") {
  address = "http://192.168.1.169:8088/";
}
export function getMenue() {
  return request({
    method: "get",
    url: "/menue"
  });
}
export function getUser() {
  return request({
    method: "get",
    url: "/User/GetLoginUser"
  });
}
export function login(params) {
  return axios.post(`${address}token`, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}
