import instance from "./instance";

const getAllServices = (entpoint) => {
  let api = "";
  if (entpoint) {
    api = "services" + entpoint;
  } else {
    api = "services";
  }

  return instance.get(api);
};
const getServicesByCategory = (id) => {
  const api = "services/category/" + id;
  return instance.get(api);
};
const getOneServices = (id) => {
  const api = `services/${id}`;
  return instance.get(api);
};
const addServices = async (data) => {
  const api = "services";
  return instance.post(api, data);
};
const updateService = (services) => {
  const api = "services/" + services.get("id");
  return instance.post(api, services);
};
const removeServices = (id) => {
  const api = `services/`;
  return instance.delete(api + id);
};
export {
  getAllServices,
  getOneServices,
  addServices,
  updateService,
  removeServices,
  getServicesByCategory,
};
