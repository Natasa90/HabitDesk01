import { ImageSourcePropType } from 'react-native';

export interface LoginProps {
    signUp: () => void
    resetPassword: () => void; 
};

export interface CreateAccountProps {
    signIn: () => void; 
};

export interface ResetPasswordProps {
  resetPassword: () => void; 
};

export interface FormTitleProps {
  title: string
  logo: ImageSourcePropType; 
};

export interface TermsAgreementProps {
 checked: boolean;
 setChecked: (value: boolean) => void;
}

export interface CustomCheckboxProps {
  checked: boolean;
  onToggle: () => void;
}

export interface GithubLoginError {
  error: string | null;
}