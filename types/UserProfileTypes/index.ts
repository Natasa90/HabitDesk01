import { RootStackParamList } from "../NavigationTypes";

export interface GoalsFormProps {
  onClose: () => void;
 updateGoal: (goal: number) => void;
}

export interface DropDownPickerProps {
  selectedValue: number | null;
  onValueChange: (value: number) => void;
  options: number[]
}

export interface DateTimePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (date: Date) => void;
};


export interface UserProfileButtonProps {
	label: string; 
	navigateTo: keyof RootStackParamList;	
	icon: React.ReactNode;
}