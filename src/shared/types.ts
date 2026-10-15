export type ApplicationStatus = 'PendingReview' | 'Approved' | 'Rejected';

export interface Application {
  id: string;
  fullName: string;
  email: string;
  cpf: string;
  birthDate: string;
  phone: string;
  status: ApplicationStatus;
  rejectionReason: string | null;
  registeredAt: string;
  reviewedAt: string | null;
}

export interface AccountSummary {
  id: string;
  branch: string;
  number: string;
  currency: string;
}

export interface CommandResult {
  id: string;
  version: number;
}
