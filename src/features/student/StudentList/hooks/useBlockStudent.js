import { updateStudentService } from "features/student/services/student";
import useAxiosWithToken from "hooks/useAxiosWithToken";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const BlockStudent = () => {
    const axiosWithToken = useAxiosWithToken();

    async function blockStudent(axiosWithToken, studentId, isBlocked) {
        console.log("CALL Block Student: ", studentId, isBlocked)

        // const { accessToken } = useSelector((store) => store.auth);

        console.log("CALL useEffect")
        if (!isBlocked) {
            console.log("CALL isBlocked")
            try {
                const response = await (updateStudentService(axiosWithToken, studentId, isBlocked));
                console.log("response: ", response)
                //setStudents(response.data.payload.listStudent)
            } catch (error) {
                console.log('🚀 ~ file: index.jsx:27 ~ pathBlockStudent ~ error', error);
            }
        } else {
            console.log("BLOCKED")
        }

    }
};
export default BlockStudent;