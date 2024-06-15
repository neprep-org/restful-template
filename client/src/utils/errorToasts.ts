import { toast, Bounce } from "react-toastify";

const showToast = (message: string, type: string) => {
  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  };

  switch (type) {
    case "success":
      toast.success(message, toastOptions as any);
      break;
    case "info":
      toast.info(message, toastOptions as any);
      break;
    case "warning":
      toast.warn(message, toastOptions as any);
      break;
    case "error":
      toast.error(message, toastOptions as any);
      break;
    default:
      toast(message, toastOptions as any);
  }
};

export default showToast;
