import { BiCheckCircle, BiX } from "react-icons/bi";
import { FaClock } from "react-icons/fa6";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

/**
 * function that takes a key string like 'name' or 'name.first' and returns a function that takes an object and returns the value of the key in the object
 * @param key - the key to get the value of you cane dots for nesting values
 * @param obj - the object to get the value from
 */
export const getObjValue = <T = any>(key: string | number, obj: any) => {
  const keys = key.toString().split(".");
  let result = obj;
  for (const key of keys) {
    if (result && Object.prototype.hasOwnProperty.call(result, key)) {
      result = result[key];
    } else {
      return undefined;
    }
  }
  return result as T;
};

/**
 * @param error
 * @returns  a string error from response
 */
export const getResError = (error?: any) => {
  if (!error) return "Something Went Wrong";
  const isNetError = error?.message?.includes("Network Error");
  if (isNetError) return "Network Error";
  return (
    error?.response?.data?.error ??
    error?.response?.data?.message ??
    error?.message ??
    "Something Went Wrong"
  );
};

export const getStatusMeta = (status: string) => {
  switch (status?.toLowerCase()) {
    case "active":
      return { color: "#10A427" };
    case "inactive":
      return { color: "#F20A0A" };
    case "pending":
      return { color: "#1B60AC", icon: FaClock };
    case "rejected":
      return { color: "#F20A0A", icon: BiX, iconSize: 23 };
    case "approved":
      return { color: "#10A427", icon: BiCheckCircle };
    case "not completed":
      return { color: "#F20A0A", icon: BiX, iconSize: 23 };
    case "completed":
      return { color: "#10A427", icon: BiCheckCircle };
    default:
      return { color: "#CDCDCD" };
  }
};

export const decodeToken = (_token?: string) => {
  let data: any = null;
  try {
    const token = _token ?? Cookies.get("token");
    if (!token) {
      return data;
    }
    const decoded = jwtDecode(token.toString());
    data = decoded;
  } catch (error) {
    console.error("Error decoding token", error);
  }
  return data;
};

/**
 * @param str
 * @returns a capitalize string ex: 'HELLO_WORLD' => 'Hello World'
 */
export const capitalize = (str: string): string => {
  if (!str) return "";
  return str
    ?.split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
