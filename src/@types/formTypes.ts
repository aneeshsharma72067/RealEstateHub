export interface SignUpFormData {
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface OwnerFormData {
  phone: string;
  company?: string;
  avatarUrl?: string;
}
