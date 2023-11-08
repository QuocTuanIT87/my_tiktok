import * as httpRequest from '~/ultils';

export const PostCommentService = async (uuid, newComment) => {
    try {
        const res = await httpRequest.post(
            'videos/' + uuid + '/comments',
            { comment: newComment },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            },
        );
        console.log('successPostComment: ', res);
        return res;
    } catch (error) {
        console.log('errorPostComment: ', error);
    }
};
