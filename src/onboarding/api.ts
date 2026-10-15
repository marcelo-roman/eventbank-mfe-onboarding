import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { findOrNull, get, post } from '../shared/api';
import { type AccountSummary, type Application, type CommandResult } from '../shared/types';

export const applicationKey = ['application'] as const;

export function useMyApplication() {
  return useQuery({
    queryKey: applicationKey,
    queryFn: () => findOrNull<Application>('/customers/me'),
    refetchInterval: (query) => (query.state.data?.status === 'PendingReview' ? 2000 : false),
  });
}

export function useMyAccounts(enabled: boolean) {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: () => get<AccountSummary[]>('/accounts'),
    enabled,
    refetchInterval: (query) => (query.state.data?.length ? false : 1500),
  });
}

export interface ApplicationInput {
  fullName: string;
  cpf: string;
  birthDate: string;
  phone: string;
}

export function useSubmitApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: ApplicationInput) => post<CommandResult>('/customers/me', input),
    onSuccess: async () => {
      await new Promise((resolve) => setTimeout(resolve, 600));
      await queryClient.invalidateQueries({ queryKey: applicationKey });
    },
  });
}
