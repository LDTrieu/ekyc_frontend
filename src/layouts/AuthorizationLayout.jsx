import classNames from "classnames";
import Home from "pages/Home";
import Signin from "pages/Signin";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';


const AuthorizationLayout = ({ children }) => {
  const { isLogin, role } = useSelector((store) => store.auth);
  return (
    <>
      <div
        className={classNames(
          role !== "ADMIN_ROLE" && "opacity-0 pointer-events-none absolute"
        )}
      >
        {children}
      </div>
      {isLogin ? (
        <>ĐÃ ĐĂNG NHẬP, KHÔNG CÓ QUYỀN</>
      ) : (
        <>CHƯA ĐĂNG NHẬP</>
        // <h5 className="w-full min-h-[500px] flex items-center justify-center text-h5 font-bold italic">
        //   Vui lòng&nbsp;
        //   <Link to="/403" className="text-primary underline">
        //     đăng nhập
        //   </Link>
        //   &nbsp;để tiếp tục
        // </h5>
        // < Redirect to="/new-page" />
      )}
    </>
  );
};

export default AuthorizationLayout;
