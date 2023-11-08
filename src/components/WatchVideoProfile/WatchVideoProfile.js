import { useContext, useState } from 'react';
import classNames from 'classnames/bind';

import { CommentContext } from '../CommentProvider';
import styles from './WatchVideoProfile.module.scss';
import VideoCommentItem from '~/components/VideoCommentItem';
import { DotDotDot, XIcon } from '../Icons';
import Tippy from '@tippyjs/react';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '../Button/Button';
import { DeleteVideoService } from '~/service/DeleteVideoService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function WatchVideoProfile({ children }) {
    const contextComment = useContext(CommentContext);
    const [isPressDelete, setIsPressDelete] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const handleShowDelete = () => {
        setIsPressDelete(true);
    };

    const handleHideDelete = () => {
        setIsPressDelete(false);
    };

    const fetchApi = async () => {
        const result = await DeleteVideoService(contextComment.idVideoCurrent);
        console.log('Delete Video Status: ', result);

        setLoading(false);
        setLoaded(true);
        setIsPressDelete(false);
    };

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                <span className={cx('line-1')}>Privacy settings</span>
                <span className={cx('line-2')} onClick={handleShowDelete}>
                    Delete
                </span>
            </PopperWrapper>
        </div>
    );

    return (
        <div className={cx('comment-mask')}>
            {loaded && <span className={cx('notify')}>Delete Video Success</span>}
            {isPressDelete && (
                <div className={cx('wrapper-delete')}>
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                    <div className={cx('container-delete')}>
                        <div className={cx('title-delete')}>
                            <span>Are you sure you want to Delete?</span>
                        </div>
                        <div className={cx('button-wrapper-delete')}>
                            <Button white className={cx('button-cancel')} onClick={handleHideDelete}>
                                Cancel
                            </Button>
                            <Button
                                outline
                                className={cx('button-cancel')}
                                onClick={() => {
                                    fetchApi();
                                    setLoading(true);
                                }}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            <div className={cx('wrapper')}>
                <div className={cx('close-btn')} onClick={contextComment.handleHideWatchComment}>
                    <XIcon />
                </div>
                <div className={cx('content-video')}>
                    <VideoCommentItem>{contextComment.currentLink}</VideoCommentItem>
                </div>
                <div className={cx('right-side')}>
                    <div>
                        <Tippy
                            delay={[0, 300]}
                            animation={false}
                            interactive
                            placement="left-end"
                            render={renderResult}
                        >
                            <div className={cx('more-btn')}>
                                <DotDotDot />
                            </div>
                        </Tippy>
                    </div>
                    <div className={cx('desc')}></div>
                    <div className={cx('comment')}></div>
                </div>
            </div>
        </div>
    );
}

export default WatchVideoProfile;
