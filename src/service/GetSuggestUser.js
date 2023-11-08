import * as httpRequest from '~/ultils';

export const getSuggestUser = async (per_page, page) => {
    try {
        const res = await httpRequest.get('users/suggested', {
            params: {
                per_page,
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.log('errorSuggestAccount: ', error);
    }
};
