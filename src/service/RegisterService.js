import * as httpRequest from '~/ultils';

export const RegisterService = async (email, password) => {
    console.log('Email service: ', email);
    console.log('Pasword service: ', password);
    try {
        const res = await httpRequest.post(
            'auth/register',
            {
                type: 'email',
                email: email,
                password: password,
            },
            {},
        );
        console.log('successRegister: ', res);
        return res;
    } catch (error) {
        console.log('errorRegister: ', error);
    }
};
