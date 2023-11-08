import { createContext, useContext, useState } from 'react';

import * as LoginService from '~/service/LoginService';
import { ModalContext } from '../ModalProvider';

export const LoginContext = createContext();

function LoginProvider({ children }) {
    const [data, setData] = useState();
    const [showError, setShowError] = useState(false);
    const [isNotify, setIsNotify] = useState(false);
    const contentModal = useContext(ModalContext);
    const [loading, setLoading] = useState(false);
    const [showErrorRegister, setShowErrorRegister] = useState(false);

    //data random user
    const [dataUser, setDataUser] = useState();

    console.log('Data: ', data);

    const handleDeleteData = () => {
        setData(null);
    };

    const handleSetData = (data) => {
        setData(data);
    };

    const handleSetDataUser = (data) => {
        setDataUser(data);
    };

    const fetchApi = async (email, password) => {
        setLoading(true);
        const result = await LoginService.loginService(email, password);

        if (result) {
            setData(result.data);
            localStorage.setItem('token', result.meta.token);

            setShowError(false);
            setTimeout(() => {
                setLoading(false);
                contentModal.handleHideModal();
                setIsNotify(true);
            }, 2500); // Thời gian là 2.8 giây (2800 milliseconds)
            setTimeout(() => {
                setIsNotify(false);
            }, 2200); // Thời gian là 2.8 giây (2800 milliseconds)
        } else {
            setLoading(false);
            setShowError(true);
        }
    };

    const value = {
        data,
        dataUser,
        showError,
        isNotify,
        loading,
        showErrorRegister,
        setShowErrorRegister,
        setShowError,
        fetchApi,
        handleSetData,
        handleDeleteData,
        handleSetDataUser,
    };

    return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
}

export default LoginProvider;
