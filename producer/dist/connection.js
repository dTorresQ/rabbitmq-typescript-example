"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
const config_1 = require("./config");
class RabbitMQConnection {
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connected && this.channel)
                return;
            else
                this.connected = true;
            try {
                console.log(`⌛️ Connecting to Rabbit-MQ Server`);
                console.log(`rmqUser: ${config_1.rmqUser}`);
                console.log(`rmqPass: ${config_1.rmqPass}`);
                console.log(`rmqhost: ${config_1.rmqhost}`);
                console.log(`NOTIFICATION_QUEUE: ${config_1.NOTIFICATION_QUEUE}`);
                console.log(`Connection:  amqp://${config_1.rmqhost}:5672`);
                // this.connection = await client.connect(
                //   `amqp://${rmqUser}:${rmqPass}@${rmqhost}:15672`
                // );
                this.connection = yield amqplib_1.default.connect(`amqp://${config_1.rmqhost}:5672`);
                console.log(`✅ Rabbit MQ Connection is ready`);
                this.channel = yield this.connection.createChannel();
                console.log(`🛸 Created RabbitMQ Channel successfully`);
                //await this.startListeningToNewMessages();
            }
            catch (error) {
                console.error(`ERROR: ${error}`);
                console.error(`Not connected to MQ Server`);
            }
        });
    }
    startListeningToNewMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.channel.assertQueue(config_1.NOTIFICATION_QUEUE, {
                durable: true,
            });
            this.channel.consume(config_1.NOTIFICATION_QUEUE, (msg) => {
                var _a;
                {
                    if (!msg) {
                        return console.error(`Invalid incoming message`);
                    }
                    handleIncomingNotification((_a = msg === null || msg === void 0 ? void 0 : msg.content) === null || _a === void 0 ? void 0 : _a.toString());
                    this.channel.ack(msg);
                }
            }, {
                noAck: false,
            });
        });
    }
    sendToQueue(queue, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.channel) {
                    yield this.connect();
                }
                this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
                    persistent: true,
                });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    sendToExchange(queue, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.channel) {
                    yield this.connect();
                }
                this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
}
const handleIncomingNotification = (msg) => {
    try {
        const parsedMessage = JSON.parse(msg);
        console.log(`Received Notification`, parsedMessage);
        // Implement your own notification flow
    }
    catch (error) {
        console.error(`Error While Parsing the message`);
    }
};
const mqConnection = new RabbitMQConnection();
exports.default = mqConnection;
