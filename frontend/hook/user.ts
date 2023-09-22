import { useMutation, useQuery, useQueryClient } from 'react-query';
import { auth } from '@/lib/api';

// QueryKey
export const LOGIN_STATUS = 'LOGIN_STATUS'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

type LoginStatus = boolean | 'logout'


export function useLoginStatusQuery() {
	return useQuery<LoginStatus>({
		queryKey: LOGIN_STATUS,
		async queryFn() { 
			console.log('fetch login status');
			return new Promise(rs => setTimeout(rs, 1000, false))
			// return false
		},
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
}

export function useUserActive() {
	const { isSuccess, data: isLoggedin } = useLoginStatusQuery()
	return isSuccess && (isLoggedin === true)
}


export function useLoginMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: LOGIN,
		mutationFn: auth.login,
		onSuccess: () => { 
			queryClient.setQueryData(LOGIN_STATUS, true)
		},
	})
}

export function useLogoutMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: LOGOUT,
		mutationFn: auth.logout,
		onSuccess: () => { 
			queryClient.setQueryData(LOGIN_STATUS, 'logout')
		},
	})
}

