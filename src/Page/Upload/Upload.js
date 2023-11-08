import { useState } from 'react';

import Button from '~/components/Button';
import styles from './Upload.module.scss';
import classNames from 'classnames/bind';
import Image from '~/components/Images';
import images from '~/assets/images';
import { postVideoService } from '~/service/PostVideoService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Upload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFile, setIsFile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFile(true);
    };

    const upLoadFile = () => {
        const fetchApi = async () => {
            const FormData = require('form-data');
            const formData = new FormData();

            formData.append('description', 'Trend Tiktok 2023');

            formData.append('upload_file', selectedFile);
            formData.append('thumbnail_time', 5);
            formData.append('music', 'Hot Trend Tiktok 2023 Music!');
            formData.append('viewable', 'public');

            const result = await postVideoService(formData);

            console.log('result post video: ', result);
            setIsFile(false);
            setLoading(false);
            setLoaded(true);
        };
        fetchApi();
    };

    return (
        <div className={cx('cover-outside')}>
            {loaded && <span className={cx('notify')}>Upload Video Success</span>}
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('body-upload')}>
                        {console.log('Loading: ', loading)}
                        {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                        <span className={cx('icon-upload')}>
                            <Image src={images.uploadImage}></Image>
                        </span>
                        <input
                            className={cx('input-file')}
                            id="ups"
                            type="file"
                            accept="video/*"
                            onChange={handleFileChange}
                        />
                        <label className={cx('label-upload')} htmlFor="ups"></label>
                        <div className={cx('note')}>
                            <span className={cx('select-span')}>Select video to upload</span>
                            <div>
                                <span className={cx('after-select')}>Or drag and drop a file</span>
                                <span className={cx('after-select')}>
                                    Long videos can be split into multiple parts to get more exposure
                                </span>
                            </div>
                        </div>
                        <div className={cx('data-file')}>
                            <span className={cx('after-data')}>MP4 or WebM</span>
                            <span className={cx('after-data')}>720x1280 resolution or higher</span>
                            <span className={cx('after-data')}>Up to 30 minutes</span>
                            <span className={cx('after-data')}>Less than 2 GB</span>
                        </div>
                        <Button className={cx('button-choose')} primary>
                            Select file
                        </Button>
                    </div>
                </div>
                <Button
                    disabled={!isFile}
                    className={cx('button-post')}
                    primary
                    onClick={() => {
                        upLoadFile();
                        setLoading(true);
                    }}
                >
                    Post
                </Button>
            </div>
            <div className={cx('footer-upload')}></div>
        </div>
    );
}

export default Upload;
