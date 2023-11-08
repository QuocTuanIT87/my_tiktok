import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useState } from 'react';

import { BlueTickIcon } from '../Icons';
import Image from '../Images';
import styles from './VideoInfoOverlay.module.scss';
import Button from '../Button';
import { MusicIcon } from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccoutPreviewOverlay from './AccoutPreviewOverlay';

const cx = classNames.bind(styles);

function VideoInfoOverlay({ item }) {
    const renderPreview = (props) => (
        <div tabIndex="-1" {...props}>
            <PopperWrapper className={cx('menu-popper')}>
                <AccoutPreviewOverlay item={item} />
            </PopperWrapper>
        </div>
    );

    const [isFollow, setIsFollow] = useState();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('item-info')}>
                <div>
                    <Tippy delay={[800, 500]} offset={[0, 0]} interactive placement="bottom" render={renderPreview}>
                        <div>
                            <Image className={cx('avatar')} src={item && item.user.avatar} alt="" />
                            <p className={cx('name-header')}>
                                <Link className={cx('nickname')} to={`@${item && item.user.nickname}`}>{`${
                                    item && item.user.nickname
                                }`}</Link>
                                <span className={cx('fullname')}>
                                    {item && item.user.tick && <BlueTickIcon className={cx('check')} />}
                                    {`${item && item.user.last_name} ${item && item.user.first_name}`}
                                </span>
                            </p>
                        </div>
                    </Tippy>
                </div>
                <p className={cx('description')}>{item && item.description}</p>
                <Link to="/music">
                    <span className={cx('music-icon')}>
                        <MusicIcon />
                    </span>
                    <span className={cx('music-name')}> {(item && item.music) || 'Sound in video!'}</span>
                </Link>
            </div>
            {!isFollow && (
                <Button className={cx('button-follow')} outline small onClick={() => setIsFollow(true)}>
                    Follow
                </Button>
            )}
            {isFollow && (
                <button className={cx('button-following')} onClick={() => setIsFollow(false)}>
                    Following
                </button>
            )}
        </div>
    );
}

export default VideoInfoOverlay;
