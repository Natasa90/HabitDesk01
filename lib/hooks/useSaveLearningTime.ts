import { useState } from 'react';
import { Alert } from 'react-native';
import { scheduleLocalNotification } from '@/lib/helpers/notifications';
import supabase from '@/lib/supabase';
import { UseSaveLearningTimeParams } from '@/types/NotificationTypes';

export const useSaveLearningTime = ({
  finalDate,
  userEmail,
  onSaveSuccess,
  resetDates,
  setHasPickedDate,
}: UseSaveLearningTimeParams) => {
  const [isSaving, setIsSaving] = useState(false);

  const saveLearningTime = async () => {
    setIsSaving(true);

    const truncatedDate = new Date(finalDate);
    truncatedDate.setSeconds(0, 0);

    try {
      const notificationId = await scheduleLocalNotification({
        title: 'Time to Learn! 📚',
        body: 'Remember to keep up with your learning goals today!',
        date: truncatedDate,
        data: { userEmail },
      });

      const { error } = await supabase.from('learning_times').insert([
        {
          user_email: userEmail,
          learning_date: finalDate.toISOString(),
          notification_id: notificationId,
        },
      ]);

      if (error) {
        Alert.alert('Error', 'Failed to save learning time. Try again.');
        console.error('Save error:', error);
        return;
      }

      Alert.alert('Success', 'Learning time saved and notification scheduled!');

      onSaveSuccess?.();
      resetDates();
      setHasPickedDate(false);
    } catch (notifyError) {
      Alert.alert('Saved but failed to schedule notification 😞');
      console.error('Notification error:', notifyError);
    } finally {
      setIsSaving(false);
    }
  };

  return { saveLearningTime, isSaving };
};
