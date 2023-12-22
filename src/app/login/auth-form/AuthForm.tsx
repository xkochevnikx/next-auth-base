'use client'

import clsx from 'clsx'

import { saveTokenStorage } from '@/services/auth/auth.helper'
import { authService } from '@/services/auth/auth.service'
import { IFormData } from '@/services/auth/auth.types'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './AuthForm.module.scss'

interface AuthFormProps {
	isLogin: boolean
}

const AuthForm: FC<AuthFormProps> = ({ isLogin }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IFormData>()
	const { push } = useRouter()

	const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: IFormData) => authService.main('login', data),
		onSuccess({ data }) {
			saveTokenStorage(data.accessToken)
			reset()
			push('/')
		},
	})

	const { mutate: mutateRegister, isPending: isRegisterPending } = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: IFormData) => authService.main('register', data),
		onSuccess({ data }) {
			saveTokenStorage(data.accessToken)
			reset()
			push('/')
		},
	})

	const isPending = isLoginPending || isRegisterPending

	const onSubmit: SubmitHandler<IFormData> = data => {
		isLogin ? mutateLogin(data) : mutateRegister(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='max-w-sm mx-auto'>
			<div className='mb-4'>
				<label className='text-gray-600'>
					Email
					<input
						type='email'
						placeholder='Enter email: '
						{...register('email', { required: true })}
						className={clsx(
							styles['input-field'],
							'w-full p-2 border rounded focus:outline-none focus:border-indigo-500'
						)}
					/>
				</label>
			</div>

			<div className='mb-4'>
				<label className='text-gray-600'>
					Пароль
					<input
						type='password'
						placeholder='Enter password: '
						{...register('password', { required: true })}
						className={clsx(
							styles['input-field'],
							'w-full p-2 border rounded focus:outline-none focus:border-indigo-500'
						)}
					/>
				</label>
			</div>

			<div className='mb-4'>
				<button
					type='submit'
					className={clsx(
						styles['btn-primary'],
						isLogin ? 'bg-indigo-500' : 'bg-green-500',
						isPending ? 'opacity-75 cursor-not-allowed' : ''
					)}
					disabled={isPending}
				>
					{isLogin ? 'Войти' : 'Зарегистрироваться'}
				</button>
			</div>
		</form>
	)
}

export default AuthForm
