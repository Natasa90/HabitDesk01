export interface PorchUserButtonProps {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export type PorchType = {
    new_id: string;
    created_at: string;
    email: string;
    text: string;
    source: string;
    likes: string[];
    [key: string]: any;
};

export interface UseFilteredUpdatesProps {
  porchs: PorchType[];
  filtered: boolean;
  userEmail: string | undefined;
}


export interface PorchListProps {
    porchs: PorchType[];
    setPorchs: React.Dispatch<React.SetStateAction<PorchType[]>>;
};

export interface PorchDailyUpdateProps {
    porch: PorchType;
    setPorchs: React.Dispatch<React.SetStateAction<PorchType[]>>;
};

export interface PorchFormProps {
  setPorchs: React.Dispatch<React.SetStateAction<PorchType[]>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PorchCalendarProps {
    learningDates: { date: string; count: number; }[];
}

export interface PorchListHeaderProps {
  learningDays: number;
  buttonTitle: string;
  handleFiltering: () => void;
}