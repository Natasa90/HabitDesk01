import { useEffect, useState, useContext } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { TextWrapper } from '@/components/Layout';
import { UserInfoContext } from '@/context/UserInfoContext';
import { ReminderProps } from '@/types/NotificationTypes';
import supabase from '@/lib/supabase';

export const ScheduleLearningList = () => {
  const { userInfo } = useContext(UserInfoContext);
  const [reminders, setReminders] = useState<ReminderProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReminders = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('learning_times')
        .select('id, learning_date')
        .eq('user_email', userInfo?.email)
        .order('learning_date', { ascending: false });

      if (error) {
        console.error('Fetch error:', error);
        setReminders([]);
      } else {
        setReminders(data || []);
      }
      setLoading(false);
    };

    if (userInfo?.email) {
      fetchReminders();
    }
  }, [userInfo?.email]);

  if (loading) {
    return (
      <View className="py-6">
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (reminders.length === 0) {
    return (
      <View className="p-4">
        <TextWrapper className="text-center text-gray-500 text-base">
          No scheduled reminders yet.
        </TextWrapper>
      </View>
    );
  }

  return (
    <View className="px-4 mt-4">
      <TextWrapper className="text-lg font-semibold mb-3 text-center">
        Your Scheduled Reminders
      </TextWrapper>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="bg-white border border-gray-200 rounded-xl shadow-sm mb-3 p-4">
            <TextWrapper className="text-base text-customBlue font-IBM_medium text-center">
              {new Date(item.learning_date).toLocaleString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </TextWrapper>
          </View>
        )}
      />
    </View>
  );
};
