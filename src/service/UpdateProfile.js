import * as httpRequest from '~/ultils';

export const UpdateProfileService = async (formData) => {
    try {
        const res = await httpRequest.post('auth/me?_method=PATCH', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        console.log('successUpateProfile: ', res);
        return res;
    } catch (error) {
        console.log('errorUpdateProfile: ', error);
    }
};
