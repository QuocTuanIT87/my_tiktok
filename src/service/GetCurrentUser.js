import * as httpRequest from '~/ultils';

export const getCurrentUserService = async () => {
    try {
        const res = await httpRequest.get('auth/me', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log('errorGetCurrent: ', error.message);
    }
};
