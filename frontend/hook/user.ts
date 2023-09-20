import { useMutation, useQuery, useQueryClient } from 'react-query';
import { auth } from '@/lib/api';

// QueryKey
export const LOGIN_STATUS = 'LOGIN_STATUS'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'


export function useLoginStatus() {
	return useQuery({
		queryKey: LOGIN_STATUS,
		async queryFn() { 
			// TODO: auth status 구현
			// auth.status()
			return false
		},
	})
}

export function useLogin() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: LOGIN,
		mutationFn: auth.login,
		onSuccess: () => { 
			queryClient.setQueryData(LOGIN_STATUS, true)
		},
	})
}

export function useLogout() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: LOGOUT,
		mutationFn: auth.logout,
		onSuccess: () => { 
			queryClient.setQueryData(LOGIN_STATUS, false)
		},
	})
}

