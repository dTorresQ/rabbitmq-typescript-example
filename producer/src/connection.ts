import client, { Connection, Channel, ConsumeMessage } from "amqplib";

import { rmqUser, rmqPass, rmqhost, NOTIFICATION_QUEUE } from "./config";
import { Console, log } from "console";

class RabbitMQConnection {
  connection!: Connection;
  channel!: Channel;
  private connected!: Boolean;

  async connect() {
    if (this.connected && this.channel) return;
    else this.connected = true;

    try {
      console.log(`⌛️ Connecting to Rabbit-MQ Server`);
      console.log(`rmqUser: ${rmqUser}`);
      console.log(`rmqPass: ${rmqPass}`);
      console.log(`rmqhost: ${rmqhost}`);
      console.log(`NOTIFICATION_QUEUE: ${NOTIFICATION_QUEUE}`);
      console.log(`Connection:  amqp://${rmqhost}:5672`);


   
      // this.connection = await client.connect(
      //   `amqp://${rmqUser}:${rmqPass}@${rmqhost}:15672`
      // );
      this.connection = await client.connect(
        `amqp://${rmqhost}:5672`
      );

      console.log(`✅ Rabbit MQ Connection is ready`);

      this.channel = await this.connection.createChannel();

      console.log(`🛸 Created RabbitMQ Channel successfully`);

      //await this.startListeningToNewMessages();
    } catch (error) {
      console.error(`ERROR: ${error}`);
      console.error(`Not connected to MQ Server`);
    } 
  }

  async startListeningToNewMessages() {
    await this.channel.assertQueue(NOTIFICATION_QUEUE, {
      durable: true, 
    });

    this.channel.consume( 
      NOTIFICATION_QUEUE,   
      (msg) => {  
        {
          if (!msg) {
            return console.error(`Invalid incoming message`);
          }

          handleIncomingNotification(msg?.content?.toString());

          this.channel.ack(msg);
        }
      },
      {
        noAck: false,
      }
    );   
  } 

 
 



  async sendToQueue(queue: string, message: any) {
    try {
      if (!this.channel) {
        await this.connect();
      }

      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)),{
        persistent: true,
        
      });
    } catch (error) {
      console.error(error);
      throw error;
    } 
  }

 




  async sendToExchange(queue: string, message: any) {
    try {
      if (!this.channel) {
        await this.connect();
      }

      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    } catch (error) {
      console.error(error);
      throw error;
    } 
  }

}




const handleIncomingNotification = (msg: string) => {
  try {
    const parsedMessage = JSON.parse(msg);

    console.log(`Received Notification`, parsedMessage);

    // Implement your own notification flow
  } catch (error) {
    console.error(`Error While Parsing the message`);
  }
};

const mqConnection = new RabbitMQConnection();

export default mqConnection;
   