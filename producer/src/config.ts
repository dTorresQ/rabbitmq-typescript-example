import { config } from "dotenv";

config();

export const rmqUser = String("Dito_developer" || process.env.RABBITMQ_USERNAME);

export const rmqPass = String("123456789" || process.env.RABBITMQ_PASSWORD);

export const rmqhost = String("localhost" || process.env.RABBITMQ_URL);

export const NOTIFICATION_QUEUE = "@notification";
