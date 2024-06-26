import client, { Connection, Channel, Options } from "amqplib";

import { rmqUser, rmqPass, rmqhost, rmNotificationQuee, queeAckRequired } from "./config";

type HandlerCB = (msg: string) => any;


class RabbitMQConnection {
  connection!: Connection;
  channel!: Channel;
  private connected!: Boolean;
  private queeConsumOptions : any;
  

  async connect() {
    if (this.connected && this.channel) return;

    try {
      console.log(`⌛️ Connecting to Rabbit-MQ Server`);
      console.log(`⌛️ Connecting to Rabbit-MQ Server`);
      console.log(`rmqUser: ${rmqUser}`);
      console.log(`rmqPass: ${rmqPass}`);
      console.log(`rmqhost: ${rmqhost}`);
      console.log(`NOTIFICATION_QUEUE: ${rmNotificationQuee}`);
      console.log(`Connection:  amqp://${rmqhost}:5672`);
      console.log(`ACK required: ${queeAckRequired}`);
      
      var queeAckRequiredAux = {queeAckRequired};
      //this.queeConsumOptions = { "noAck" : queeAckRequiredAux.queeAckRequired};

      var x = this.stringToBoolean(queeAckRequiredAux.queeAckRequired);
      this.queeConsumOptions = { "noAck" : x };


      
      

      console.log(JSON.stringify(this.queeConsumOptions));
      


      this.connection = await client.connect(
        `amqp://${rmqhost}:5672`
      );

      
      console.log(`✅ Rabbit MQ Connection is ready`);

      this.channel = await this.connection.createChannel();

      console.log(`🛸 Created RabbitMQ Channel successfully`);

      this.connected = true;
    } catch (error) {
      console.error(error);
      console.error(`Not connected to MQ Server`);
    } 
  }

  async consume(handleIncomingNotification: HandlerCB) {
    await this.channel.assertQueue(rmNotificationQuee, {
      durable: false,
    }); 

    this.channel.consume(rmNotificationQuee,
      (msg) => {
        {
          if (!msg) {
            return console.error(`Invalid incoming message`);
          }

          handleIncomingNotification(msg?.content?.toString());

          //this.channel.ack(msg);
        } 
      }   
      ,this.queeConsumOptions
      
    );
  }

   stringToBoolean(str: string): boolean {
    return str.toLowerCase() === 'true';
}

}

const mqConnection = new RabbitMQConnection();

export default mqConnection;
