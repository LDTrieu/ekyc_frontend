import React from "react";
import logo from 'assets/circle_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { MdAlternateEmail } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input,Button } from "components/ui";
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { toast } from "react-toastify";
import moment from "moment";

import { accountProfileScheme } from "validations/accountProfile";
import { addAccount, createAccountProfile } from "features/account/accountSlice";

function AccountProfile({data,onDataChange }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(accountProfileScheme) });
  const value = watch();
  const handleDataForm = async (data, result) => {
    console.log("data", data);
    result = await dispatch(
      createAccountProfile({
        axiosPrivate,
        accountId: value.accountId,
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
    const account= {
      accountId:value.accountId,
      email: value.email,
      firstName: value.firstName,
      lastName: value.lastName,
      phoneNumber: value.phoneNumber,
    }
    console.log("result: ", result);
    if (result.type === "account/createAccountProfile/fulfilled") {
      console.log("result.payload.code", result.payload.code);
      switch (result.payload.code) {
        case 0:
          console.log("result.payload",result.payload)
          console.log("account: ",account)
          toast.success("Tạo tài khoản thành công!");
        
          onDataChange(account);
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
      navigate("/account/create");
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
    <div className="h-screen mx-6 sm:mx-[100px] lg:mx-[20px] xl:mx-[100px] grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-5">
      {/* Modal */}
      <div className="col-span-4 md:px-5 md:col-start-2 lg:col-start-5 bg-white md:border md:border-br_gray my-auto py-4 rounded-lg">
        {/* Greeting */}
        <div className="flex flex-col items-center">
          {/* <div className="w-20">
            <Link to="/">
              <img src={logo} alt="circle logo" />
            </Link>
          </div> */}
          <div className="text-center">
            <h1 className="text-h4 font-bold text-primary mt-2">Tạo tài khoản mới</h1>
            {/* <p className="text-sm text-t_gray">Chào mừng đến với FaceSense</p> */}
          </div>
        </div>

        {/* Form */}
        <form className="mt-3" onSubmit={handleSubmit(handleDataForm)}>
          <div className="mt-10">
            <Input
              label="Email"
              rightIcon={<MdAlternateEmail />}
              {...register('email')}
              fancyOutlined
              status={errors.email?.message ? 'error' : ''}
            />
            <p data-testid="email-error" className="text-ac_red text-sm mt-1">
              {errors.email?.message}
            </p>
          </div>

          <div className="mt-6">
            <Input
              label="Họ và tên đệm"
              {...register('firstname')}
              fancyOutlined
              status={errors.firstname?.message ? 'error' : ''}
            />
            <p data-testid="firstname-error" className="text-ac_red text-sm mt-1">
              {errors.firstname?.message}
            </p>
          </div>

          <div className="mt-6">
            <Input
              label="Tên"
              {...register('lastname')}
              fancyOutlined
              status={errors.lastname?.message ? 'error' : ''}
            />
            <p data-testid="lastname-error" className="text-ac_red text-sm mt-1">
              {errors.lastname?.message}
            </p>
          </div>
          
          <div className="mt-6">
            <Input
              label="Tên"
              {...register('lastname')}
              fancyOutlined
              status={errors.lastname?.message ? 'error' : ''}
            />
            <p data-testid="lastname-error" className="text-ac_red text-sm mt-1">
              {errors.lastname?.message}
            </p>
          </div>
          
          <div className="mt-6">
            <Input
              label="Tên"
              {...register('lastname')}
              fancyOutlined
              status={errors.lastname?.message ? 'error' : ''}
            />
            <p data-testid="lastname-error" className="text-ac_red text-sm mt-1">
              {errors.lastname?.message}
            </p>
          </div>

          <div className="mt-6">
            <Input
              label="Mật khẩu"
              type="password"
              visibilityToggle
              {...register('password')}
              fancyOutlined
              status={errors.password?.message ? 'error' : ''}
            />
            <p data-testid="password-error" className="text-ac_red text-sm mt-1">
              {errors.password?.message}
            </p>
          </div>

          <div className="mt-6">
            <Input
              label="Xác nhận mật khẩu"
              type="password"
              visibilityToggle
              {...register('passwordConfirmation')}
              fancyOutlined
              status={errors.passwordConfirmation?.message ? 'error' : ''}
            />
            <p data-testid="retype-password-error" className="text-ac_red text-sm mt-1">
              {errors.passwordConfirmation?.message}
            </p>
          </div>

          <div className="mt-10">
            <Button testid="signup-button" width="100%">
              Tạo tài khoản
            </Button>
          </div>
        </form>

        {/* Direct sign in page */}
        {/* <p className="text-sm text-center text-t_gray mt-3">
          Đã có tài khoản?{' '}
          <span className="text-ac_purple font-bold">
            <Link to="/signin">Đăng nhập ngay</Link>
          </span>
        </p> */}
      </div>
    </div>
  );
}

export default AccountProfile;
