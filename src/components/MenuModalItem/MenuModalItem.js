import classNames from 'classnames/bind';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import styles from './MenuModalItem.module.scss';
import { ModalContext } from '~/components/ModalProvider';
import LoginForm from '~/components/AuthForms/LoginForm/';
import { XIcon } from '~/components/Icons';
import LoginAuthForm from '~/components/AuthForms/UserAuthForms/LoginAuthForm';
import RegisterAuthForm from '~/components/AuthForms/UserAuthForms/RegisterAuthForm';
import RegisterForm from '../AuthForms/RegisterForm/RegisterForm';

const cx = classNames.bind(styles);

function MenuModalItem() {
    const context = useContext(ModalContext);

    return (
        <div className={cx('modal-mask')}>
            {context.isRegister && <span className={cx('notify')}>Register Account Success</span>}
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    {context.typeForm === 'loginform' && (
                        <span className={cx('back-icon')} onClick={() => context.handleChangeForm('login')}>
                            <FontAwesomeIcon icon={faChevronLeft} className="fa-lg" />
                        </span>
                    )}
                    <div className={cx('inner')}>
                        {context.typeForm === 'loginform' && <LoginForm />}
                        {context.typeForm === 'login' && <LoginAuthForm />}
                        {context.typeForm === 'registerform' && <RegisterForm />}
                        {context.typeForm === 'register' && <RegisterAuthForm />}
                    </div>

                    <div className={cx('keep-stable')}>
                        <div className={cx('policy')}>
                            {context.typeForm === 'login' && (
                                <p>
                                    By continuing, you agree to TikTok’s{' '}
                                    <a href="https://www.tiktok.com/legal/terms-of-use?lang=en">Terms of Service</a> and
                                    confirm that you have read TikTok’s{' '}
                                    <a href="https://www.tiktok.com/legal/privacy-policy?lang=en">Privacy Policy.</a>
                                </p>
                            )}
                        </div>
                        {context.typeForm === 'login' || context.typeForm === 'loginform' ? (
                            <div className={cx('footer')}>
                                Don't have an account?
                                <span onClick={() => context.handleChangeForm('register')}>Sign up</span>
                            </div>
                        ) : (
                            <div className={cx('footer')}>
                                Already have an account?
                                <span
                                    onClick={() => {
                                        context.handleChangeForm('login');
                                    }}
                                >
                                    Log in
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                <div
                    className={cx('close-btn')}
                    onClick={() => {
                        context.handleChangeForm('login');
                        context.handleHideModal();
                    }}
                >
                    <XIcon />
                </div>
            </div>
        </div>
    );
}

export default MenuModalItem;
