import { NOTIFICATION_QUEUE } from "./config";
import mqConnection from "./connection";

export type INotification = {
  title: string;
  description: string;
};

export const sendNotification = async (notification: INotification) => {
  await mqConnection.sendToQueue(NOTIFICATION_QUEUE, notification);
  console.log("message " + JSON.stringify(notification));
};
