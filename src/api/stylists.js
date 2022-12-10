import instance from "./instance";

const getAllStylist = (entpoint) => {
  const api = "staffs" + entpoint;
  return instance.get(api);
};
const getStylist = (id) => {
  const api = `staffs/show/${id}`;
  return instance.get(api);
};
const addStylist = (data) => {
  const api = "staffs/store";
  return instance.post(api, data);
};
const updateStylist = (data) => {
  const api = `staffs/update/` + data.get("id");
  return instance.put(api, data);
};
const datePicker = () => {
  const api = `staffs/staff-calendrier`;
  return instance.get(api);
};
const getSchedule = () => {
  const api = "staff-times/create";
  return instance.get(api);
};
const addSchedule = (schedule) => {
  const api = `staff-times/store`;
  return instance.post(api, schedule.data);
};
export {
  getAllStylist,
  getStylist,
  addStylist,
  updateStylist,
  datePicker,
  getSchedule,
  addSchedule,
};
