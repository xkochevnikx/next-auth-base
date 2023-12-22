'use client'

import { getAccessToken } from '@/services/auth/auth.helper'
import { authService } from '@/services/auth/auth.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { CardItem } from './CardItem'

export function Home() {
	const { push } = useRouter()

	useEffect(() => {
		const token = getAccessToken()
		if (!token) push('/login')
	}, [])

	const { data, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => authService.users(),
	})

	const { mutate: mutateLogout, isPending: isLogoutPending } = useMutation({
		mutationKey: ['register'],
		mutationFn: () => authService.logout(),
		onSuccess() {
			push('/login')
		},
	})

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
				<div className='fixed bottom-0 left-0 flex items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none text-4xl font-bold'>
					AUTH
				</div>
				<button
					onClick={() => {
						mutateLogout()
					}}
					disabled={isLogoutPending}
				>
					Logout
				</button>
			</div>

			<div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
				<h1 className='text-6xl font-bold'>МК "Авторизация"</h1>
			</div>

			{isLoading ? (
				<div>Loading...</div>
			) : data?.data.length ? (
				data.data.map(user => (
					<CardItem content={user.name} title={user.email} key={user.id} />
				))
			) : (
				<CardItem
					content='Find in-depth information about Next.js features and API.'
					title='Login'
				/>
			)}
		</main>
	)
}
