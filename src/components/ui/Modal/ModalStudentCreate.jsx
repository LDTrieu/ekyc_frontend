import ModalDetail from "./ModalDetail";
import { Button, Input } from "components/ui";
import moment from "moment/moment";
import { MdAlternateEmail } from "react-icons/md";
import { toast } from "react-toastify";
import React from "react";
import { v4 as uuidv4 } from "uuid";

import { signupScheme } from "validations/signup";
import {  useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { createStudentProfile } from "features/student/studentSlice";

function ModalStudentCreate({
  type = "confirm",
  header = "",
  message = "",
  isShowing = false,
  onHide = () => {},
  onResolve = () => {},
  titleResolve = "",
  onReject = () => {},
  titleReject = "",
}) {
  
  const changeFaceHandler = (event) => {
    const file = event.target.files[0];
    setSelectedFaceFile(file);
    setIsFaceFilePicked(true);
  };

  const handleSubmissionFaceImage = () => {
    const formFaceData = new FormData();
    formFaceData.append("filename", selectedFaceFile);

    formFaceData.append("thumbnail", selectedFaceFile);
    const studentId = "n18dccn241";
    const queryParam = new URLSearchParams({
      studentId: studentId,
    });
    fetch(
      `http://localhost:8080/portal/file/update/face-video/123?${queryParam}`,
      {
        method: "POST",
        body: formFaceData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Success: ", result);
        //setValue('personId', result.payload.personId)
        const unique_id = uuidv4();
        setValue("personId", unique_id.slice(0, 8));
        setValue("faceImageURL", result.payload.faceImageURL);
        toast.success("Upload face image thành công!");

      })
      .catch((error) => {
        console.log("Error: ", error);
        toast.error("Lỗi upload Face Image " + error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const {
    register,
    watch,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupScheme) });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { useState } = React;
  const [selectedFaceFile, setSelectedFaceFile] = useState();
    const [isFaceFilePicked, setIsFaceFilePicked] = useState(false);

  // Handle data that get from form
  const handleDataForm = async (data, result) => {
    console.log("data", data);
    const value = watch();
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
    console.log("AAA");
    // if (result.type === "auth/createStudentProfileService/fulfilled") {
    //   toast.success("Thêm nhân viên thành công, vui lòng  kiểm tra!");
    // } else {
    //   // Conflict
    //   switch (result.payload.code) {
    //     case 0:
    //       console.log("result.payload",result.payload)
    //       toast.success("Thêm nhân viên thành công!");
    //       window.location.reload();
    //       break;
    //     case 40:
    //       // setError("email", { message: "Email đã tồn tại" });
    //       toast.error("Code 40: "+result.payload.message, {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //       });
    //       break;
    //       case 53:
    //         toast.error("Service lỗi! "+result.payload.message, {
    //           position: "top-right",
    //           autoClose: 5000,
    //           hideProgressBar: false,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: true,
    //           progress: undefined,
    //           theme: "light",
    //         });
    //         break;
    //       case 191:
    //         setError("email", { message: "Email đã tồn tại" });
    //           toast.error("Email đã tồn tại! "+result.payload.message, {
    //             position: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //           });
    //           break;
    //           case 192:
    //             setError("phoneNumber", { message: "SĐT đã tồn tại" });
    //             toast.error("SĐT đã tồn tại! "+result.payload.message, {
    //               position: "top-right",
    //               autoClose: 5000,
    //               hideProgressBar: false,
    //               closeOnClick: true,
    //               pauseOnHover: true,
    //               draggable: true,
    //               progress: undefined,
    //               theme: "light",
    //             });
    //             break;
    //     default:
    //       toast.error("Lỗi gì đó đã xảy ra!"+result.payload.message, {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //       });
    //   }
    // }
  };
  return (
    <ModalDetail
      header={header}
      isShowing={isShowing}
      hide={onHide}
      closeBtn={false}
    >
      <p>{message}</p>
      <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridColumnGap: "20px",
          }}
        >
          <div>
            <form className="mt-3" onSubmit={handleSubmit(handleDataForm)}>
              <h1 className="text-xl font-semibold leading-7 text-gray-800 mt-5">
                Thêm nhân viên
              </h1>
              <div className="mt-6">
                <Input
                  label="Họ và tên đệm"
                  {...register("firstName")}
                  fancyOutlined
                  status={errors.firstName?.message ? "error" : ""}
                />
                <p
                  data-testid="fullName-error"
                  className="text-ac_red text-sm mt-1"
                >
                  {errors.firstname?.message}
                </p>
              </div>

              <div className="mt-6">
                <Input
                  label="Tên"
                  {...register("lastName")}
                  fancyOutlined
                  status={errors.lastName?.message ? "error" : ""}
                />
                <p
                  data-testid="fullName-error"
                  className="text-ac_red text-sm mt-1"
                >
                  {errors.lastName?.message}
                </p>
              </div>
              <div className="mt-6">
                <Input
                  label="Email"
                  rightIcon={<MdAlternateEmail />}
                  {...register("email")}
                  fancyOutlined
                  status={errors.email?.message ? "error" : ""}
                />
                <p
                  data-testid="email-error"
                  className="text-ac_red text-sm mt-1"
                >
                  {errors.email?.message}
                </p>
              </div>

              <div className="mt-6">
                <Input
                  label="Số điện thoại"
                  {...register("phoneNumber")}
                  fancyOutlined
                  status={errors.phoneNumber?.message ? "error" : ""}
                />
                <p
                  data-testid="phoneNumber-error"
                  className="text-ac_red text-sm mt-1"
                >
                  {errors.phoneNumber?.message}
                </p>
              </div>
              <div className="mt-6">
                <Input
                  label="Ngày sinh"
                  type="date"
                  //   defaultValue={value.dateOfBirth}
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
              <div className="mt-6">
                <Input
                  label="Mã nhân viên"
                  {...register("studentId")}
                  fancyOutlined
                  status={errors.studentId?.message ? "error" : ""}
                />
                <p
                  data-testid="studentId-error"
                  className="text-ac_red text-sm mt-1"
                >
                  {errors.studentId?.message}
                </p>
              </div>

              <div className="mt-6">
                <Input
                  label="Tên đơn vị"
                  {...register("unitId")}
                  fancyOutlined
                  status={errors.unitId?.message ? "error" : ""}
                />
                <p
                  data-testid="unitId-error"
                  className="text-ac_red text-sm mt-1"
                >
                  {errors.unitId?.message}
                </p>
              </div>

              <div className="mt-10">
                <Button testid="signup-button" width="100%">
                  Next step
                </Button>
              </div>
            </form>
          </div>
          
          <div>
            {/* <form className="mt-3" onSubmit={handleSubmit(handleDataForm)}> */}
            <h1 className="text-xl font-semibold leading-7 text-gray-800 mt-5">
              Thêm nhân viên
            </h1>

            <label
              htmlFor="dropzone-file-2"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Upload ảnh gương mặt </span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG or SVG (MAX. 800x400px)
                </p>
              </div>
            </label>

            <input
              id="dropzone-file-2"
              type="file"
              name="face-file"
              className="hidden"
              onChange={changeFaceHandler}
            />
            <div>
              <button
                type="submit"
                onClick={handleSubmissionFaceImage}
                className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal">Upload</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </ModalDetail>
  );
}

ModalStudentCreate.defaultProps = {};
export default ModalStudentCreate;
