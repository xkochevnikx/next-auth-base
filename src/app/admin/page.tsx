import { API_URL } from '@/constants'
import { EnumTokens } from '@/services/auth/auth.service'
import type { IUser } from '@/utils/types'
import type { Metadata } from 'next'

import { cookies } from 'next/headers'

export const metadata: Metadata = {
	title: 'Admin SSR',
}

const fetchUser = async () => {
	'use server'

	const cookie = cookies()
	const accessToken = cookie.get(EnumTokens.ACCESS_TOKEN)?.value

	return fetch(`${API_URL}/auth/users`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	}).then(res => res.json()) as Promise<IUser[]>
}

export default async function AdminPage() {
	const users = await fetchUser()

	return (
		<div>
			{users?.length ? (
				users.map(user => <div key={user.id}>{user.email}</div>)
			) : (
				<p>Not found!</p>
			)}
		</div>
	)
}
