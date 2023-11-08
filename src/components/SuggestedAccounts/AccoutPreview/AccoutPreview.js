import classNames from 'classnames/bind';

import styles from './AccoutPreview.module.scss';
import Image from '~/components/Images';
import Button from '~/components/Button';
import { BlueTickIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function AccoutPreview({ item }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Image className={cx('avatar')} src={item.avatar} alt="" />
                <Button outline className={cx('follow-btn')}>
                    Follow
                </Button>
            </div>
            <div className={cx('body')}>
                <div className={cx('name-header')}>
                    <p className={cx('nickname')}>
                        <strong>{item.nickname}</strong>
                        {item.tick && <BlueTickIcon className={cx('check')} />}
                    </p>
                    <p className={cx('name')}>{`${item.last_name} ${item.first_name}`}</p>
                </div>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{item.followers_count}</strong>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}>{item.likes_count}</strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
            <div className={cx('bio')}>Learn More</div>
        </div>
    );
}

export default AccoutPreview;
