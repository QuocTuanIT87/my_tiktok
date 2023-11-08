import * as httpRequest from '~/ultils';

export const DeleteCommentService = async (idComment) => {
    try {
        const res = await httpRequest.DELETE('comments/' + idComment, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        console.log('successDeleteComment: ', res);
        return res;
    } catch (error) {
        console.log('errorDeleteComment: ', error);
    }
};
