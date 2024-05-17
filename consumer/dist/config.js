"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pattern = exports.exchangeName = exports.exchangeType = exports.queeAckRequired = exports.rmNotificationQuee = exports.rmqhost = exports.rmqPass = exports.rmqUser = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.rmqUser = String(process.env.RABBITMQ_USERNAME || "Dito_developer");
exports.rmqPass = String(process.env.RABBITMQ_PASSWORD || "123456789");
exports.rmqhost = String(process.env.RABBITMQ_URL || "localhost");
exports.rmNotificationQuee = String(process.env.NOTIFICATION_QUEUE || "@notification");
exports.queeAckRequired = String(process.env.QUEE_ACK_REQUIRED || "true");
exports.exchangeType = ("topic" || process.env.EXCHANGETYPE);
exports.exchangeName = ("my-topic" || process.env.EXCHANGE);
exports.pattern = String("" || process.env.PATTERN);
