
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import useAxiosWithToken from 'hooks/useAxiosWithToken';
import { getAllReportsService } from 'features/report/services/report';

const useFetchAllReport = () => {
    console.log("call fetch reports")
    const [reports, setReports] = useState([])
    const { accessToken } = useSelector((store) => store.auth);
    const axiosWithToken = useAxiosWithToken();

    const filterReport = useMemo(() => {
        const report_list = [];
        reports.forEach((report) => {
            if (report) report_list.push(report);
        });
        return { report_list };
    }, [reports]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await getAllReportsService(axiosWithToken);
                console.log("response: ", response)
                setReports(response.data.payload.listReport)

            } catch (error) {
                console.log('🚀 ~ file: index.jsx:27 ~ fetchReports ~ error', error);
            }
        };
        fetchReports();
    }, [axiosWithToken, accessToken]);


    return filterReport

}


export default useFetchAllReport;