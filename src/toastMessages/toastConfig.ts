// utils/toastConfig.ts

export type ToastType = "success" | "warning" | "alert" | "error" | "loading" | "info";

export const toastStyles: Record<
  ToastType,
  {
    bg: string;
    label: string;
    labelColor: string;
    border: string;
    iconBg: string;
    closeBg: string;
    icon: string; // SVG path or identifier
  }
> = {
  success: {
    bg: "bg-green-50",
    label: "Success",
    labelColor: "text-green-500",
    border: "border-green-500",
    iconBg: "bg-green-500",
    closeBg: "bg-green-500",
    icon: "success",
  },
  warning: {
    bg: "bg-yellow-50",
    label: "Warning",
    labelColor: "text-yellow-500",
    border: "border-yellow-400",
    iconBg: "bg-yellow-400",
    closeBg: "bg-yellow-400",
    icon: "warning",
  },
  alert: {
    bg: "bg-orange-50",
    label: "Alerts",
    labelColor: "text-orange-500",
    border: "border-orange-400",
    iconBg: "bg-orange-400",
    closeBg: "bg-orange-400",
    icon: "alert",
  },
  error: {
    bg: "bg-red-50",
    label: "Error",
    labelColor: "text-red-500",
    border: "border-red-500",
    iconBg: "bg-red-500",
    closeBg: "bg-red-500",
    icon: "error",
  },
  loading: {
    bg: "bg-purple-50",
    label: "Loading",
    labelColor: "text-purple-500",
    border: "border-purple-500",
    iconBg: "bg-purple-500",
    closeBg: "bg-purple-500",
    icon: "loading",
  },
  info: {
    bg: "bg-blue-50",
    label: "No Data Found",
    labelColor: "text-blue-500",
    border: "border-blue-400",
    iconBg: "bg-blue-400",
    closeBg: "bg-blue-400",
    icon: "info",
  },
};