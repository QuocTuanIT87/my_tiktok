import * as httpRequest from '~/ultils';

export const DeleteVideoService = async (idVideo) => {
    try {
        const res = await httpRequest.DELETE('videos/' + idVideo, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        console.log('successDeleteVideo: ', res);
        return res;
    } catch (error) {
        console.log('errorDeleteVideo: ', error);
    }
};
