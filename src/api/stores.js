import instance from "./instance";

const getStores = (entpoint) => {
  let api = ""

  if(entpoint){
    api = "stores" + entpoint;
  }else{
    api = "stores";
  }
  
  return instance.get(api);
};
const getAllStores = () => {
  const api = "stores"
  return instance.get(api);
};
const addStore = (data) => {
  const api = "stores";
  return instance.post(api, data);
};
const updateStore = (store) => {
  const api = "stores/" + store.get("id");
  return instance.post(api, store);
};

const removeStore = (id) => {
  const api = "stores/";
  return instance.delete(api + id);
};

const getServicesStore = (id) => {
  const api = `stores/${id}/choose-services`;
  return instance.get(api);
};

const updateServicesStore = (service) => {
  const api = `stores/${service.id}/choose-services`;
  return instance.post(api, service.data);
};

export {
  getStores,
  addStore,
  updateStore,
  removeStore,
  getServicesStore,
  updateServicesStore,
  getAllStores,
};
