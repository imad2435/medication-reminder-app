import cron from "node-cron";
import Reminder from "../models/Reminder.model.js";
import { sendEmail } from "./notifier.js";
export const startScheduler = () => {
  console.log("Schedular start");
  cron.schedule("* * * * *", async () => {
    const now = new Date();
    const reminders = await Reminder.find({
      remindAt: { $lte: now },
      sent: false,
    });
    for (const reminder of reminders) {
      try {
        await sendEmail(
          process.env.EMAIL_USER,
          "Reminder Notification",
          reminder.message
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
