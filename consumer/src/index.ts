import mqConnection from "./connection";

const handleIncomingNotification = (msg: string) => {
  try {
    const parsedMessage = JSON.parse(msg);

    console.log(`Received Notification`, parsedMessage);

    // Implement your own notification flow
  } catch (error) {
    console.error(`Error While Parsing the message: ${error}` );
  }
};

const listen = async () => {
  await mqConnection.connect();

  await mqConnection.consumeExchange(handleIncomingNotification);
};

listen();
