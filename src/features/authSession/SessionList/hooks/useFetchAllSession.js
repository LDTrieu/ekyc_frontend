
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import useAxiosWithToken from 'hooks/useAxiosWithToken';
import { getAllSessionService } from 'features/authSession/services/session';


const useFetchAllSession = () => {
    console.log("call fetch sessions")
    const [sessions, setSessions] = useState([])
    const { accessToken } = useSelector((store) => store.auth);
    const axiosWithToken = useAxiosWithToken();

    const filterSession = useMemo(() => {
        const session_list = [];
        sessions.forEach((session) => {
            if (session) session_list.push(session);
        });
        return { session_list };
    }, [sessions]);

    useEffect(() => {


        const fetchSessions = async () => {

            try {
                const response = await getAllSessionService(axiosWithToken);
                console.log("response: ", response)
                setSessions(response.data.payload.listSession)

            } catch (error) {
                console.log('🚀 ~ file: index.jsx:27 ~ fetchsetSessions ~ error', error);
            }
        };
        fetchSessions();
    }, [axiosWithToken, accessToken]);
    return filterSession
}

export default useFetchAllSession;