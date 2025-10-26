// This function requests permission to show notifications
export const requestNotificationPermission = () => {
  if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('Notification permission denied.');
      }
    });
  }
};

// This function schedules notifications for a list of medications for today
export const scheduleTodaysNotifications = (medications) => {
  if (Notification.permission !== 'granted') {
    console.log('Cannot schedule notifications: permission not granted.');
    return;
  }

  const now = new Date();

  medications.forEach(med => {
    med.reminderTimes.forEach(time => {
      const [hour, minute] = time.split(':');
      const reminderTime = new Date();
      reminderTime.setHours(parseInt(hour, 10), parseInt(minute, 10), 0, 0);

      // Only schedule notifications for times in the future today
      if (reminderTime > now) {
        const delay = reminderTime.getTime() - now.getTime();
        
        console.log(`Scheduling notification for ${med.name} in ${delay / 1000} seconds.`);

        setTimeout(() => {
          new Notification('Medication Reminder', {
            body: `It's time to take your ${med.name} (${med.dosage}).`,
            // icon: '/path/to/icon.png' // Optional: add an icon in your public folder
          });
        }, delay);
      }
    });
  });
};