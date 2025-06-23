import { useState } from 'react';
import * as Notifications from 'expo-notifications';
import supabase from '@/lib/supabase';
import { scheduleLocalNotification } from '@/lib/helpers/notifications';

export const useUpdateReminder = (refresh: () => void) => {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateReminder = async (id: number, newDate: Date) => {
    setUpdating(true);
    setError(null);

    const { data: reminder, error: fetchError } = await supabase
      .from('learning_times')
      .select('notification_id')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Fetch error:', fetchError);
      setError(fetchError.message);
      setUpdating(false);
      return;
    }

    if (reminder?.notification_id) {
      try {
        await Notifications.cancelScheduledNotificationAsync(reminder.notification_id);
      } catch (cancelError) {
        console.error('Failed to cancel previous notification:', cancelError);
      }
    }

    const newTruncatedDate = new Date(newDate);
    newTruncatedDate.setSeconds(0, 0);

    let newNotificationId: string | null = null;

    try {
      newNotificationId = await scheduleLocalNotification({
        title: 'Time to Learn! 📚',
        body: 'Reminder updated — keep learning strong!',
        date: newTruncatedDate,
      });
    } catch (notifyError) {
      console.error('Failed to schedule new notification:', notifyError);
      setError('Failed to schedule updated notification.');
      setUpdating(false);
      return;
    }

    const { error: updateError } = await supabase
      .from('learning_times')
      .update({
        learning_date: newDate.toISOString(),
        notification_id: newNotificationId,
      })
      .eq('id', id);

    if (updateError) {
      console.error('Update error:', updateError);
      setError(updateError.message);
    } else {
      refresh();
    }

    setUpdating(false);
  };

  return { updateReminder, updating, error };
};
