import { toast } from "react-toastify";
export const notify = (message, type = "error") => {
  if (type === "success") toast.success(message);
  else toast.error(message);
};
