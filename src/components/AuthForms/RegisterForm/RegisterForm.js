import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';

import Button from '~/components/Button';
import styles from './RegisterForm.module.scss';
import { HidePassWordIcon, ShowPassWordIcon } from '~/components/Icons';
import { LoginContext } from '~/components/LoginProvider';
import { RegisterService } from '~/service/RegisterService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ModalContext } from '~/components/ModalProvider';

const cx = classNames.bind(styles);

function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [isShowRe, setIsShowRe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rePassWord, setRePassWord] = useState('');
    const [checkPass, setCheckPass] = useState(false);

    const hasSpace = password.includes(' ');
    const pattern = /\S/;

    const contextLogin = useContext(LoginContext);
    const contextModal = useContext(ModalContext);

    const handleSubmit = () => {
        if (rePassWord === password) {
            const fetchApi = async () => {
                setLoading(true);
                const result = await RegisterService(email, password);
                console.log('Result register: ', result);
                if (result) {
                    setLoading(false);
                    contextModal.setIsRegister(true);
                    setTimeout(() => {
                        contextModal.setIsRegister(false);
                    }, 2200); // Thời gian là 2.8 giây (2800 milliseconds)
                } else {
                    contextLogin.setShowErrorRegister(true);
                }
                setLoading(false);
            };

            fetchApi();
        } else {
            setCheckPass(true);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !hasSpace && pattern.test(email) && pattern.test(password)) {
            e.preventDefault(); // Ngăn chặn hành vi mặc định của trình duyệt
            handleSubmit();
        }
    };

    const handleChangePassWord = (e) => {
        console.log('Password changed: ', e.target.value);
        setPassword(e.target.value);
        contextLogin.setShowErrorRegister(false);
        setCheckPass(false);
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        contextLogin.setShowErrorRegister(false);
    };

    const handleRePassWord = (e) => {
        contextLogin.setShowErrorRegister(false);
        setRePassWord(e.target.value);
        setCheckPass(false);
    };

    useEffect(() => {
        if (!hasSpace && pattern.test(email) && pattern.test(password)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email, password]);

    return (
        <div className={cx('wrapper')}>
            {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
            <div className={cx('title')}>Register</div>

            <div className={cx('content')}>
                <div className={cx('title-input')}>
                    <span className={cx('title-email')}>Email</span>
                    <span className={cx('title-phone')}>Register with phone</span>
                </div>

                <div className={cx('form')}>
                    <div className={cx('input-data')}>
                        <input
                            type="email"
                            onKeyDown={handleKeyPress}
                            onChange={handleChangeEmail}
                            placeholder="Email"
                        ></input>
                    </div>

                    <div className={cx('input-data')}>
                        <input
                            onKeyDown={handleKeyPress}
                            type={isShow ? 'text' : 'password'}
                            onChange={handleChangePassWord}
                            placeholder="Password"
                        />

                        {!isShow ? (
                            <span onClick={() => setIsShow(true)} className={cx('show-password')}>
                                <HidePassWordIcon />
                            </span>
                        ) : (
                            <span onClick={() => setIsShow(false)} className={cx('show-password')}>
                                <ShowPassWordIcon />
                            </span>
                        )}
                    </div>
                    <span>The password must be at least 6 characters.</span>
                    <div className={cx('input-data')}>
                        <input
                            type={isShowRe ? 'text' : 'password'}
                            onChange={handleRePassWord}
                            placeholder="Re-Password"
                        />
                        {!isShowRe ? (
                            <span onClick={() => setIsShowRe(true)} className={cx('show-password')}>
                                <HidePassWordIcon />
                            </span>
                        ) : (
                            <span onClick={() => setIsShowRe(false)} className={cx('show-password')}>
                                <ShowPassWordIcon />
                            </span>
                        )}
                    </div>
                    {contextLogin.showErrorRegister && (
                        <span className={cx('invalid')}>Email is already in use, please use another email</span>
                    )}
                    {checkPass && <span className={cx('invalid')}>Passwords do not match, please check again</span>}
                    {hasSpace && <span className={cx('invalid')}>Invalid special character</span>}

                    <Button disabled={disabled} primary className={cx('button-login')} onClick={handleSubmit}>
                        Register
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
