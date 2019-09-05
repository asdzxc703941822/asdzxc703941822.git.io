import request from "./axios";
export function getMenue() {
  return request({
    method: "get",
    url: "/menue"
  });
}
