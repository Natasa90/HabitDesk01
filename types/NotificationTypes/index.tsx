export interface ReminderProps {
  id: number;
  learning_date: string;
}; 

export interface LearningTimePickerProps {
  onSaveSuccess?: () => void;
};