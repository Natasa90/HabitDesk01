export interface ReminderProps {
  id: number;
  learning_date: string;
}; 

export interface LearningTimePickerProps {
  onSaveSuccess?: () => void;
}

export interface ScheduleLearningListProps {
  reminders: ReminderProps[];
  loading: boolean;
  error: string | null;
	refresh: () => void;
}

export interface DateTimeSelectorProps {
  visible: boolean;
  initialDate: Date;
  onClose: () => void;
  onConfirm: (selectedDate: Date) => void;
};

export interface UseSaveLearningTimeParams {
  finalDate: Date;
  userEmail?: string;
  onSaveSuccess?: () => void;
  resetDates: () => void;
  setHasPickedDate: (value: boolean) => void;
}