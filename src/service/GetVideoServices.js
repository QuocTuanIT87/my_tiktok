import * as httpRequest from '~/ultils';

export const getListVideo = async (type = 'for-you', page, except) => {
    try {
        const res = await httpRequest.get('videos', {
            params: {
                type,
                page,
                except,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log('errorGetVideo: ', error);
    }
};
