import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "components/ui";
import useAxiosPrivate from "hooks/useAxiosPrivate";

import { toast } from "react-toastify";
import { studentEkycScheme } from "validations/studentEkyc";
import moment from "moment/moment";
import { v4 as uuidv4 } from 'uuid';
import {  updateStudentEkyc } from "../../../../features/student/studentSlice";

function ConfirmProfile(data) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  console.log("data: ",data.data.studentId)
  console.log("data: ",data.data.phoneNumber)
  
  console.log("data: ",data.data)
  // sau khi nhập MSSV, fetch Data
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(studentEkycScheme) });
  const { useState } = React;
  //
  const [selectedCCCDFile, setSelectedCCCDFile] = useState();
  const [selectedFaceFile, setSelectedFaceFile] = useState();
  const [isCCCDFilePicked, setIsCCCDFilePicked] = useState(false);
  const [isFaceFilePicked, setIsFaceFilePicked] = useState(false);

  // EKYC Details
  const value = watch();
  const [fullNameEkyc, setFullNameEkyc] = useState();
  const [nationalIdEkyc, setNationalIdEkyc] = useState("");
  const [dateOfBirthEkyc, setDateOfBirthEkyc] = useState();
  const [dateOfExpiryEkyc, setDateOfExpiryEkyc] = useState();
  const [genderEkyc, setGenderEkyc] = useState("");
  const [addressEkyc, setAddressEkyc] = useState("");
  const [placeOfOriginEkyc, setPlaceOfOriginEkyc] = useState("");
  const [nationalityEkyc, setNationalityEkyc] = useState("");
  const [personEkyc, setPersonEkyc] = useState({
    fullName: "",
    nationalId: "",
    dateOfBirth: 0,
    dateOfExpiry: 0,
    gender: "",
    address: "",
    placeOfOrigin: "",
    nationality: "",
  });
  // setValue('studentId', data.data.studentId)
  // setValue('phoneNumber', data.data.phoneNumber)
  const changeCCCDHandler = (event) => {
    setSelectedCCCDFile(event.target.file);
    setIsCCCDFilePicked(true);

    console.log("UPLOAD_CCCD");
    console.log("personEkyc: ",personEkyc)
  };
  const handleSubmissionCCCD = () => {
    const formCCCDData = new FormData();

    formCCCDData.append("filename", selectedCCCDFile);
    fetch("http://localhost:8080/portal/file/upload/national-id-card/cccd123", {
      method: "POST",
      body: formCCCDData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Payload: ", result.payload);
        console.log("value: : ", value);
        //setPersonEkyc(result.payload)
        setValue('fullName', result.payload.fullName)
        setValue('nationalId', result.payload.nationalId)
        setValue('dateOfBirth',  moment(result.payload.dateOfBirth).format('YYYY-MM-DD'));
        setValue('dateOfExpiry',  moment(result.payload.dateOfExpiry).format('YYYY-MM-DD'));
        setValue('gender', result.payload.gender)
        setValue('address', result.payload.address)
        setValue('placeOfOrigin', result.payload.placeOfOrigin)
        setValue('nationality', result.payload.nationality)
        setValue('nationalIdCardURL', result.payload.nationalIdCardURL)
        
        toast.success("Upload CCCD thành công!");
        // Navigate if success
        navigate("/student/create");
        
       // window.location.reload();
      })
      .catch((error) => {
        console.log("Error: ", error);
        toast.error("Lỗi upload CCCD " + error, {
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
  const changeFaceHandler = (event) => {
    setSelectedFaceFile(event.target.file);
    setIsFaceFilePicked(true);

    console.log("UPLOAD_Face");
  };

  const handleSubmissionFaceImage = () => {
    const formFaceData = new FormData();

    formFaceData.append("filename", selectedFaceFile);
    fetch("http://localhost:8080/portal/file/upload/face-reg/face456", {
      method: "POST",
      body: formFaceData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success: ", result);
        //setValue('personId', result.payload.personId)
        const unique_id = uuidv4();
        setValue('personId', unique_id.slice(0, 8))
        setValue('faceImageURL', result.payload.faceImageURL)
        toast.success("Upload face image thành công!");

        // Navigate if success
        navigate("/student/create");
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

  const handleDataForm = async (data, result) => {
    console.log("data", data);
    result =await dispatch(
      updateStudentEkyc({
        axiosPrivate,
        studentId: value.studentId,
        personId:value.personId,
        fullName:value.fullName,
        nationalId:value.nationalId,
        dateOfBirth:value.dateOfBirth,
        dateOfExpiry:value.dateOfExpiry,
        gender:value.gender,
        address:value.address,
        placeOfOrigin:value.placeOfOrigin,
        nationality:value.nationality,
        nationalIdCardURL:value.nationalIdCardURL,
        faceImageURL:value.faceImageURL,
      })
    );
    
    const ekyc= {
      studentId: value.studentId,
      personId:value.personId,
      fullName:value.fullName,
      nationalId:value.nationalId,
      dateOfBirth:value.dateOfBirth,
      dateOfExpiry:value.dateOfExpiry,
      gender:value.gender,
      address:value.address,
      placeOfOrigin:value.placeOfOrigin,
      nationality:value.nationality,
      nationalIdCardURL:value.nationalIdCardURL,
      faceImageURL:value.faceImageURL,
    }
    console.log("result: ", result);
    if (result.type === "student/updateStudentEkyc/fulfilled")
    console.log("result.payload.code", result.payload.code);
    switch (result.payload.code) {
      case 0:
        console.log("result.payload",result.payload)
        console.log("ekyc: ",ekyc)
        toast.success("Xác minh Ekyc thành công!");
        
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
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
      <div className="">
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

            <h2
              role="heading"
              aria-label="enter Personal data"
              className="text-xl font-semibold leading-7 text-gray-800 mt-10"
            >
              Xác minh nhân viên
            </h2>


            <div className="mt-8 md:flex items-center">
              <div className="flex flex-col">
                <label className="mb-3 text-sm leading-none text-gray-800">
                  Họ và tên
                </label>
         
                <Input
                  // label="Họ và tên"
                  defaultValue={value.fullName}
                  readOnly
                />

              </div>
              <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
                <label className="mb-3 text-sm leading-none text-gray-800">
                  Số CCCD
                </label>
                <Input
                  // label="Số CCCD"
                  defaultValue={value.nationalId}
                  readOnly
                />

              </div>
            </div>

            <div className="mt-12 md:flex items-center">
              <div className="flex flex-col">
                <label className="mb-3 text-sm leading-none text-gray-800">
                  Mã sinh viên
                </label>
                <Input
                  // label="Mã sinh viên"
                  //rightIcon={<MdAlternateEmail />}
                  defaultValue ={data.data.studentId}
                  readOnly

                />
                {/* <p data-testid="email-error" className="text-ac_red text-sm mt-1">
                {errors.email?.message}
              </p> */}
              </div>
              <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
                <label className="mb-3 text-sm leading-none text-gray-800">
                  Mã sinh trắc
                </label>
     
                <Input
                  // type="number"
                  //label="Số điện thoại"
                  //alternativeValue="123"
                  defaultValue ={value.personId}
                  readOnly


                />
              </div>
            </div>
            <div className="mt-8 md:flex items-center">
              <div className="flex flex-col">
                <label className="mb-3 text-sm leading-none text-gray-800">
                  Giới tính
                </label>
                <Input
                  // label="Giới tính"
                  defaultValue={value.gender}
                  readOnly

                />
                {/* <p
                data-testid="firstname-error"
                className="text-ac_red text-sm mt-1"
              >
                {errors.firstname?.message}
              </p> */}
              </div>
              <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
                <label className="mb-3 text-sm leading-none text-gray-800">
                  Quốc tịch
                </label>
                <Input
                  // label="Quốc tịch"
                  defaultValue={value.nationality}
                  readOnly

                />

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
                  defaultValue={value.dateOfBirth}
                  readOnly
                />

              </div>
              <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
                <label className="mb-3 text-sm leading-none text-gray-800">
                  Ngày CCCD hết hạn
                </label>
                <Input
                  label="Ngày CCCD hết hạn"
                  type="date"
                  readOnly

                />
              </div>
            </div>
            <div className="mt-12 md:flex items-center">
              <div className="flex flex-col">
                <label className="mb-3 text-sm leading-none text-gray-800">
                  Địa chỉ
                </label>
                <input
                  type="Địa chỉ"
                  // tabIndex={0}
                  defaultValue={value.address}
                  readOnly
                  aria-label="Enter address"
                  className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
                  //defaultValue="Thu Duc, Ho Chi Minh City, Vietnam"
                />
              </div>
              <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
                <label className="mb-3 text-sm leading-none text-gray-800">
                  Nguyên quán
                </label>
                <input
                  type="placeOfOrigin"
                  defaultValue={value.placeOfOrigin}
                  readOnly
                  aria-label="Enter address"
                  className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
                  
                />
              </div>
            </div>

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
      </div>

      <div className="grid grid-rows-2">
        <div className="upload-ekyc">
          <div className="flex items-center justify-center w-full">
            {/* <form onSubmit={handleSubmissionCCCD}> */}
            <label
              htmlFor="dropzone-file"
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
                  <span className="font-semibold">Upload ảnh CMND/CCCD </span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG or SVG (MAX. 800x400px)
                </p>
              </div>
            </label>

            <input
              id="dropzone-file"
              type="file"
              name="cccd-file"
              className="hidden"
              onChange={changeCCCDHandler}
            />
            {
              //   <div>
              //   <img
              //   src={previewUrl} alt="Ảnh đã chọn" />
              // </div>
            }
            <div>
              <button
                type="submit"
                onClick={handleSubmissionCCCD}
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
            {/* </form> */}
            {/* </label> */}
          </div>
        </div>
        <div className="upload-face-image">
          {/* <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%' }} /> */}

          <div className="flex items-center justify-center w-full">
            {/* <form onSubmit={handleSubmissionCCCD}> */}
            <label
              htmlFor="dropzone-file"
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
              id="dropzone-file"
              type="file"
              name="cccd-file"
              className="hidden"
              onChange={changeFaceHandler}
            />
            {
              //   <div>
              //   <img
              //   src={previewUrl} alt="Ảnh đã chọn" />
              // </div>
            }
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
            {/* </form> */}
            {/* </label> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmProfile;
