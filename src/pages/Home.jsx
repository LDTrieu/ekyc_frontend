import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import useAxiosWithToken from '../hooks/useAxiosWithToken';
import Container from './Container';


// const useFetchPopularCourse = () => {
//   const [courses, setCourses] = useState([]);
//   const axiosWithToken = useAxiosWithToken();

//   useEffect(() => {
//     const fetchPopularCourse = async () => {
//       try {
//         const response = await getPopularCourseService(axiosWithToken);
//         setCourses(response.data.data);
//       } catch (error) {
//         console.log('🚀 ~ file: Home.jsx:22 ~ useEffect ~ error', error);
//       }
//     };

//     fetchPopularCourse();
//   }, [axiosWithToken]);

//   return { courses };
// };

// const useFetchLatestExams = () => {
//   const [data, setData] = useState([]);
//   const axiosWithToken = useAxiosWithToken();

//   useEffect(() => {
//     const fetchPopularCourse = async () => {
//       try {
//         const response = await getLatestExamsService(axiosWithToken);
//         setData(response.data.data);
//       } catch (error) {
//         console.log('🚀 ~ file: Home.jsx:22 ~ useEffect ~ error', error);
//       }
//     };

//     fetchPopularCourse();
//   }, [axiosWithToken]);

//   return { data };
// };

const Home = () => {
  // const { courses } = useFetchPopularCourse();
  // const { data: exams } = useFetchLatestExams();

  // if (!courses) return null;

  return (
    <Container className="py-11">
      {/* Carousel */}
      <Swiper
        className="max-w-full"
        pagination={{
          clickable: true,
          renderBullet: (_, className) =>
            '<span class="' + className + '" style="width: 12px; height: 12px; margin-right: 8px;"></span>',
        }}
        modules={[Pagination]}
      >
        <SwiperSlide>
          <img
            src={require('../assets/banner1.jpg')}
            className="aspect-[5/2] w-full object-cover rounded-lg"
            alt="Banner 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={require('../assets/banner2.jpg')}
            className="aspect-[5/2] w-full object-cover rounded-lg"
            alt="Banner 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={require('../assets/banner3.jpg')}
            className="aspect-[5/2] w-full object-cover rounded-lg"
            alt="Banner 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={require('../assets/banner4.jpg')}
            className="aspect-[5/2] w-full object-cover rounded-lg"
            alt="Banner 1"
          />
        </SwiperSlide>
        <div className="h-11"></div>
      </Swiper>

    </Container>
  );
};

export default Home;
