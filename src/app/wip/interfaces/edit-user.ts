export interface EditUser {
  first_name: string;
  last_name: string;
  description?: string;
  position: string;
  specialization_field_1: string;
  specialization_field_2: string;
  checkbox: boolean;
  uuid?: string;
}
