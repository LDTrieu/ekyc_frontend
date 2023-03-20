import React from "react";
import { useNavigate } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../../../components/ui";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import moment from "moment";
import { studentProfileScheme } from "../../../../validations/studentProfile";
import { addStudent, createStudentProfile } from "../../../../features/student/studentSlice";

function StudentProfile({data,onDataChange }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(studentProfileScheme) });
  const value = watch();
  const handleDataForm = async (data, result) => {
    console.log("data", data);
    result = await dispatch(
      createStudentProfile({
        axiosPrivate,
        studentId: value.studentId,
        email: value.email,
        firstName: value.firstName,
        lastName: value.lastName,
        phoneNumber: value.phoneNumber,
        dateOfBirth: moment(value.dateOfBirth).format("YYYY-MM-DDTHH:mm:ssZ"),
        address: value.address,
        gender: value.gender,
        unitId: value.unitId,
      })
    );
    const student= {
      studentId:value.studentId,
      email: value.email,
      firstName: value.firstName,
      lastName: value.lastName,
      phoneNumber: value.phoneNumber,
    }
    console.log("result: ", result);
    if (result.type === "student/createStudentProfile/fulfilled") {
      console.log("result.payload.code", result.payload.code);
      switch (result.payload.code) {
        case 0:
          console.log("result.payload",result.payload)
          console.log("student: ",student)
          toast.success("Tạo tài khoản thành công!");
        
          onDataChange(student);
          break;
        case 53:
          toast.error("Service lỗi! "+result.payload.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;
        default:
          if (result.payload.message.length !== 0) {
            toast.error(result.payload.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            toast.error("Lỗi gì đó đã xảy ra tại service!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
      }
      // Navigate if success
      navigate("/student/create");
    } else {
      toast.error("Lỗi gì đó đã xảy ra!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="flex flex-col justify-between">
      <form
        className="flex flex-col md:px-5 lg:px-10 py-8"
        onSubmit={handleSubmit(handleDataForm)}
      >
        <h1
          tabIndex={0}
          role="heading"
          aria-label="profile information"
          className="focus:outline-none text-3xl font-bold text-gray-800 mt-12"
        >
          Tạo mới nhân viên
        </h1>
        {/* <p role="contentinfo" className=" focus:outline-nonetext-sm font-light leading-tight text-gray-600 mt-4">
                Fill in the data for profile. It will take a couple of minutes. <br />
                You only need a passport
        </p> */}
        <h2
          role="heading"
          aria-label="enter Personal data"
          className="text-xl font-semibold leading-7 text-gray-800 mt-10"
        >
          Thông tin nhân viên
        </h2>
        {/* <p className="text-sm font-light leading-none text-gray-600 mt-0.5">
          Your details and place of birth
        </p> */}
        <div className="mt-8 md:flex items-center">
          <div className="flex flex-col">
            <label className="mb-3 text-sm leading-none text-gray-800">
              Họ và tên đệm
            </label>
            <Input
              label="Họ và tên đệm"
              //alternativeValue={value.firstName}
              {...register("firstName")}
              fancyOutlined
              status={errors.firstName?.message ? "error" : ""}
            />
            <p
              data-testid="firstname-error"
              className="text-ac_red text-sm mt-1"
            >
              {errors.firstname?.message}
            </p>
          </div>
          <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
            <label className="mb-3 text-sm leading-none text-gray-800">
              Tên
            </label>
            <Input
              label="Tên"
              //alternativeValue={value.lastname}
              {...register("lastName")}
              fancyOutlined
              status={errors.lastName?.message ? "error" : ""}
            />
            <p
              data-testid="lastname-error"
              className="text-ac_red text-sm mt-1"
            >
              {errors.lastname?.message}
            </p>
          </div>
        </div>
        <div className="mt-12 md:flex items-center">
          <div className="flex flex-col">
            <label className="mb-3 text-sm leading-none text-gray-800">
              Email
            </label>
            <Input
              label="Email"
              rightIcon={<MdAlternateEmail />}
              // alternativeValue={value.email}
              {...register("email")}
              fancyOutlined
              status={errors.email?.message ? "error" : ""}
            />
            <p data-testid="email-error" className="text-ac_red text-sm mt-1">
              {errors.email?.message}
            </p>
          </div>
          <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
            <label className="mb-3 text-sm leading-none text-gray-800">
              Số điện thoại
            </label>
            <Input
              type="number"
              label="Số điện thoại"
              // alternativeValue={value.phoneNumber}
              // tabIndex={0}
              {...register("phoneNumber")}
              fancyOutlined
              //aria-label="Enter phone number"
              // className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
              defaultValue="+81 839274"
            />
          </div>
        </div>
        <div className="mt-12 md:flex items-center">
          <div className="flex flex-col">
            <label className="mb-3 text-sm leading-none text-gray-800">
              Mã sinh viên
            </label>
            <Input
              label="Mã sinh viên"
              //alternativeValue={value.lastname}
              {...register("studentId")}
              fancyOutlined
              //status={errors.lastName?.message ? 'error' : ''}
            />
            {/* <p data-testid="lastname-error" className="text-ac_red text-sm mt-1">
              {errors.lastname?.message}
            </p> */}
          </div>

          <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
            <label className="mb-3 text-sm leading-none text-gray-800">
              Tên đơn vị
            </label>
            <Input
              label="Tên đơn vị"
              //alternativeValue={value.lastname}
              {...register("unitId")}
              fancyOutlined
              //status={errors.lastName?.message ? 'error' : ''}
            />
            {/* <p data-testid="lastname-error" className="text-ac_red text-sm mt-1">
              {errors.lastname?.message}
            </p> */}
          </div>
        </div>
        <div className="mt-12 md:flex items-center">
          <div className="flex flex-col">
            <label className="mb-3 text-sm leading-none text-gray-800">
              Ngày sinh
            </label>
            <Input
              label="Ngày sinh"
              type="date"
              // alternativeValue={moment(value.dateOfBirth).format("YYYY-MM-DD")}
              fancyOutlined
              {...register("dateOfBirth")}
            />
            <p
              data-testid="birthdate-error"
              className="text-ac_red text-sm mt-1"
            >
              {errors.dateOfBirth?.message}
            </p>
          </div>
          <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
            <label className="mb-3 text-sm leading-none text-gray-800">
              Địa chỉ
            </label>
            <input
              type="name"
              tabIndex={0}
              //alternativeValue={value.placeofbirth}
              {...register("address")}
              aria-label="Enter place of birth"
              className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
              defaultValue="Thu Duc, Ho Chi Minh City, Vietnam"
            />
          </div>
        </div>
        {/* <div className="mt-12">
          <div className="py-4 flex items-center">
            <div className="bg-white dark:bg-gray-800 border rounded-sm border-gray-400 dark:border-gray-700 w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
              <input
                type="checkbox"
                tabIndex={0}
                aria-label="I agree with the terms of service"
                defaultChecked
                className="checkbox opacity-0 absolute cursor-pointer w-full h-full"
              />
              <div className="check-icon hidden bg-blue-500 text-white rounded-sm">
                <svg
                  className="icon icon-tabler icon-tabler-check"
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M5 12l5 5l10 -10" />
                </svg>
              </div>
            </div>
            <p className="text-sm leading-none ml-2">
              I agree with the{" "}
              <span className="text-indigo-700">terms of service</span>
            </p>
          </div>
        </div> */}
        <button
          role="button"
          aria-label="Next step"
          className="flex items-center justify-center py-4 px-7 focus:outline-none bg-white border rounded border-gray-400 mt-7 md:mt-14 hover:bg-gray-100  focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
        >
          <span className="text-sm font-medium text-center text-gray-800 capitalize">
            Next Step
          </span>
          <svg
            className="mt-1 ml-3"
            width={12}
            height={8}
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.01 3H0V5H8.01V8L12 4L8.01 0V3Z" fill="#242731" />
          </svg>
        </button>

        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n          .checkbox:checked + .check-icon {\n              display: flex;\n          }\n      ",
          }}
        />
      </form>
    </div>
  );
}

export default StudentProfile;
