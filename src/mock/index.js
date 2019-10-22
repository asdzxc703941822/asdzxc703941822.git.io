import Mock from "mockjs";
// import router from "/router";
const template = {
  data: [
    // {
    //   attributes: {
    //     ActionName: null,
    //     ControllerName: null,
    //     Params: { path: "/pickingProRate" },
    //     url: "pickingProRate"
    //   },
    //   children: [],
    //   id: 1,
    //   state: "",
    //   text: "领料进度"
    // },
    // {
    //   attributes: { ActionName: null, ControllerName: null, Params: { path: "/assembleRate" }, url: "assembleRate" },
    //   children: [],
    //   id: 1,
    //   state: "",
    //   text: "装配进度看板"
    // },
    // {
    //   attributes: { ActionName: null, ControllerName: null, Params: { path: "/machiningRate" }, url: "machiningRate" },
    //   children: [],
    //   id: 1,
    //   state: "",
    //   text: "机加工看板"
    // },
    // {
    //   attributes: {
    //     ActionName: null,
    //     ControllerName: null,
    //     Params: { path: "/productionReport" },
    //     url: "productionReport/index.vue"
    //   },
    //   children: [
    //     {
    //       attributes: {
    //         ActionName: null,
    //         ControllerName: null,
    //         Params: { path: "/productionReport/query" },
    //         url: "productionReport/taskListQuery.vue"
    //       },
    //       children: [],
    //       id: 1,
    //       state: "",
    //       text: "任务单查询"
    //     },
    //     {
    //       attributes: {
    //         ActionName: null,
    //         ControllerName: null,
    //         Params: { path: "/productionReport/add" },
    //         url: "productionReport/productionReport.vue"
    //       },
    //       children: [],
    //       id: 1,
    //       state: "",
    //       text: "产量汇报查询"
    //     }
    //   ],
    //   id: 1,
    //   state: "",
    //   text: "产量汇报管理"
    // },
    {
      attributes: {
        ActionName: null,
        ControllerName: null,
        Params: { path: "/personnelDepartment" },
        url: "personnelDepartment"
      },
      children: [
        {
          attributes: {
            ActionName: null,
            ControllerName: null,
            Params: { path: "/personnelDepartment/statement" },
            url: "personnelDepartment/statement"
          },
          children: [],
          id: 1,
          state: "",
          text: "日考勤报表"
        },
        {
          attributes: {
            ActionName: null,
            ControllerName: null,
            Params: { path: "/personnelDepartment/correctTheTimeClockCard" },
            url: "personnelDepartment/correctTheTimeClockCard"
          },
          children: [
            {
              attributes: {
                ActionName: null,
                ControllerName: null,
                Params: { path: "/personnelDepartment/correctTheTimeClockCard/add" },
                url: "personnelDepartment/correctTheTimeClockCard/correctTheTimeClockCard"
              },
              children: null,
              id: 1,
              state: "",
              text: "补卡单"
            },
            {
              attributes: {
                ActionName: null,
                ControllerName: null,
                Params: { path: "/personnelDepartment/correctTheTimeClockCard/query" },
                url: "personnelDepartment/correctTheTimeClockCard/query"
              },
              children: null,
              id: 1,
              state: "",
              text: "补卡单查询"
            }
          ],
          id: 1,
          state: "",
          text: "补卡单管理"
        },
        {
          attributes: {
            ActionName: null,
            ControllerName: null,
            Params: { path: "/personnelDepartment/dailyAttendanceResultsConfirm" },
            url: "personnelDepartment/dailyAttendanceResultsConfirm"
          },
          children: [
            {
              attributes: {
                ActionName: null,
                ControllerName: null,
                Params: { path: "/personnelDepartment/dailyAttendanceResultsConfirm/add" },
                url: "personnelDepartment/dailyAttendanceResultsConfirm/dailyAttendanceResultsConfirm"
              },
              children: null,
              id: 1,
              state: "",
              text: "日考勤结果确认"
            },
            {
              attributes: {
                ActionName: null,
                ControllerName: null,
                Params: { path: "/personnelDepartment/dailyAttendanceResultsConfirm/query" },
                url: "personnelDepartment/dailyAttendanceResultsConfirm/query"
              },
              children: null,
              id: 1,
              state: "",
              text: "日考勤结果确认查询"
            }
          ],
          id: 1,
          state: "",
          text: "日考勤结果确认管理"
        },
        {
          attributes: {
            ActionName: null,
            ControllerName: null,
            Params: { path: "/personnelDepartment/noteForLeave" },
            url: "personnelDepartment/noteForLeave"
          },
          children: [
            {
              attributes: {
                ActionName: null,
                ControllerName: null,
                Params: { path: "/personnelDepartment/noteForLeave/add" },
                url: "personnelDepartment/noteForLeave/leave"
              },
              children: null,
              id: 1,
              state: "",
              text: "请假单"
            },
            {
              attributes: {
                ActionName: null,
                ControllerName: null,
                Params: { path: "/personnelDepartment/noteForLeave/query" },
                url: "personnelDepartment/noteForLeave/query"
              },
              children: null,
              id: 1,
              state: "",
              text: "请假单查询"
            }
          ],
          id: 1,
          state: "",
          text: "请假单管理"
        },
        {
          attributes: {
            ActionName: null,
            ControllerName: null,
            Params: { path: "/personnelDepartment/theRollCall" },
            url: "personnelDepartment/theRollCall"
          },
          children: [
            {
              attributes: {
                ActionName: null,
                ControllerName: null,
                Params: { path: "/personnelDepartment/theRollCall/add" },
                url: "personnelDepartment/theRollCall/theRollCall"
              },
              children: null,
              id: 1,
              state: "",
              text: "点名"
            },
            {
              attributes: {
                ActionName: null,
                ControllerName: null,
                Params: { path: "/personnelDepartment/theRollCall/query" },
                url: "personnelDepartment/theRollCall/query"
              },
              children: null,
              id: 1,
              state: "",
              text: "点名查询"
            }
          ],
          id: 1,
          state: "",
          text: "点名管理"
        }
      ],
      id: 1,
      state: "",
      text: "人事管理"
    }
  ]
};
// const template = {
//   "data|1-3": "fsdjf"
// };
let address;
if (process.env.NODE_ENV === "development") {
  address = "http://192.168.1.99:53559/";
} else if (process.env.NODE_ENV === "production") {
  address = "http://192.168.1.169:8088/";
}
Mock.mock(`${address}api/menue`, template);
