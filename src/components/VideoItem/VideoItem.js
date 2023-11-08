import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';

import styles from './VideoItem.module.scss';
import {
    HeartVideoIcon,
    HeartVideoActiveIcon,
    OpenCommentIcon,
    FavoriteVideoIcon,
    ShareIcon,
    PLayIcon,
    PauseIcon,
    VolumeIcon,
    MuteIcon,
} from '~/components/Icons';
import { VideoContext } from '~/components/VideoProvider';
import { CommentContext } from '~/components/CommentProvider';
import { LikeVideoService } from '~/service/LikePostService';
import { UnLikeVideoService } from '~/service/UnLikePostService';

const cx = classNames.bind(styles);

function VideoItem({ children, idVideo, uuidVideo, item }) {
    const videoRef = useRef();
    const myRef = useRef();

    console.log('UUID in VideoItem: ', uuidVideo);

    const contextVideo = useContext(VideoContext);
    const contextComment = useContext(CommentContext);

    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [minutesLoad, setMinuteLoad] = useState(0);
    const [secondsLoad, setSecondsLoad] = useState(0);
    const [minutesTotal, setMinutesTotal] = useState(0);
    const [secondsTotal, setSecondsTotal] = useState(0);
    const [myElementIsVisible, setMyElementIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [coutLiked, setCountLiked] = useState();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            setMyElementIsVisible(entry.isIntersecting);
        });
        observer.observe(myRef.current);

        //&& videoRef.current.readyState === 4
        //This is a condition check load done video
        //because some video not provide full source
        //all of them is provided so i dont give it to my source code

        if (myElementIsVisible && videoRef.current) {
            setIsPlaying(true);
            videoRef.current.play();
        } else if (!myElementIsVisible && videoRef.current) {
            setIsPlaying(false);
            videoRef.current.pause();
        }
    }, [myElementIsVisible]);

    useEffect(() => {
        if (item.is_liked) {
            setIsLiked(true);
        }
        setCountLiked(item.likes_count);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (contextVideo.isMute) {
            videoRef.current.volume = 0;
        } else {
            videoRef.current.volume = contextVideo.volume;
        }
    }, [contextVideo.isMute, contextVideo.volume]);

    useEffect(() => {
        const interval = setInterval(() => {
            const timeLoad = videoRef.current.currentTime;
            const minutesLoad = Math.floor(timeLoad / 60);
            setMinuteLoad(minutesLoad);
            const secondsLoad = Math.floor(timeLoad % 60);
            setSecondsLoad(secondsLoad);
            const totalTime = videoRef.current.duration;
            const minutesTotal = Math.floor(totalTime / 60);
            setMinutesTotal(minutesTotal);
            const secondsTotal = Math.floor(totalTime % 60);
            setSecondsTotal(secondsTotal);
        }, 1000); // Cập nhật thời gian mỗi giây

        return () => clearInterval(interval);
    }, []);

    const handleTimeUpdate = (event) => {
        const video = event.target;
        const percent = (video.currentTime / video.duration) * 100;
        setCurrentTime(percent);
        setProgress(video.currentTime / video.duration);
    };

    const handleSetTimeVideo = (event) => {
        const percent = parseFloat(event.target.value);
        const time = (videoRef.current.duration / 100) * percent;
        videoRef.current.currentTime = time;
        setCurrentTime(percent);
        setProgress(videoRef.current.currentTime / videoRef.current.duration);
    };

    const handlePLayVideo = () => {
        videoRef.current.play();
    };

    const handlePauseVideo = () => {
        videoRef.current.pause();
        setIsPlaying(false);
    };

    const toggleVideo = () => {
        if (isPlaying) {
            handlePauseVideo();
            setIsPlaying(false);
        } else {
            handlePLayVideo();
            setIsPlaying(true);
        }
    };

    const handleVideoEnded = () => {
        videoRef.current.play();
    };

    const handleVolumeChange = (e) => {
        videoRef.current.volume = e.target.value;
    };

    const setLikeVideo = async () => {
        const result = await LikeVideoService(item.id);
        setIsLiked(true);
        setCountLiked(coutLiked + 1);
        console.log('Liked result: ', result);
    };

    const setUnLikeVideo = async () => {
        const result = await UnLikeVideoService(item.id);
        setIsLiked(false);
        setCountLiked(coutLiked - 1);
        console.log('Unliked result: ', result);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-card')}>
                <video
                    onClick={() => {
                        contextComment.handleShowComment();
                        contextComment.handleSetLink(children);
                        contextComment.setIdVideoCurrent(idVideo);
                        handlePauseVideo();
                        contextComment.setUiidVideo(uuidVideo);
                    }}
                    onTimeUpdate={handleTimeUpdate}
                    ref={videoRef}
                    src={children}
                    onEnded={handleVideoEnded}
                ></video>
                <div className={cx('controls')}>
                    <div className={cx('play-pause')} onClick={toggleVideo}>
                        {isPlaying ? <PLayIcon /> : <PauseIcon />}
                    </div>
                    <div className={cx('controls-volume')}>
                        <div className={cx('change-volume')}>
                            <input
                                className={cx('range')}
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={contextVideo.volume}
                                onChange={(e) => {
                                    contextVideo.handleAdjustVolume(e);
                                    handleVolumeChange(e);
                                }}
                            />
                        </div>

                        <div className={cx('sound-mute')} onClick={contextVideo.toggleMuted}>
                            {contextVideo.isMute && (
                                <span className={cx('mute-icon')}>
                                    <MuteIcon />
                                </span>
                            )}

                            {!contextVideo.isMute && (
                                <span className={cx('volume-icon')}>
                                    <VolumeIcon />
                                </span>
                            )}
                        </div>
                    </div>
                    <div className={cx('progress-time')}>
                        <div className={cx('time-video')}>
                            <div className={cx('control-time')}>
                                <input
                                    id={styles.progress}
                                    className={cx('range')}
                                    type="range"
                                    value={currentTime}
                                    step="0.1"
                                    min="0"
                                    max="100"
                                    onInput={handleSetTimeVideo}
                                />
                                <label
                                    htmlFor={styles.progress}
                                    className={cx('range-progess')}
                                    style={{ transform: `scaleX(${progress}) translateY(-50%)` }}
                                ></label>
                            </div>

                            <div className={cx('timeon')}>{`${minutesLoad}:${
                                secondsLoad < 10 ? '0' : ''
                            }${secondsLoad}/${minutesTotal}:${secondsTotal < 10 ? '0' : ''}${secondsTotal}`}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('icons-video')}>
                <div ref={myRef} className={cx('autoplay-video-ref')} />
                <button>
                    {!isLiked && (
                        <span className={cx('cover-icon')} onClick={setLikeVideo}>
                            <HeartVideoIcon />
                        </span>
                    )}
                    {isLiked && (
                        <span className={cx('cover-icon')} onClick={setUnLikeVideo}>
                            <HeartVideoActiveIcon />
                        </span>
                    )}
                    <strong className={cx('count-icon')}>{coutLiked}</strong>
                </button>

                <button>
                    <span className={cx('cover-icon')}>
                        <OpenCommentIcon />
                    </span>
                    <strong className={cx('count-icon')}>{item.comments_count}</strong>
                </button>

                <button>
                    <span className={cx('cover-icon')}>
                        <FavoriteVideoIcon />
                    </span>
                    <strong className={cx('count-icon')}>0</strong>
                </button>

                <button>
                    <span className={cx('cover-icon')}>
                        <ShareIcon />
                    </span>
                    <strong className={cx('count-icon')}>{item.shares_count}</strong>
                </button>
            </div>
        </div>
    );
}

export default VideoItem;
