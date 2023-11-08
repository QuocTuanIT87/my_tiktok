import classNames from 'classnames/bind';
import styles from './ProfileUser.module.scss';
import { useContext } from 'react';
import Image from '~/components/Images/Images';
import { DotDotDot, PLayIconEmpty, ShareEmptyIcon } from '~/components/Icons';
import ListVideoProfile from '~/components/ListVideoProfile';
import { CommentContext } from '~/components/CommentProvider';
import WatchVideoProfile from '~/components/WatchVideoProfile/WatchVideoProfile';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function ProfileUser({ dataUser }) {
    const contextComment = useContext(CommentContext);

    return (
        <div className={cx('wrapper')}>
            {contextComment.isWatch && <WatchVideoProfile />}
            <div className={cx('info')}>
                <Image src={dataUser && dataUser.avatar} className={cx('image-profile')} atl="" />
                <div className={cx('personal')}>
                    <span className={cx('nickname')}>{dataUser && dataUser.nickname}</span>
                    <span className={cx('name')}>{`${dataUser && dataUser.last_name} ${
                        dataUser && dataUser.first_name
                    }`}</span>
                    <Button primary className={cx('button-follow')}>
                        Follow
                    </Button>
                </div>
                <div className={cx('interact-count')}>
                    <strong className={cx('counts')}>{(dataUser && dataUser.followings_count) || 0}</strong>
                    <span className={cx('field')}>Following</span>
                    <strong className={cx('counts')}>{(dataUser && dataUser.followers_count) || 0}</strong>
                    <span className={cx('field')}>Followers</span>
                    <strong className={cx('counts')}>{(dataUser && dataUser.likes_count) || 0}</strong>
                    <span className={cx('field')}>Likes</span>
                </div>
                <div className={cx('bio')}>{dataUser && dataUser.bio}</div>
                <div className={cx('bio')}>{dataUser && dataUser.website_url}</div>
                <div className={cx('icon')}>
                    <span>
                        <ShareEmptyIcon />
                    </span>
                    <DotDotDot />
                </div>
            </div>
            <div className={cx('tag-name')}>
                <span className={cx('tag')}>Videos</span>
                <span className={cx('tag')}>Liked</span>
            </div>
            <div className={cx('show-video')}>
                {dataUser &&
                    dataUser.videos.map((item, index) => (
                        <div className={cx('container')} key={item.id}>
                            <ListVideoProfile item={item} />
                            <span className={cx('count-view')}>
                                <PLayIconEmpty /> <span>{item.views_count}</span>
                            </span>
                            <span className={cx('desp-video')}>{`${item.description.slice(
                                0,
                                (item.description.length * 2) / 3,
                            )} ...`}</span>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default ProfileUser;
