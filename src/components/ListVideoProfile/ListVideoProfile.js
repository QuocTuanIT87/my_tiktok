import classNames from 'classnames/bind';
import styles from './ListVideoProfile.module.scss';
import { useContext, useRef, useState } from 'react';
import { CommentContext } from '../CommentProvider';

const cx = classNames.bind(styles);

function ListVideoProfile({ item }) {
    const ref = useRef(null);
    const contextComment = useContext(CommentContext);

    const handlePlayVideo = () => {
        ref.current.play();
    };

    const handlePauseVideo = () => {
        ref.current.pause();
    };

    return (
        <video
            ref={ref}
            className={cx('video')}
            src={item.file_url}
            muted
            onMouseOver={() => handlePlayVideo()}
            onMouseOut={() => handlePauseVideo()}
            onClick={() => {
                contextComment.handleShowWatchComment();
                contextComment.handleSetLink(item.file_url);
                contextComment.setIdVideoCurrent(item.id);
            }}
        ></video>
    );
}

export default ListVideoProfile;
