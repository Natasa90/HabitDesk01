interface NotificationData {
  status: "pending" | "success" | "error";
  title: string;
  message: string;
}

export const notificationStatus = (
  reqStatus: "pending" | "success" | "error" | null,
): NotificationData | null => {
  if (!reqStatus) return null;

  if (reqStatus === "pending") {
    return {
      status: "pending",
      title: "Sending Message...",
      message: "Your message is on its way.",
    };
  }

  if (reqStatus === "success") {
    return {
      status: "success",
      title: "Message Stored",
      message:
        "Thank you! We’ve received your message and will get back to you as soon as possible.",
    };
  }

  if (reqStatus === "error") {
    return {
      status: "error",
      title: "Oops...",
      message: "Something went wrong. Please try again later.",
    };
  }

  return null; // fallback, should never hit
};
