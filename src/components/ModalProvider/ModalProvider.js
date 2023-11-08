import { createContext, useState } from 'react';

export const ModalContext = createContext();

function ModalProvider({ children }) {
    const [active, setActive] = useState(false);
    const [activeLogOut, setActiveLogOut] = useState(false);
    const [activeEditProfile, setActiveEditProfile] = useState(false);
    const [typeForm, setTypeForm] = useState('login');
    const [isLogout, setIsLogout] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    const body = document.body;

    const handleShowEditProfile = () => {
        body.classList.add('hidden');
        console.log('Clicked Edit!!!');
        setActiveEditProfile(true);
    };

    const handleHideEditProfile = () => {
        body.classList.remove('hidden');
        setActiveEditProfile(false);
    };

    const handleShowModalLogOut = () => {
        body.classList.add('hidden');
        setActiveLogOut(true);
    };

    const handleHideModalLogOut = () => {
        body.classList.remove('hidden');
        setActiveLogOut(false);
    };

    const handleShowModal = () => {
        body.classList.add('hidden');
        setActive(true);
    };
    const handleHideModal = () => {
        body.classList.remove('hidden');
        setActive(false);
    };

    const handleChangeForm = (form) => {
        setTypeForm(form);
    };

    const value = {
        active,
        activeLogOut,
        activeEditProfile,
        typeForm,
        isLogout,
        isRegister,
        setIsRegister,
        setIsLogout,
        handleShowModal,
        handleHideModal,
        handleChangeForm,
        handleShowModalLogOut,
        handleHideModalLogOut,
        handleShowEditProfile,
        handleHideEditProfile,
    };

    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export default ModalProvider;
