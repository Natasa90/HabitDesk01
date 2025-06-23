import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const setupLocalNotificationsAsync = async () => {
  if (!Device.isDevice) {
    throw new Error('Must use physical device for notifications');
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    throw new Error('Permission not granted for notifications!');
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
};

export const setNotificationCategories = async () => {
  await Notifications.setNotificationCategoryAsync('learn-reminder', [
    {
      identifier: 'SNOOZE',
      buttonTitle: 'Snooze',
      options: { opensAppToForeground: false },
    },
    {
      identifier: 'MARK_DONE',
      buttonTitle: 'Mark as Done',
      options: { opensAppToForeground: true },
    },
    {
      identifier: 'DISMISS',
      buttonTitle: 'Dismiss',
      options: { opensAppToForeground: false },
    },
  ]);
};

const { SchedulableTriggerInputTypes } = Notifications;

export const scheduleLocalNotification = async ({
  title,
  body,
  data,
  date,
}: {
  title: string;
  body: string;
  data?: any;
  date: Date;
}): Promise<string> => {
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
      sound: 'default',
      categoryIdentifier: 'learn-reminder',
    },
    trigger: {
      type: SchedulableTriggerInputTypes.DATE,
      date,
    },
  });
  return notificationId; 
};
