import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProfileUser from '~/layouts/components/ProfileUser';
import { getAnUserService } from '~/service/GetAnUser';

function Profile() {
    const [dataUser, setDataUser] = useState();

    const { nickname } = useParams();

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getAnUserService(nickname);
            setDataUser(result);
        };
        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log('GGG: ', dataUser);
    return <ProfileUser dataUser={dataUser}></ProfileUser>;
}

export default Profile;
