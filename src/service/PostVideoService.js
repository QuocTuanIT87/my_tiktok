import * as httpRequest from '~/ultils';

export const postVideoService = async (formData) => {
    try {
        const res = await httpRequest.post('videos', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        console.log('successPostVideo: ', res);
        return res;
    } catch (error) {
        console.log('errorPostVideo: ', error);
    }
};
