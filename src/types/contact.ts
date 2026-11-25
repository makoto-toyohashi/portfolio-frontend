
export type ContactCategory =
  | "technical"
  | "project"
  | "portfolio"
  | "collaboration"
  | "other";

export type ContactFormData = {
  name: string;
  company: string;
  email: string;
  category: ContactCategory | "";
  subject: string;
  message: string;
  consent: boolean;
};

export type FormErrors = Partial<
  Record<keyof ContactFormData, string>
>;

export type FormStep =
  | "input"
  | "confirm"
  | "complete";

export type ContactResponse = {
  success: boolean;
  message: string;
  contactId?: string;
};
