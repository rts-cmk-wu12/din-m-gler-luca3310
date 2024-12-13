import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data }: any) => {
    if (data.jwt) {
        try {
            const res = await fetch('https://dinmaegler.onrender.com/users/me', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${data.jwt}`
                }
            });
            if (res.ok) {
                const userData = await res.json();
                return { user: userData, jwt: data.jwt };
            }
        } catch (err) {
            console.error(err);
        }
    } else {
        return { user: null, jwt: data.jwt };
    }
};
