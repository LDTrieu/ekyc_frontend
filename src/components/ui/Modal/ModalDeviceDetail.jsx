import ModalDetail from './ModalDetail';
import { Button, Input } from 'components/ui';
import moment from 'moment/moment';

function ModalDeviceDetail({
  type = 'confirm',
  header = '',
  message = '',
  isShowing = false,
  onHide = () => {},
  onResolve = () => {},
  titleResolve = '',
  onReject = () => {},
  titleReject = '',
  device,
}) {
  const handleResolve = () => {
    onResolve();
    onHide();
  };
  const handleReject = () => {
    onReject();
    onHide();
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
            <div>
              {/* {type === 'confirm' && (
            <Button type="outline" height={36} onClick={handleReject}>
              {titleReject}
            </Button>
          )} */}
              {/* <Button height={36} onClick={handleResolve}>
            {titleResolve}
          </Button> */}
              <div className="mt-8 flex flex-col gap-8 md:flex-row md:gap-5">
                <div className="md:w-1/2">
                  <label
                    htmlFor="expiry"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Tên thiết bị
                  </label>
                  <Input
                    // label="Số điện thoại"
                    type="text"
                    defaultValue={device.terminalName}
                    fancyOutlined
                    readOnly
                  />
                </div>
                <div className="md:w-1/2">
                  <label
                    htmlFor="expiry"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Mã thiết bị
                  </label>
                  <Input
                    type="text"
                    defaultValue={device.terminalId}
                    fancyOutlined
                    readOnly
                  />
                </div>
              </div>

              {/* <div className="mt-8 flex flex-col gap-8 md:flex-row md:gap-5">
                <div className="md:w-1/2">
                  <label
                    htmlFor="expiry"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Nhân viên tạo
                  </label>
                  <Input
                    type="text"
                    defaultValue={device.createdBy}
                    fancyOutlined
                    readOnly
                  />
                </div>
                <div className="md:w-1/2">
                  <label
                    htmlFor="expiry"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Tình trạng
                  </label>
                  <Input
                    type="text"
                    defaultValue={device.createdBy}
                    fancyOutlined
                    readOnly
                  />
                </div>
              </div> */}

              <div className="mt-8 flex flex-col gap-8 md:flex-row md:gap-5">
                <div className="md:w-1/2">
                  <label
                    htmlFor="expiry"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Nhân viên tạo
                  </label>
                  <Input
                    type="text"
                    defaultValue={device.createdBy}
                    fancyOutlined
                    readOnly
                  />
                </div>
                <div className="md:w-1/2">
                  <label
                    htmlFor="expiry"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Thời gian tạo
                  </label>
                  <Input
                    type="date"
                    defaultValue={moment(device.createdAt).format('YYYY-MM-DD')}
                    fancyOutlined
                    readOnly
                  />
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-8 md:flex-row md:gap-5">
                <div className="md:w-1/2">
                  <label
                    htmlFor="expiry"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Nhân viên chỉnh sửa
                  </label>
                  <Input
                    type="text"
                    defaultValue={device.createdBy}
                    fancyOutlined
                    readOnly
                  />
                </div>
                <div className="md:w-1/2">
                  <label
                    htmlFor="expiry"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Thời gian chỉnh sửa
                  </label>
                  <Input
                    type="date"
                    defaultValue={moment(device.modifiedAt).format(
                      'YYYY-MM-DD',
                    )}
                    fancyOutlined
                    readOnly
                  />
                </div>
              </div>
              {/* <div className="relative mb-5 mt-2">
                <label
                  htmlFor="cvc"
                  className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                >
                  CVC
                </label>
                <div className="relative mb-5 mt-2">
                  <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-info-circle"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <circle cx={12} cy={12} r={9} />
                      <line x1={12} y1={8} x2="12.01" y2={8} />
                      <polyline points="11 12 12 12 12 16 13 16" />
                    </svg>
                  </div>
                  <input
                    id="cvc"
                    className="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                    placeholder="MM/YY"
                  />
                </div>
              </div> */}
              <div className="mt-8 flex flex-col gap-8 md:flex-row md:gap-5">
                <div className="md:w-1/2">
                  <label
                    htmlFor="expiry"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Tình trạng
                  </label>
                  <Input
                    // label="Số điện thoại"
                    type="text"
                    defaultValue={device.isBlocked ? 'Đã khóa' : 'Hoạt động'}
                    fancyOutlined
                    readOnly
                  />
                </div>
                <div className="md:w-1/2">
                  <label
                    htmlFor="expiry"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Lần đăng nhập cuối
                  </label>
                  <Input
                    type="date"
                    defaultValue={moment(device.lastLoginAt).format(
                      'YYYY-MM-DD',
                    )}
                    fancyOutlined
                    readOnly
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-8 md:flex-row md:gap-5">
                <div className="flex items-center justify-start w-full">
                  <button
                    className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                    onClick={handleResolve}
                  >
                    Submit
                  </button>
                  <button
                    className="focus:outline-none ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                    // onclick="modalHandler()"
                    onClick={handleReject}
                    //  {titleReject}
                    // Hủy
                  >
                    {/* <Button type="outline" height={36} onClick={handleReject}>
              {titleReject}
            </Button> */}
                    Cancel
                  </button>
                </div>
                <div
                  className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out"
                  //   onclick="modalHandler()"
                  onClick={handleReject}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Close"
                    className="icon icon-tabler icon-tabler-x"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1={18} y1={6} x2={6} y2={18} />
                    <line x1={6} y1={6} x2={18} y2={18} />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              {/* {type === 'confirm' && (
            <Button type="outline" height={36} onClick={handleReject}>
              {titleReject}
            </Button>
          )} */}
              {/* <Button height={36} onClick={handleResolve}>
            {titleResolve}
          </Button> */}

              {/* <div className="flex flex-col">  */}
              <div className="mt-8 flex flex-col gap-8 md:flex-row md:gap-5">
                <div className="md:w-1/2">
                  <label
                    htmlFor="expiry"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Họ và tên 2
                  </label>
                  <Input
                    // label="Số điện thoại"
                    type="text"
                    // defaultValue={device.phoneNumber}
                    fancyOutlined
                    readOnly
                  />
                </div>
                <div className="md:w-1/2">
                  <label
                    htmlFor="expiry"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Mã số sinh viên
                  </label>
                  <Input
                    // label="Số điện thoại"
                    type="text"
                    defaultValue={device.phoneNumber}
                    fancyOutlined
                    readOnly
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-8 md:flex-row md:gap-5">
                <div className="md:w-1/2">
                  <label
                    htmlFor="expiry"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Ngày sinh
                  </label>

                  <Input
                    type="date"
                    //defaultValue={moment(device.dateOfBirth).format(
                    //   "YYYY-MM-DD"
                    // )}
                    fancyOutlined
                    readOnly
                  />
                </div>
                <div className="md:w-1/2">
                  <label
                    htmlFor="expiry"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Số điện thoại
                  </label>
                  <Input
                    // label="Số điện thoại"
                    type="text"
                    defaultValue={device.phoneNumber}
                    fancyOutlined
                    readOnly
                  />
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-8 md:flex-row md:gap-5">
                <div className="md:w-1/2">
                  <label
                    htmlFor="expiry"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Ngày sinh
                  </label>

                  <Input
                    type="date"
                    //defaultValue={moment(device.dateOfBirth).format(
                    //   "YYYY-MM-DD"
                    // )}
                    fancyOutlined
                    readOnly
                  />
                </div>
                <div className="md:w-1/2">
                  <label
                    htmlFor="expiry"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Số điện thoại
                  </label>
                  <Input
                    // label="Số điện thoại"
                    type="text"
                    defaultValue={device.phoneNumber}
                    fancyOutlined
                    readOnly
                  />
                </div>
              </div>
              <div className="relative mb-5 mt-2">
                <label
                  htmlFor="cvc"
                  className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                >
                  CVC
                </label>
                <div className="relative mb-5 mt-2">
                  <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-info-circle"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <circle cx={12} cy={12} r={9} />
                      <line x1={12} y1={8} x2="12.01" y2={8} />
                      <polyline points="11 12 12 12 12 16 13 16" />
                    </svg>
                  </div>
                  <input
                    id="cvc"
                    className="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                    placeholder="MM/YY"
                  />
                </div>
              </div>
              <div className="relative mb-5 mt-2">
                <label
                  htmlFor="cvc"
                  className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                >
                  CVC
                </label>
                <div className="relative mb-5 mt-2">
                  <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-info-circle"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <circle cx={12} cy={12} r={9} />
                      <line x1={12} y1={8} x2="12.01" y2={8} />
                      <polyline points="11 12 12 12 12 16 13 16" />
                    </svg>
                  </div>
                  <input
                    id="cvc"
                    className="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                    placeholder="MM/YY"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalDetail>
  );
}

ModalDeviceDetail.defaultProps = {
  device: null,
};
export default ModalDeviceDetail;
