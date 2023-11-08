import * as httpRequest from '~/ultils';

export const UnLikeVideoService = async (idVideo) => {
    try {
        const res = await httpRequest.post(
            'videos/' + idVideo + '/unlike',
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            },
        );
        console.log('successUnLikeVideo: ', res);
        return res.data;
    } catch (error) {
        console.log('errorUnLikeVideo: ', error);
    }
};
