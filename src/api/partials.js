import instance from "./instance";

const getBanners = () => {
    const api = "banners";
    return instance.get(api);
};
const addBanners = (data) => {
    const api = "banners";
    return instance.post(api, data);
};
const updateBanner = (data) => {
    const api = "banners/"+data.get("id");
    return instance.post(api, data);
};
const updateStatusBanner = (data) => {
    const api = "banners/update-status/"+data.get("id");
    return instance.post(api, data);
};
const updateStatusSocial = (data) => {
    const api = "socials/update-status/"+data.get("id");
    return instance.post(api, data);
};
const removeBanner = (id) => {
    const api = "banners/"+id;
    return instance.delete(api);
};

const getSocials = () => {
    const api = "socials";
    return instance.get(api);
};
const addSocials = (data) => {
    const api = "socials";
    return instance.post(api, data);
};
const removeSocial = (id) => {
    const api = "socials/"+id;
    console.log(api);
    return instance.delete(api);
};
const updateSocial = (data) => {
    const api = "socials/"+data.get("id");
    return instance.post(api, data);
};


export { getBanners, addBanners, removeBanner, updateBanner, updateStatusBanner,updateStatusSocial , getSocials, addSocials, removeSocial, updateSocial  };
