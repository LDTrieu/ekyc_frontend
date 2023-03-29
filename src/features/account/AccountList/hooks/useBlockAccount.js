import { updateAccountService } from "features/account/services/account";
import useAxiosWithToken from "hooks/useAxiosWithToken";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const BlockAccount = () => {
    const axiosWithToken = useAxiosWithToken();

    async function blockAccount(axiosWithToken, accountId, isBlocked) {
        console.log("CALL Block Account: ", accountId, isBlocked)

        // const { accessToken } = useSelector((store) => store.auth);

        console.log("CALL useEffect")
        if (!isBlocked) {
            console.log("CALL isBlocked")
            try {
                const response = await (updateAccountService(axiosWithToken, accountId, isBlocked));
                console.log("response: ", response)
                //setAccounts(response.data.payload.listAccount)
            } catch (error) {
                console.log('🚀 ~ file: index.jsx:27 ~ pathBlockAccount ~ error', error);
            }
        } else {
            console.log("BLOCKED")
        }

    }
};
export default BlockAccount;