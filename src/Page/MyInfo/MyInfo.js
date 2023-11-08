import { useEffect, useState } from 'react';

import { getCurrentUserService } from '~/service/GetCurrentUser';
import MyInfoUser from '~/components/MyInfoUser';
import { getAnUserService } from '~/service/GetAnUser';

function MyInfo() {
    const [myInfo, setMyInfo] = useState();
    const [listVideo, setListVideo] = useState();

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getCurrentUserService();

            if (result) {
                setMyInfo(result);
                console.log(result.nickname);
                const result1 = await getAnUserService(`@${result.nickname}`);
                setListVideo(result1);
            }
        };
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log('Trans: ', listVideo);
    return <MyInfoUser dataUser={myInfo} listVideo={listVideo}></MyInfoUser>;
}

export default MyInfo;
