import * as httpRequest from '~/ultils';

export const logoutService = async () => {
    try {
        const res = await httpRequest.post(
            'auth/logout',
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            },
        );
        return res;
    } catch (error) {
        console.log('errorLogout: ', error.message);
    }
};
