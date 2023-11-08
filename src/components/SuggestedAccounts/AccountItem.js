import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import Image from '~/components/Images';
import styles from './SuggestedAccounts.module.scss';
import { BlueTickIcon } from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccoutPreview from './AccoutPreview';

const cx = classNames.bind(styles);

function AccountItem({ item }) {
    const renderPreview = (props) => (
        <div tabIndex="-1" {...props}>
            <PopperWrapper className={cx('menu-popper')}>
                <AccoutPreview item={item} />
            </PopperWrapper>
        </div>
    );

    return (
        // Using a wrapper <div> tag around the reference element solves
        // this by creating a new parentNode context.
        <div>
            <Tippy
                appendTo={document.getElementById('root')}
                offset={[0, 0]}
                interactive
                delay={[800, 500]}
                placement="bottom"
                render={renderPreview}
            >
                <div className={cx('account-item')}>
                    <Image className={cx('avatar')} src={item.avatar} alt="" />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>{item.nickname}</strong>
                            {item.tick && <BlueTickIcon className={cx('check')} />}
                        </p>
                        <p className={cx('name')}>{`${item.last_name} ${item.first_name}`}</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

AccountItem.propTypes = {};

export default AccountItem;
