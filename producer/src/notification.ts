import { NOTIFICATION_QUEUE, exchangeName } from "./config";
import mqConnection from "./connection";

export type INotification = {
  title: string;
  description: string;
};

export const sendNotification = async (notification: INotification) => {
  await mqConnection.sendToQueue(NOTIFICATION_QUEUE, notification);
  console.log("message " + JSON.stringify(notification));
};

export const sendNotificationToExchange = async (notification: INotification) => {
  await mqConnection.sendToExchange(exchangeName, notification);
  console.log("message " + JSON.stringify(notification));
};

