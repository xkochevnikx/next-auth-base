import { NextRequest, NextResponse } from 'next/server'
import { EnumTokens } from './services/auth/auth.service'

export async function middleware(request: NextRequest, response: NextResponse) {
	const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	const isAdminPage = request.url.includes('/admin')

	if (!refreshToken) {
		return redirectToLogin(isAdminPage, request)
	}

	return NextResponse.next()

	/* 	try {
		const { user } = await fetch(credentials:true)

		if (user?.role === UserRole.Admin) return NextResponse.next()

		if (isAdminPage) {
			return NextResponse.rewrite(new URL('/404', request.url))
		}

		return NextResponse.next()
	} catch (error) {
		request.cookies.delete(EnumTokens.ACCESS_TOKEN)
		return redirectToLogin(isAdminPage, request)
	} */
}

export const config = {
	// Указываем url для которых будет работать
	matcher: ['/admin/:path*'],
}

const redirectToLogin = (isAdminPage: boolean, request: NextRequest) => {
	return NextResponse.redirect(
		new URL(isAdminPage ? '/404' : '/login', request.url)
	)
}
