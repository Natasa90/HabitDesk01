import supabase from '../supabase';

export const useCleanOldReminders = async (userEmail: string | undefined) => {
	if (!userEmail) return; 

  const now = new Date();

  const { data: reminders, error } = await supabase
    .from('learning_times')
    .select('*')
    .eq('user_email', userEmail);

  if (error) {
    console.error('Failed to fetch reminders:', error);
    return;
  }

  if (!reminders || reminders.length === 0) {
    console.log('No reminders to clean up 👌');
    return;
  }

	const expiredReminders = reminders.filter(reminder => {
		const reminderDate = new Date(reminder.learning_date);

		return reminderDate < now;

  });

  if (expiredReminders.length === 0) {
    console.log('No expired reminders to delete');
    return;
  }

  const notificationIdsToDelete = expiredReminders.map(r => r.id);

  const { error: deleteError } = await supabase
    .from('learning_times')
    .delete()
    .in('id', notificationIdsToDelete);

  if (deleteError) {
    console.error('Failed to delete expired reminders:', deleteError);
  } else {
    console.log(`Deleted ${notificationIdsToDelete.length} old reminders`);
  }
};
