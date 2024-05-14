import { config } from "dotenv";
config();

export const rmqUser = String(process.env.RABBITMQ_USERNAME || "Dito_developer");

export const rmqPass = String(process.env.RABBITMQ_PASSWORD || "123456789");

export const rmqhost = String(process.env.RABBITMQ_URL || "localhost");

export const rmNotificationQuee = String(process.env.NOTIFICATION_QUEUE || "@notification");

export const queeAckRequired = String(process.env.QUEE_ACK_REQUIRED || "true");

export const exchangeType= ("fanout" || process.env.EXCHANGETYPE);

export const exchangeName = ("my-fanout" || process.env.EXCHANGE);




 