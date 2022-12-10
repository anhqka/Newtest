import instance from "./instance";

const getCategories = () => {
  const api = "categories";
  return instance.get(api);
};

const addCategory = (data) => {
  const api = "categories";
  return instance.post(api, data);
};
const updateCategory = (data) => {
  const api = "categories/";
  return instance.put(api + data.id, data);
};
const removeCategory = (id) => {
  const api = "categories/";
  return instance.delete(api + id);
};

export { getCategories, addCategory, updateCategory, removeCategory };
