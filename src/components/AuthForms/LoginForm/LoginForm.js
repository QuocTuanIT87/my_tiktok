import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';

import Button from '~/components/Button';
import styles from './LoginForm.module.scss';
import { HidePassWordIcon, ShowPassWordIcon } from '~/components/Icons';
import { LoginContext } from '~/components/LoginProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function LoginForm() {
    const [emailTemp, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [isShow, setIsShow] = useState(false);

    const hasSpace = password.includes(' ');
    const pattern = /\S/;

    const contextLogin = useContext(LoginContext);

    const handleSubmit = () => {
        contextLogin.fetchApi(emailTemp, password);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !hasSpace && pattern.test(emailTemp) && pattern.test(password)) {
            e.preventDefault(); // Ngăn chặn hành vi mặc định của trình duyệt
            handleSubmit();
        }
    };

    const handleChangePassWord = (e) => {
        setPassword(e.target.value);
        contextLogin.setShowError(false);
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        contextLogin.setShowError(false);
    };

    useEffect(() => {
        if (!hasSpace && pattern.test(emailTemp) && pattern.test(password)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [emailTemp, password]);

    return (
        <div className={cx('wrapper')}>
            {contextLogin.loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
            <div className={cx('title')}>Log in</div>

            <div className={cx('content')}>
                <div className={cx('title-input')}>
                    <span className={cx('title-email')}>Email or username</span>
                    <span className={cx('title-phone')}>Log in with phone</span>
                </div>

                <div className={cx('form')}>
                    <div className={cx('input-data')}>
                        <input
                            onKeyDown={handleKeyPress}
                            onChange={handleChangeEmail}
                            placeholder="Email or username"
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
                    {contextLogin.showError && (
                        <span className={cx('invalid')}>Incorrect email or password information. Try again.</span>
                    )}
                    {hasSpace && <span className={cx('invalid')}>Invalid special character</span>}
                    <span className={cx('forgot-password')}>Forgot password?</span>
                    <Button disabled={disabled} primary className={cx('button-login')} onClick={handleSubmit}>
                        Log in
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
