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
            try {
                console.log(`⌛️ Connecting to Rabbit-MQ Server`);
                console.log(`⌛️ Connecting to Rabbit-MQ Server`);
                console.log(`rmqUser: ${config_1.rmqUser}`);
                console.log(`rmqPass: ${config_1.rmqPass}`);
                console.log(`rmqhost: ${config_1.rmqhost}`);
                console.log(`NOTIFICATION_QUEUE: ${config_1.rmNotificationQuee}`);
                console.log(`Connection:  amqp://${config_1.rmqhost}:5672`);
                console.log(`ACK required: ${config_1.queeAckRequired}`);
                var queeAckRequiredAux = { queeAckRequired: config_1.queeAckRequired };
                //this.queeConsumOptions = { "noAck" : queeAckRequiredAux.queeAckRequired};
                var x = this.stringToBoolean(queeAckRequiredAux.queeAckRequired);
                this.queeConsumOptions = { "noAck": x };
                console.log(JSON.stringify(this.queeConsumOptions));
                this.connection = yield amqplib_1.default.connect(`amqp://${config_1.rmqhost}:5672`);
                console.log(`✅ Rabbit MQ Connection is ready`);
                this.channel = yield this.connection.createChannel();
                console.log(`🛸 Created RabbitMQ Channel successfully`);
                this.connected = true;
            }
            catch (error) {
                console.error(error);
                console.error(`Not connected to MQ Server`);
            }
        });
    }
    consume(handleIncomingNotification) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.channel.assertQueue(config_1.rmNotificationQuee, {
                durable: false,
            });
            this.channel.consume(config_1.rmNotificationQuee, (msg) => {
                var _a;
                {
                    if (!msg) {
                        return console.error(`Invalid incoming message`);
                    }
                    handleIncomingNotification((_a = msg === null || msg === void 0 ? void 0 : msg.content) === null || _a === void 0 ? void 0 : _a.toString());
                    //this.channel.ack(msg);
                }
            }, this.queeConsumOptions);
        });
    }
    consumeExchange(handleIncomingNotification) {
        return __awaiter(this, void 0, void 0, function* () {
            this.channel.assertExchange(config_1.exchangeName, config_1.exchangeType);
            this.channel.assertQueue("@ms-1", { durable: true });
            this.channel.assertQueue("@ms-2", { durable: true });
            this.channel.assertQueue("@ms-3", { durable: true });
            this.channel.bindQueue("@ms-1", config_1.exchangeName, "*.orange.*");
            this.channel.bindQueue("@ms-2", config_1.exchangeName, "*.*.rabbit");
            this.channel.bindQueue("@ms-3", config_1.exchangeName, "lazy.#");
            //this.channel.bindQueue("@ms-2", exchangeName, "log.x.#");
            // this.channel.bindQueue("@ms-1", exchangeName, "ZYX");
            // this.channel.bindQueue("@ms-2", exchangeName, "ZYX");
            // this.channel.bindQueue("@ms-1", exchangeName, "T");
            // this.channel.bindQueue("@ms-2", exchangeName, "U");
            // this.channel.bindQueue("@ms-3", exchangeName, "BATCH_LIQUIDACION");
            // this.channel.bindQueue("@ms-1", exchangeName, "BATCH_LIQUIDACION");
            this.channel.consume(config_1.rmNotificationQuee, (msg) => {
                var _a;
                {
                    if (!msg) {
                        return console.error(`Invalid incoming message`);
                    }
                    handleIncomingNotification((_a = msg === null || msg === void 0 ? void 0 : msg.content) === null || _a === void 0 ? void 0 : _a.toString());
                    //this.channel.ack(msg);
                }
            }, this.queeConsumOptions);
        });
    }
    stringToBoolean(str) {
        return str.toLowerCase() === 'true';
    }
}
const mqConnection = new RabbitMQConnection();
exports.default = mqConnection;
