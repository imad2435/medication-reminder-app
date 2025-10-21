import cron from "node-cron";
import Reminder from "../models/Reminder.model.js";
import { sendEmail } from "./notifier.js";
import moment from "moment-timezone";

export const startScheduler = () => {
  console.log("Schedular start");
  cron.schedule("* * * * *", async () => {
    const now = moment().tz("Asia/Karachi").toDate();
    const reminders = await Reminder.find({
      remindAt: { $lte: now },
      sent: false,
    });
    for (const reminder of reminders) {
      try {
        // const lahoreTime=moment(reminder.remindAt).tz("Asia/Karachi").format("hh:mm A");
         const lahoreTime = moment(reminder.remindAt).tz("Asia/Karachi").format("DD-MM-YYYY hh:mm A");


        await sendEmail(
          process.env.EMAIL_USER,
          "Reminder Notification",
          
          // `Reminder: ${reminder.message}\nTime: ${lahoreTime} PKT `
           `Reminder: ${reminder.message}\nTime: ${lahoreTime} PKT`
        );
        reminder.sent = true;
        await reminder.save();
        console.log(`Reminder sent to ${reminder._id}`);
      } catch (error) {
        console.log(`Error sending Reminder ${reminder._id}`, error);
      }
    }
  });
};
