import { useState } from 'react';
import * as Notifications from 'expo-notifications';
import supabase from '@/lib/supabase';

export const useDeleteReminder = (refresh: () => void) => {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteReminder = async (id: number) => {
    setDeleting(true);
    setError(null);

    const { data: reminder, error: fetchError } = await supabase
      .from('learning_times')
      .select('notification_id')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Fetch error:', fetchError);
      setError(fetchError.message);
      setDeleting(false);
      return;
    }
    if (reminder?.notification_id) {
      try {
        await Notifications.cancelScheduledNotificationAsync(reminder.notification_id);
      } catch (cancelError) {
        console.error('Failed to cancel local notification:', cancelError);
      }
    } 

    const { error: deleteError } = await supabase
      .from('learning_times')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Delete error:', deleteError);
      setError(deleteError.message);
    } else {
      refresh();
    }

    setDeleting(false);
  };

  return { deleteReminder, deleting, error };
};
