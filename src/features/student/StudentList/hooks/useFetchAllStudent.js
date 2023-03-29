
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import useAxiosWithToken from 'hooks/useAxiosWithToken';
import { getAllStudentsService } from 'features/student/services/student';

const useFetchAllStudent = () => {
    console.log("call fetch students")
    const [students, setStudents] = useState([])
    const { accessToken } = useSelector((store) => store.auth);
    const axiosWithToken = useAxiosWithToken();

    const filterStudent = useMemo(() => {
        const student_list = [];
        students.forEach((student) => {
            if (student) student_list.push(student);
        });
        return { student_list };
    }, [students]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await getAllStudentsService(axiosWithToken);
                console.log("response: ", response)
                setStudents(response.data.payload.listStudent)

            } catch (error) {
                console.log('🚀 ~ file: index.jsx:27 ~ fetchStudents ~ error', error);
            }
        };
        fetchStudents();
    }, [axiosWithToken, accessToken]);


    return filterStudent

}


export default useFetchAllStudent;