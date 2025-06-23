export interface ReminderProps {
  id: number;
  learning_date: string;
}; 

export interface LearningTimePickerProps {
  onSaveSuccess?: () => void;
};

export interface ScheduleLearningListProps {
  reminders: ReminderProps[];
  loading: boolean;
  error: string | null;
}