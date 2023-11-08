import { useEffect, useState } from 'react';

import Content from '~/layouts/components/Content';
import * as getListVideoService from '~/service/GetVideoServices';
import { getComment } from '~/serviceAPI/GetComment';

// const cx = classNames.bind(styles);

function Home() {
    const [contentData, setContentData] = useState([]);
    const [page, setPage] = useState(1);

    // const contextLogin = useContext(LoginContext);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getListVideoService.getListVideo('for-you', page);
            setContentData((prev) => [...prev, ...result]);
        };

        fetchApi();
    }, [page]);

    // Test chức năng comment
    useEffect(() => {
        const fetchApi = async () => {
            const result = await getComment();
            console.log('ResultComment: ', result);
        };

        fetchApi();
    }, [page]);

    function handleScroll() {
        if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
            setPage((page) => page + 1);
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return <Content data={contentData} />;
}

export default Home;
