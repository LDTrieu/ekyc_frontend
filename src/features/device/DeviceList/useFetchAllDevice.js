
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import useAxiosWithToken from 'hooks/useAxiosWithToken';
import { getAllDevicesService } from 'features/device/services/device';

const useFetchAllDevice = () => {
    console.log("call fetch devices")
    const [devices, setDevices] = useState([])
    const { accessToken } = useSelector((store) => store.auth);
    const axiosWithToken = useAxiosWithToken();

    const filterDevice = useMemo(() => {
        const device_list = [];
        devices.forEach((device) => {
            if (device) device_list.push(device);
        });
        return { device_list };
    }, [devices]);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await getAllDevicesService(axiosWithToken);
                console.log("response: ", response)
                setDevices(response.data.payload.listDevice)

            } catch (error) {
                console.log('🚀 ~ file: index.jsx:27 ~ fetchDevices ~ error', error);
            }
        };
        fetchDevices();
    }, [axiosWithToken, accessToken]);


    return filterDevice

}
export default useFetchAllDevice;