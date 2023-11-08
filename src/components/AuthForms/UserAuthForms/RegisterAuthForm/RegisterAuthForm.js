import classNames from 'classnames/bind';

import Button from '~/components/Button';
import { DownExpandIcon } from '~/components/Icons';
import styles from '../UserAuthForm.module.scss';
import { FacebookIcon, GoogleIcon, KakaoIcon, LineIcon, ProfileIcon, TwitterIcon } from '~/components/Icons';
import { useContext, useMemo, useState } from 'react';
import { ModalContext } from '~/components/ModalProvider';

const cx = classNames.bind(styles);

function RegisterAuthForm() {
    const registerList = useMemo(
        () => [
            {
                showMore: true,
                title: 'Sign up for TikTok',
                contents: [
                    {
                        id: 1,
                        icon: <ProfileIcon />,
                        title: 'Use phone or email',
                    },
                    {
                        icon: <FacebookIcon />,
                        title: 'Continue with Facebook',
                        disabled: true,
                    },
                    {
                        icon: <GoogleIcon />,
                        title: 'Continue with Google',
                        disabled: true,
                    },
                ],
            },
            {
                title: 'Sign up for TikTok',
                contents: [
                    {
                        icon: <ProfileIcon />,
                        title: 'Use phone or email',
                    },
                    {
                        icon: <FacebookIcon />,
                        title: 'Continue with Facebook',
                        disabled: true,
                    },
                    {
                        icon: <GoogleIcon />,
                        title: 'Continue with Google',
                        disabled: true,
                    },
                    {
                        icon: <TwitterIcon />,
                        title: 'Continue with Twitter',
                        disabled: true,
                    },
                    {
                        icon: <LineIcon />,
                        title: 'Continue with LINE',
                        disabled: true,
                    },
                    {
                        icon: <KakaoIcon />,
                        title: 'Continue with KakaoTalk',
                        disabled: true,
                    },
                ],
            },
        ],
        [],
    );

    const context = useContext(ModalContext);

    const handleSwitchForm = (id) => {
        if (id === 1) {
            context.handleChangeForm('registerform');
        }
    };

    const [formType, setFormType] = useState(registerList[0]);

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title-header')}>{formType.title}</span>
            <div className={cx('list-button')}>
                {formType.contents.map((item, index) => (
                    <Button
                        disabled={item.disabled}
                        key={index}
                        white
                        className={cx('item-button')}
                        onClick={() => handleSwitchForm(item.id)}
                    >
                        <span className={cx('icon')}>{item.icon}</span>
                        <span className={cx('title')}>{item.title}</span>
                    </Button>
                ))}
                {formType.showMore && (
                    <div className={cx('more-btn')} onClick={() => setFormType(registerList[1])}>
                        <DownExpandIcon />
                    </div>
                )}
            </div>
        </div>
    );
}

export default RegisterAuthForm;
