const Notification = ({ notification }) => {
  console.log("notification", notification, !notification);
  if (!notification) {
    return null;
  }
  const type =
    notification.type === "succes" || notification.type === "error"
      ? notification.type
      : "neutral";
  return <div className={type}>{notification.message}</div>;
};

export default Notification;
