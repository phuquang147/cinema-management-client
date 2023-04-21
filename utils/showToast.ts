import { toast } from "react-hot-toast";

export default function showToast(type: "success" | "error", content: string) {
  if (type == "success")
    toast.success(content, {
      style: {
        border: "1px solid #51cf66",
        padding: "16px",
        color: "#51cf66",
        backgroundColor: "#222",
      },
      iconTheme: {
        primary: "#51cf66",
        secondary: "#FFFAEE",
      },
    });
  else
    toast.error(content, {
      style: {
        border: "1px solid #ff6b6b",
        padding: "16px",
        color: "#ff6b6b",
        backgroundColor: "#222",
      },
      iconTheme: {
        primary: "#ff6b6b",
        secondary: "#FFFAEE",
      },
    });
}
