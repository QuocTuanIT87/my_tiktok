import classNames from 'classnames/bind';
import styles from './MyInfo.module.scss';
import { useContext } from 'react';
import Image from '~/components/Images/Images';
import { ModalContext } from '~/components/ModalProvider';
import { DotDotDot, EditIcon, PLayIconEmpty, ShareEmptyIcon } from '~/components/Icons';
import ListVideoProfile from '~/components/ListVideoProfile';
import { CommentContext } from '~/components/CommentProvider';
import WatchVideoProfile from '~/components/WatchVideoProfile/WatchVideoProfile';

const cx = classNames.bind(styles);

function MyInfoUser({ dataUser, listVideo }) {
    const contextModal = useContext(ModalContext);
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
                    <button onClick={contextModal.handleShowEditProfile} className={cx('button-follow')}>
                        <EditIcon className={cx('icon-edit')} />
                        Edit Profile
                    </button>
                </div>
                <div className={cx('interact-count')}>
                    <strong className={cx('counts')}>{(listVideo && listVideo.followings_count) || 0}</strong>
                    <span className={cx('field')}>Following</span>
                    <strong className={cx('counts')}>{(listVideo && listVideo.followers_count) || 0}</strong>
                    <span className={cx('field')}>Followers</span>
                    <strong className={cx('counts')}>{(listVideo && listVideo.likes_count) || 0}</strong>
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
                {listVideo &&
                    listVideo.videos.map((item, index) => (
                        <div className={cx('container')} key={item.id}>
                            <ListVideoProfile item={item} />
                            <span className={cx('count-view')}>
                                <PLayIconEmpty /> <span>{item.views_count}</span>
                            </span>
                            <span className={cx('desp-video')}>This is a video</span>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default MyInfoUser;
