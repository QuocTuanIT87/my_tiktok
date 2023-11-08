import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';

import styles from './VideoCommentItem.module.scss';
import { VideoContext } from '~/components/VideoProvider';
import { PLayIcon, PauseIcon, VolumeIcon, MuteIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function VideoCommentItem({ children }) {
    const videoRef = useRef();

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [minutesLoad, setMinuteLoad] = useState(0);
    const [secondsLoad, setSecondsLoad] = useState(0);
    const [minutesTotal, setMinutesTotal] = useState(0);
    const [secondsTotal, setSecondsTotal] = useState(0);
    const [progress, setProgress] = useState(0);

    const contextVideo = useContext(VideoContext);

    useEffect(() => {
        if (contextVideo.isMute) {
            videoRef.current.volume = 0;
        } else {
            videoRef.current.volume = contextVideo.volume;
        }
    }, [contextVideo.isMute, contextVideo.volume]);

    const handleTimeUpdate = (event) => {
        const video = event.target;
        const percent = (video.currentTime / video.duration) * 100;
        setCurrentTime(percent);
        setProgress(video.currentTime / video.duration);

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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-card')}>
                <video onTimeUpdate={handleTimeUpdate} ref={videoRef} src={children} onEnded={handleVideoEnded}></video>
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
                                    onChange={handleSetTimeVideo}
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
        </div>
    );
}

export default VideoCommentItem;
