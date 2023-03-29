
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import useAxiosWithToken from 'hooks/useAxiosWithToken';
import { getAllAccountsService } from 'features/account/services/account';

const useFetchAllAccount = () => {
    console.log("call fetch ants")
    const [accounts, setAccounts] = useState([])
    const { accessToken } = useSelector((store) => store.auth);
    const axiosWithToken = useAxiosWithToken();

    const filterAccount = useMemo(() => {
        const account_list = [];
        accounts.forEach((account) => {
            if (account) account_list.push(account);
        });
        return { account_list };
    }, [accounts]);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await getAllAccountsService(axiosWithToken);
                console.log("response: ", response)
                setAccounts(response.data.payload.listUser)

            } catch (error) {
                console.log('🚀 ~ file: index.jsx:27 ~ fetchAccounts ~ error', error);
            }
        };
        fetchAccounts();
    }, [axiosWithToken, accessToken]);


    return filterAccount

}


export default useFetchAllAccount;