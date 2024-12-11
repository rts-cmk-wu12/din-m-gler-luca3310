// src/routes/api/logout/+server.js
import { json } from '@sveltejs/kit';

export async function POST({ cookies }: any) {
	// Clear the JWT cookie
	cookies.set('jwt', '', {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: true,
		maxAge: 0 // Expire immediately
	});

	return json({ message: 'Logout successful' });
}
