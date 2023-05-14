import React, { useState } from "react";
import useFetchAllAccount from "./hooks/useFetchAllAccount";
import useAxiosWithToken from "hooks/useAxiosWithToken";
import {

  updateAccountService,
  getListAccountService,
  getDetailAccountService,
} from "../services/account";
import { toast } from "react-toastify";

import {
  ModalConfirm, 
  ModalAccountDetail, 
  ModalAccountCreate
} from "components/ui/Modal";

const AccountList = (props) => {
  const { account_list  } = useFetchAllAccount();

  const axiosPrivate = useAxiosWithToken();
  const [selectedAccount, setSelectedAccount] = useState(null);

  const [modalDeleteCloseVisible, setModalDeleteCloseVisible] = useState(false);
  const showDeleteModal = () => setModalDeleteCloseVisible(true);
  const hideDeleteModal = () => setModalDeleteCloseVisible(false);

  const [modalCreateCloseVisible, setModalCreateCloseVisible] = useState(false);
  const showCreateModal = () => setModalCreateCloseVisible(true);
  const hideCreateModal = () => setModalCreateCloseVisible(false);

  const [modalDetailCloseVisible, setModalDetailCloseVisible] = useState(false);
  const showDetailModal = () => setModalDetailCloseVisible(true);
  const hideDetailModal = () => setModalDetailCloseVisible(false);

  const [modalCloseVisible, setModalCloseVisible] = useState(false);
  const showModal = () => setModalCloseVisible(true);
  const hideModal = () => setModalCloseVisible(false);

  const onSelectAccount = (Account) => {
    console.log("item: ", Account);
    setSelectedAccount(Account);
  };

  const showDetailAccount=(AccountId)=>{

    try {
      // const response =
      getDetailAccountService(
        axiosPrivate,
        AccountId
      ).then((response) => {
        // console.log("response", response);
        switch (response.data.code) {
          case 0:
          const Account =response.data.payload
            //const Account = response.data.payload
            console.log("Account: ",Account)
            setSelectedAccount(Account)
            showDetailModal();
            console.log("selectedAccount",Account)
            break;
          case 53:
            toast.error("Service lỗi! " + response.data.message, {
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

            if (response.data.message.length !== 0) {
              toast.error(response.message, {
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
      });
      // console.log("response: ", response.then())
    } catch (error) {
      console.log("🚀 ~ file: index.jsx:27 ~ pathBlockAccount ~ error", error);
    }
    
  }
  const BlockAccount = () => {
    console.log("selectedAccount: ", selectedAccount);
    selectedAccount.isBlocked = !selectedAccount.isBlocked;
    try {
      // const response =
      updateAccountService(
        axiosPrivate,
        selectedAccount.accountId,
        selectedAccount.isBlocked
      ).then((response) => {
        console.log("response", response);
        switch (response.data.code) {
          case 0:
            // window.location.reload();
            toast.success("Cập nhật thành công!");
            break;
          case 53:
            toast.error("Service lỗi! " + response.data.message, {
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
            console.log("DEFAULT");
            if (response.data.message.length !== 0) {
              toast.error(response.message, {
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
      });
      // console.log("response: ", response.then())
    } catch (error) {
      console.log("🚀 ~ file: index.jsx:27 ~ pathBlockAccount ~ error", error);
    }
  };

  const DownloadList = () => {
    try {
      getListAccountService(axiosPrivate).then((response) => {
        console.log("response", response);
        console.log("response.data.payload.url", response.data.payload.url);
        switch (response.data.code) {
          case 0:
            window.open(response.data.payload.url)
            break;
          case 53:
            toast.error("Service lỗi! " + response.data.message, {
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
            if (response.data.message.length !== 0) {
              toast.error(response.message, {
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
      });
    } catch (error) {
      console.log("🚀 ~ file: index.jsx:27 ~ pathBlockAccount ~ error", error);
    }
  };
  return (
    <>
      <div className="py-5">
        <div className="mx-auto container bg-white dark:bg-gray-800 shadow rounded">
          <div className="flex flex-col lg:flex-row p-4 lg:p-8 justify-between items-start lg:items-stretch w-full">
            <div className="w-full lg:w-1/3 flex flex-col lg:flex-row items-start lg:items-center">
              <div className="flex items-center">
                <a
                  className="text-gray-600 dark:text-gray-400 p-2 border-transparent border bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
                  href="javascript: void(0)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon cursor-pointer icon-tabler icon-tabler-edit"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    // strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                    <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                    <line x1={16} y1={5} x2={19} y2={8} />
                  </svg>
                </a>
                <a
                  className="text-gray-600 dark:text-gray-400 mx-2 p-2 border-transparent border bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
                  href="javascript: void(0)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon cursor-pointer icon-tabler icon-tabler-settings"
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
                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <circle cx={12} cy={12} r={3} />
                  </svg>
                </a>
                <a
                  className="text-gray-600 dark:text-gray-400 mr-2 p-2 border-transparent border bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
                  href="javascript: void(0)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-bookmark"
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
                    <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2" />
                  </svg>
                </a>
                <a
                  className="text-gray-600 dark:text-gray-400 mr-2 p-2 border-transparent border bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
                  href="javascript: void(0)"
                  // detail test
                  onClick={(item) => {
                    setSelectedAccount(item)
                    showDetailModal();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-copy"
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
                    <rect x={8} y={8} width={12} height={12} rx={2} />
                    <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                  </svg>
                </a>
                <a
                  className="text-red-500 p-2 border-transparent border bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
                  href="javascript: void(0)"
                  // Delete
                  onClick={() => {
                    showDeleteModal();
                  }}
                  // onClick={BlockAccount}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-lock"
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
                    <line x1={4} y1={7} x2={20} y2={7} />
                    <line x1={10} y1={11} x2={10} y2={17} />
                    <line x1={14} y1={11} x2={14} y2={17} />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
              <div className="flex items-center lg:border-l lg:border-r border-gray-300 dark:border-gray-200 py-3 lg:py-0 lg:px-6">
                <p
                  className="text-base text-gray-600 dark:text-gray-400"
                  id="page-view"
                >
                  {/* Viewing 1 - 20 of 60 */}
                </p>
                <a
                  className="text-gray-600 dark:text-gray-400 ml-2 border-transparent border cursor-pointer rounded"
                  onclick="pageView(false)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-left"
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
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                </a>
                <a
                  className="text-gray-600 dark:text-gray-400 border-transparent border rounded focus:outline-none cursor-pointer"
                  onclick="pageView(true)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-right"
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
                    <polyline points="9 6 15 12 9 18" />
                  </svg>
                </a>
              </div>
              <div className="flex items-center lg:border-r border-gray-300 dark:border-gray-200 pb-3 lg:pb-0 lg:px-6">
                <div className="relative w-32 z-10">
                  <div className="pointer-events-none text-gray-600 dark:text-gray-400 absolute inset-0 m-auto mr-2 xl:mr-4 z-0 w-5 h-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon cursor-pointer icon-tabler icon-tabler-chevron-down"
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
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                  <select
                    aria-label="Selected tab"
                    className="focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray text-base form-select block w-full py-2 px-2 xl:px-3 rounded text-gray-600 dark:text-gray-400 appearance-none bg-transparent"
                  >
                    <option>List View</option>
                    <option>Grid View</option>
                  </select>
                </div>
              </div>
              <div className="lg:ml-6 flex items-center">
                <button
                  className="bg-gray-200 transition duration-150 ease-in-out focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray hover:bg-gray-300 rounded text-indigo-700 px-5 h-8 flex items-center text-sm"
                  onClick={() => {
                    showModal();
                  }}
                >
                  Download List
                </button>

                <a>
                  <button
                    className="text-white ml-4 cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 w-8 h-8 rounded flex items-center justify-center"
                    // onClick={modalCloseVisible ? hideModal : showModal}
                    onClick={() => {
                      showCreateModal();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-plus"
                      width={28}
                      height={28}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <line x1={12} y1={5} x2={12} y2={19} />
                      <line x1={5} y1={12} x2={19} y2={12} />
                    </svg>
        
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className="w-full overflow-x-scroll xl:overflow-x-hidden">
            <table className="min-w-full bg-white dark:bg-gray-800">
              <thead>
                <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8">

                  <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4"></th>

                  <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4"></th>

                  <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Họ và tên
                  </th>

                  <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Email
                  </th>
                  <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Mã tài khoản 
                  </th>
                  <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                  Mã đơn vị
                  </th>

                  <td className="text-gray-600 dark:text-gray-400 font-normal pr-8 text-left text-sm tracking-normal leading-4">
                    Tạo bởi
                  </td>

                  <td className="text-gray-600 dark:text-gray-400 font-normal pr-8 text-left text-sm tracking-normal leading-4">
                    Trạng thái
                  </td>
                  <td className="text-gray-600 dark:text-gray-400 font-normal pr-8 text-left text-sm tracking-normal leading-4">
                    Chi Tiết
                  </td>
                </tr>
              </thead>

              <tbody>
                
                {account_list.map((item) => (
                  <tr className="h-24 border-gray-300 dark:border-gray-200 border-b">
                    <td className="pl-8 pr-6 text-left whitespace-no-wrap text-sm text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                      <input
                        type="radio"
                        className="cursor-pointer relative w-5 h-5 border rounded border-gray-400 dark:border-gray-200 bg-white dark:bg-gray-800 outline-none"
                        checked={selectedAccount === item}
                        onChange={() => onSelectAccount(item)}
                      />
                    </td>

                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                      {item.something}
                    </td>
                    <td className="pr-6 whitespace-no-wrap">
                      <div className="flex items-center">

                        <p className="ml-2 text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-sm">
                          {item.fullName}
                        </p>
                      </div>
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                      {item.email}
                    </td>

                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                      {item.accountId}
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                        {item.unitId}
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                    {item.createdBy}  
                    </td>
                    <td className="pr-6">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          item.isBlocked ? "bg-red-500" : "bg-green-500"
                        }`}
                      />
                    </td>
                    <td className="pr-8 relative">
                      <div className="dropdown-content mt-8 absolute left-0 -ml-12 shadow-md z-10 hidden w-32">
                        <ul className="bg-white dark:bg-gray-800 shadow rounded py-1">
                          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Edit
                          </li>
                          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Delete
                          </li>
                          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Duplicate
                          </li>
                        </ul>
                      </div>
                      <button className="text-gray-500 rounded cursor-pointer border border-transparent focus:outline-none"
                     //onClick={detailAccount}
                      onClick={() => {
                        showDetailAccount(item.accountId);
                      }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-id"
                          width="44"
                          height="44"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#2c3e50"
                          fill="none"
                          //stroke-linecap="round"
                          strokeLinecap="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <rect x="3" y="4" width="18" height="16" rx="3" />
                          <circle cx="9" cy="10" r="2" />
                          <line x1="15" y1="8" x2="17" y2="8" />
                          <line x1="15" y1="12" x2="17" y2="12" />
                          <line x1="7" y1="16" x2="17" y2="16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ModalConfirm
        header="Xác nhận"
        message="Bạn có chắc chắn muốn khóa tài khoản này?"
        isShowing={modalDeleteCloseVisible}
        onHide={hideDeleteModal}
        onResolve={BlockAccount}
        titleResolve="Xác nhận"
        titleReject="Hủy"
      />
      <ModalConfirm
        header="Xác nhận1"
        message="Bạn muốn tải danh sách này?"
        isShowing={modalCloseVisible}
        onHide={hideModal}
        onResolve={DownloadList}
        titleResolve="Xác nhận2"
        titleReject="Hủy"
      />
      <ModalAccountDetail
        header="Detail"
         isShowing={modalDetailCloseVisible}
        //isShowing={false}
        onHide={hideDetailModal}
        onResolve={DownloadList}
        titleResolve="OK"
        titleReject="Hủy"
        account={selectedAccount}
      />
      <ModalAccountCreate
        header="Detail"
        // message="Tạo tài khoản quản lý"
         isShowing={modalCreateCloseVisible}
        //isShowing={false}
        onHide={hideCreateModal}
        // onResolve={CreateAccount}
        titleResolve="OK"
        titleReject="Hủy"
        // account={selectedAccount}
      />
    </>
  );
};

export default AccountList;
