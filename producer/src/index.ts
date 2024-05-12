import mqConnection from "./connection";
import { sendNotification } from "./notification";
import { NOTIFICATION_QUEUE } from "./config";

const wait = 1000;
//mqConnection.connect();


const send = async () => {  
  
  const newNotification = {
            title: " New notification" ,
            description:
            Math.random().toString(32).slice(2,6),
          };

          sendNotification(newNotification);         

          // sleepLoop(7, () => console.log("Hola")); 
 }; 
   

async function sleep(ms: number): Promise<void> {
  return new Promise(
      (resolve)=> setTimeout(resolve, ms));
}


async function sleepLoop(number: number, cb: CallableFunction) {
    while (number--) {
    await sleep(wait)
    cb()
  }
}  




 sleepLoop(6, send); 


//send(); 
   