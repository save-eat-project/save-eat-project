import { api, ApiException } from "./common"

export type LoginCredential = {
	provider: string,
	access_token: string,
}

// TODO
export class LoginFailed extends ApiException {
}

export async function login(data: LoginCredential) {
	await api.post("user/login", data)
}

export async function status() {
}

export async function logout() {
	await api.post("user/logout")
}
