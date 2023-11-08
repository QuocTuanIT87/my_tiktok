import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';

import { CommentContext } from '../CommentProvider';
import styles from './LayOutComment.module.scss';
import VideoCommentItem from '~/components/VideoCommentItem';
import { BinIcon, BlueTickIcon, DotDotDot, HeartCommentIcon, XIcon } from '../Icons';
import Image from '~/components/Images';
import { GetListComment } from '~/service/GetListComment';
import Button from '../Button/Button';
import { PostCommentService } from '~/service/PostCommentService';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { DeleteCommentService } from '~/service/DeleteCommentService';
import VideoOverlayComment from '~/components/VideoOverlayComment';
import { GetAVideo } from '~/service/GetAVideoService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function LayOutComment({ children, idVideo }) {
    const contextComment = useContext(CommentContext);
    const [listComment, setListComment] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isPressDelete, setIsPressDelete] = useState(false);
    const [idComment, setIdComment] = useState();
    const [itemOverlay, setItemOverlay] = useState();
    const [haveComment, setHaveComment] = useState(false);

    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const [posting, setPosting] = useState(false);
    const [posted, setPosted] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            console.log('IDVIDEO: ', idVideo);
            const result = await GetListComment(idVideo);
            console.log('List comment: ', listComment);
            setListComment(result);
        };

        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await GetAVideo(contextComment.uuidVideo);

            setItemOverlay(result);
        };

        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchApi = async () => {
        setPosting(true);
        const result = await PostCommentService(contextComment.uuidVideo, newComment);
        console.log('postcomment: ', result);
        setNewComment('');
        const result1 = await GetListComment(idVideo);
        setListComment(result1);
        setHaveComment(false);
        setPosting(false);
        setPosted(true);
        setTimeout(() => {
            setPosted(false);
        }, 2000);
    };

    const handleAddComment = (e) => {
        setHaveComment(true);
        if (e.target.value === '') {
            setHaveComment(false);
        }
        setNewComment(e.target.value);
    };

    const handleDeleteComment = async () => {
        setLoading(true);
        const result = await DeleteCommentService(idComment);
        console.log('delete_comment: ', result);

        const result1 = await GetListComment(idVideo);
        setListComment(result1);
        setIsPressDelete(false);
        setLoading(false);
        setLoaded(true);
        setTimeout(() => {
            setLoaded(false);
        }, 2000);
    };

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                <span
                    className={cx('line-1')}
                    onClick={() => {
                        setIsPressDelete(true);
                        setIdComment(attrs);
                    }}
                >
                    <BinIcon className={cx('bin-icon')} />
                    Delete
                </span>
            </PopperWrapper>
        </div>
    );

    return (
        <div className={cx('comment-mask')}>
            {loaded && <span className={cx('notify')}>Deleted</span>}
            {posted && <span className={cx('notify')}>Posted Comment!</span>}
            {isPressDelete && (
                <div className={cx('wrapper-delete')}>
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                    <div className={cx('container-delete')}>
                        <div className={cx('title-delete')}>
                            <span>Are you sure you want to delete this Comment?</span>
                        </div>
                        <div className={cx('button-wrapper-delete')}>
                            <Button white className={cx('button-cancel')} onClick={() => setIsPressDelete(false)}>
                                Cancel
                            </Button>
                            <Button outline className={cx('button-cancel')} onClick={handleDeleteComment}>
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            <div className={cx('wrapper')}>
                <div className={cx('close-btn')} onClick={contextComment.handleHideComment}>
                    <XIcon />
                </div>
                <div className={cx('content-video')}>
                    <VideoCommentItem>{contextComment.currentLink}</VideoCommentItem>
                </div>
                <div className={cx('right-side')}>
                    <div className={cx('desc')}>
                        <VideoOverlayComment item={itemOverlay} />
                    </div>
                    <div className={cx('comment')}>
                        <div className={cx('wrapper-comment')}>
                            {listComment && listComment.length === 0 && (
                                <span className={cx('be-first')}>Be the first to comment!</span>
                            )}
                            {listComment &&
                                listComment.length !== 0 &&
                                listComment.map((item, index) => (
                                    <div key={item.id} className={cx('item-info')}>
                                        <div className={cx('edit-comment')}>
                                            <Tippy
                                                delay={[0, 300]}
                                                animation={false}
                                                interactive
                                                placement="bottom-start"
                                                render={() => renderResult(item.id)}
                                            >
                                                <div className={cx('more-btn')}>
                                                    <DotDotDot />
                                                </div>
                                            </Tippy>
                                        </div>
                                        <div>
                                            <Image className={cx('avatar')} src={item.user.avatar} alt="" />
                                            <p className={cx('name-header')}>
                                                <Link className={cx('fullname')} to={item.user.nickname}>
                                                    {`${item.user.last_name} ${item.user.first_name}`}
                                                </Link>
                                            </p>
                                        </div>

                                        <p className={cx('description')}>{item.comment}</p>
                                        <span className={cx('time')}>{item.created_at.slice(0, 10)}</span>
                                        <span className={cx('reply')}>Reply</span>
                                        <HeartCommentIcon className={cx('heart-icon')} />
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className={cx('add-comment')}>
                        <div className={cx('input-data')}>
                            <input
                                value={newComment}
                                onChange={handleAddComment}
                                type="text"
                                placeholder="Add comment"
                            ></input>
                        </div>
                        <div>
                            <Button primary disabled={!haveComment && newComment === ''} onClick={fetchApi}>
                                Post
                                {posting && <FontAwesomeIcon className={cx('loading-post')} icon={faSpinner} />}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LayOutComment;
