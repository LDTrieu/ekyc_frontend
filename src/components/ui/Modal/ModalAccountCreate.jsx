import ModalDetail from './ModalDetail';
import { Button, Input, Select } from 'components/ui';
import moment from 'moment/moment';
import { MdAlternateEmail } from 'react-icons/md';
import { toast } from 'react-toastify';
import { signupScheme } from 'validations/signup';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { createAccountProfile } from 'features/account/accountSlice';

function ModalAccountCreate({
  type = 'confirm',
  header = '',
  message = '',
  isShowing = false,
  onHide = () => {},
  onResolve = () => {},
  titleResolve = '',
  onReject = () => {},
  titleReject = '',
}) {
  // Get some APIs to manage form
  const {
    register,
    watch,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupScheme) });
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const handleSelectRole = (event) => {
    const role = event.target.value === 'Admin' ? 'ADMIN_ROLE' : 'USER_ROLE';
    const unitId = event.target.value;
    setValue('role', role);
    setValue('unitId', unitId);
  };

  // Handle data that get from for
  const handleDataForm = async (data, result) => {
    console.log('data', data);
    const value = watch();

    result = await dispatch(
      createAccountProfile({
        axiosPrivate,
        email: value.email,
        password: value.password,
        fullName: value.fullName,
        dateOfBirth: moment(value.dateOfBirth).format('YYYY-MM-DDTHH:mm:ssZ'),
        unitId: value.unitId,
        role: value.role,
        phoneNumber: value.phoneNumber,
      }),
    );
    if (result.type === 'auth/createAccountProfileService/fulfilled') {
      toast.success('Đăng ký tài khoản thành công, vui lòng đăng nhập!');
    } else {
      // Conflict
      switch (result.payload.code) {
        case 0:
          console.log('result.payload', result.payload);
          toast.success('Tạo tài khoản thành công!');
          //window.location.reload();
          break;
        case 40:
          // setError("email", { message: "Email đã tồn tại" });
          toast.error('Code 40: ' + result.payload.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          break;
        case 53:
          toast.error('Service lỗi! ' + result.payload.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          break;
        case 191:
          setError('email', { message: 'Email đã tồn tại' });
          toast.error('Email đã tồn tại! ' + result.payload.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          break;
        case 192:
          setError('phoneNumber', { message: 'SĐT đã tồn tại' });
          toast.error('SĐT đã tồn tại! ' + result.payload.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          break;
        default:
          toast.error('Lỗi gì đó đã xảy ra!' + result.payload.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
      }
    }
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
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridColumnGap: '20px',
          }}
        >
          <div>
            <form className="mt-3" onSubmit={handleSubmit(handleDataForm)}>
              <h1 className="text-xl font-semibold leading-7 text-gray-800 mt-5">
                Thông tin tài khoản quản lý
              </h1>
              <div className="mt-10">
                <Input
                  label="Email"
                  rightIcon={<MdAlternateEmail />}
                  {...register('email')}
                  fancyOutlined
                  status={errors.email?.message ? 'error' : ''}
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
                  label="Mật khẩu"
                  type="password"
                  visibilityToggle
                  {...register('password')}
                  fancyOutlined
                  status={errors.password?.message ? 'error' : ''}
                />
                <p
                  data-testid="password-error"
                  className="text-ac_red text-sm mt-1"
                >
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
                <p
                  data-testid="retype-password-error"
                  className="text-ac_red text-sm mt-1"
                >
                  {errors.passwordConfirmation?.message}
                </p>
              </div>

              <div className="mt-6">
                <Input
                  label="Họ và tên"
                  {...register('fullName')}
                  fancyOutlined
                  status={errors.fullName?.message ? 'error' : ''}
                />
                <p
                  data-testid="fullName-error"
                  className="text-ac_red text-sm mt-1"
                >
                  {errors.fullName?.message}
                </p>
              </div>
              <div className="mt-6">
                <Input
                  label="Số điện thoại"
                  {...register('phoneNumber')}
                  fancyOutlined
                  status={errors.phoneNumber?.message ? 'error' : ''}
                />
                <p
                  data-testid="phoneNumber-error"
                  className="text-ac_red text-sm mt-1"
                >
                  {errors.phoneNumber?.message}
                </p>
              </div>
              <div className="mt-6">
                <Select
                  fancyOutlined
                  label="Select-UnitId"
                  {...register('unitId')}
                  onChange={handleSelectRole}
                >
                  <option>Admin</option>
                  <option>Nhân sự</option>
                  <option>Kế toán</option>
                </Select>
              </div>

              <div className="mt-6">
                <Input
                  label="Ngày sinh"
                  type="date"
                  //   defaultValue={value.dateOfBirth}
                  fancyOutlined
                  {...register('dateOfBirth')}
                />
                <p
                  data-testid="birthdate-error"
                  className="text-ac_red text-sm mt-1"
                >
                  {errors.dateOfBirth?.message}
                </p>
              </div>

              <div className="mt-10">
                <Button testid="signup-button" width="100%">
                  Đăng ký ngay
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* </div> */}
    </ModalDetail>
  );
}

ModalAccountCreate.defaultProps = {};
export default ModalAccountCreate;
