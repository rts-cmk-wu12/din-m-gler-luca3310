// src/routes/api/login/+server.js
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }: any) {
	const { email, password } = await request.json();

	// Authenticate the user with your backend
	const response = await fetch('https://dinmaegler.onrender.com/auth/local', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ identifier: email, password })
	});

	if (!response.ok) {
		return json({ error: 'Invalid credentials' }, { status: 401 });
	}

	const data = await response.json();
	const jwt = data.jwt;

	// Set the JWT as an HttpOnly cookie
	cookies.set('jwt', jwt, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: true, // Ensure this is true in production
		maxAge: 60 * 60 * 24 * 7 // 1 week
	});

	return json({ message: 'Login successful' });
}
