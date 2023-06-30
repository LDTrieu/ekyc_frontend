import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { basePrivate } from '../lib/base';

const useAxiosWithToken = () => {
  const { accessToken } = useSelector((store) => store.auth);
  // console.log("accessToken: ", accessToken)

  useEffect(() => {
    const request = basePrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = 'Bearer ' + accessToken;
        }
        config.headers['Access-Control-Allow-Origin'] = '*';
        config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        config.headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Authorization';
        config.headers['Access-Control-Allow-Credentials'] = 'true';
        config.headers['Access-Control-Allow-Credentials'] = 'true';
        config.headers['Access-Control-Allow-Credentials'] = 'true';
        config.headers['Access-Control-Allow-Credentials'] = 'true';
        config.headers['Access-Control-Allow-Credentials'] = 'true';

        // Sec-Fetch-Site:
        // Sec-Fetch-Dest:
        // Accept-Encoding: gzip, deflate, br
        // Accept-Language:   en-US,en;q=0.9
         // Host: localhost:8080
        return config;
      },
      (error) => error,
    );

    return () => {
      basePrivate.interceptors.request.eject(request);
    };
  }, [accessToken]);

  return basePrivate;
};

export default useAxiosWithToken;
