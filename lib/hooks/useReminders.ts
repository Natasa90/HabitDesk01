import { useEffect, useState, useContext } from 'react';
import { UserInfoContext } from '@/context/UserInfoContext';
import { ReminderProps } from '@/types/NotificationTypes';
import supabase from '@/lib/supabase';

export const useReminders = () => {
  const { userInfo } = useContext(UserInfoContext);
  const [reminders, setReminders] = useState<ReminderProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refresh = () => setRefreshTrigger((prev) => prev + 1);

  useEffect(() => {
    const fetchReminders = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('learning_times')
        .select('id, learning_date')
        .eq('user_email', userInfo?.email)
        .order('learning_date', { ascending: false });

				if (error) {
					console.error('Supabase fetch error:', error);
					setReminders([]);
					setError(error.message);
				} else {
					const now = new Date();
					const upcomingReminders = (data || []).filter(reminder => new Date(reminder.learning_date).getTime() > now.getTime());
					setReminders(upcomingReminders);
				}
      	setLoading(false);
    };

    if (userInfo?.email) {
      fetchReminders();
    } else {
      setReminders([]);
      setLoading(false);
    }
  }, [userInfo?.email, refreshTrigger]);

  return { reminders, loading, error, refresh };
};
