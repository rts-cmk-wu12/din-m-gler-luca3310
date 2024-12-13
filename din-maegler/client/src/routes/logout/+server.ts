import { json } from '@sveltejs/kit';

export async function POST({ cookies }: any) {
    cookies.set('jwt', '', {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        maxAge: 0
    });

    return json({ message: 'Logout successful' });
}
