import { Control } from "react-hook-form"

export interface CustomFormFieldProps {
  control: Control<any>
  name: string
  inputType: string,
  label?: string,
  type?: string
  placeholder?: string
  iconSrc?: string
  iconAlt?: string,
  disabled?: boolean,
  children?: React.ReactNode;
  dateFormat?: string;
  showTimeSelect?: boolean;
}


export interface loginFormData {
  email: string,
  password: string
}

export interface registerFormData {
  name: string,
  email: string,
  password: string,
  gender: string,
}

export interface AuthStateType {
  isAuth: boolean;
  token: string | null; 
}



export interface AuthContextType {
  isAuth: AuthStateType;
  handleLogin: (token: string) => void;
  logout: () => void;
}

export interface Task {
  _id: number
  title: string
  description: string
  status: 'in-progress' | 'completed',
  startingDate: Date,
  deadline: Date,
}

export interface TaskFormData {
  title: string
  description: string
  status: 'in-progress' | 'completed',
  deadline: Date,
}