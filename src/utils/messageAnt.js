import { message } from "antd";

export const success = (pmess) => {
    message.success(pmess);
};
export const error = (pmess) => {
    message.error(pmess);
};
export const warning = (pmess) => {
    message.warning(pmess);
};