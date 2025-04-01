export interface GoalsFormProps {
  onClose: () => void;
 updateGoal: (goal: number) => void;
}

export interface DropDownPickerProps {
  selectedValue: number | null;
  onValueChange: (value: number) => void;
  options: number[]
}
