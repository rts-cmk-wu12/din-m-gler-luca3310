import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }: any) => {
	const jwt = cookies.get('jwt');
	return { jwt: jwt };
};
