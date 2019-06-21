export interface RegisterForm {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  description?: string;
  position: string;
  specialization_field_1: string;
  specialization_field_2: string;
  checkbox: boolean;
}
