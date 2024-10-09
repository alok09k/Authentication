import toast from "react-hot-toast";

export const handleSuccess = (msg) => {
    toast.success(msg);
}
export const handleError = (msg) => {
    toast.error(msg);
}