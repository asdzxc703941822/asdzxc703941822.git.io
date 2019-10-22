function selectOrderMappers() {
  let mappers = new Map();
  //选单映射配置

  return mappers.set("机加工产量汇报", {
    FDate: "",
    FEmpNO: "FEmpNO",
    FEmpName: "FEmpName",
    FMOBillNo: "FInterID",
    FMOInterID: "FInterID",
    FGongXuNO: "FGongXuNO",
    FItemID: "FItemID",
    FMacID: "FMacID",
    FMacNO: "FMacID",

    FNumber: "FNumber",
    // FName: "FName",
    FBatchNO: "FBatchNO",
    FDeptName: "FDeptName"
    // FBegWorkTime: "FPlanBegDate",
    // FEndWorkTime: "FPlanEndDate",
    // FNote: "FNote"
  });
}

function handleData(mapper, rowData) {
  // if (!Array.isArray(mapper) && !$.isPlainObject(mapper)) throw new Error("mapper 需要是一个数组或者纯对象");
  let data = {};
  if (Array.isArray(mapper)) {
    mapper.forEach(toKey => {
      if (rowData.hasOwnProperty(toKey)) {
        data[toKey] = rowData[toKey];
      }
    });
  } else {
    Object.keys(mapper).forEach(toKey => {
      let fromKey = mapper[toKey] || toKey;
      if (rowData.hasOwnProperty(fromKey)) {
        data[toKey] = rowData[fromKey];
      }
    });
  }
  return data;
}
export { selectOrderMappers, handleData };
