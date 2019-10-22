export const mutations = {
  menuData(state, newData) {
    // console.log(newData);
    state.menuData = newData;
  },
  isCollapse(state, newvalue) {
    state.isCollapse = newvalue;
  },
  // formData(state, newvalue) {
  //   state.formData = newvalue;
  // },
  billStatus(state, newvalue) {
    state.billStatus = newvalue;
  }
  // tableData(state, newvalue) {
  //   state.tableData = newvalue;
  // }
};
