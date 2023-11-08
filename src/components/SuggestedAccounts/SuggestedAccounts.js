import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
import * as getSuggestUser from '~/service/GetSuggestUser';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label }) {
    const page = 6;
    const per_page = 5;
    const [suggestUser, setSuggestUer] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getSuggestUser.getSuggestUser(per_page, page);
            setSuggestUer(result);
        };

        fetchApi();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {suggestUser.map((item, index) => (
                <AccountItem key={index} item={item} />
            ))}

            <p className={cx('more-btn')}>See more</p>
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SuggestedAccounts;
