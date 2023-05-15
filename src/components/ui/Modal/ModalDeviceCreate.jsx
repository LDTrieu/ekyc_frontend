import ModalDetail from './ModalDetail';
import { Button, Input, Select } from 'components/ui';
import moment from 'moment/moment';
import { MdOutlinePhoneIphone } from 'react-icons/md';
import { toast } from 'react-toastify';
import { signUp } from 'features/auth/authSlice';
import { deviceSignupScheme } from 'validations/deviceSignup';
import { signupScheme } from 'validations/signup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { createDeviceProfile } from 'features/device/deviceSlice';

function ModalDeviceCreate({
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
    formState: { errors },
  } = useForm({ resolver: yupResolver(deviceSignupScheme) });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  // Handle data that get from form
  const handleDataForm = async (data, result) => {
    console.log('data', data);
    const value = watch();
    result = await dispatch(
      createDeviceProfile({
        axiosPrivate,
        terminalId: value.terminalId,
        password: value.password,
        terminalName: value.terminalName,
      }),
    );
    if (result.type === 'auth/createDeviceService/fulfilled') {
      toast.success('Đăng ký tài khoản thành công, vui lòng đăng nhập!');
    } else {
      // Conflict
      switch (result.payload.code) {
        case 0:
          console.log('result.payload', result.payload);
          toast.success('Tạo tài khoản thành công!');
          window.location.reload();
          break;
        case 40:
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
          setError('terminalId', { message: 'TerminalId đã tồn tại' });
          toast.error('TerminalId đã tồn tại! ' + result.payload.message, {
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
                {' '}
                Thông tin tài khoản thiết bị
              </h1>
              <div className="mt-10">
                <Input
                  label="Mã tài khoản"
                  rightIcon={<MdOutlinePhoneIphone />}
                  {...register('terminalId')}
                  fancyOutlined
                  status={errors.terminalId?.message ? 'error' : ''}
                />
                <p className="text-ac_red text-sm mt-1">
                  {errors.terminalId?.message}
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
                <p className="text-ac_red text-sm mt-1">
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
                <p className="text-ac_red text-sm mt-1">
                  {errors.passwordConfirmation?.message}
                </p>
              </div>

              <div className="mt-6">
                <Input
                  label="Tên thiết bị"
                  {...register('terminalName')}
                  fancyOutlined
                  status={errors.terminalName?.message ? 'error' : ''}
                />
                <p className="text-ac_red text-sm mt-1">
                  {errors.terminalName?.message}
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

ModalDeviceCreate.defaultProps = {};
export default ModalDeviceCreate;
