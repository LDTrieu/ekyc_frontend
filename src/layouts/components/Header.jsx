import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.svg";
import { BiSearch } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import { AutoComplete, Button, Tag } from "../../components/ui";
import { useState } from "react";
import classNames from "classnames";
import { useSpring, animated } from "react-spring";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
//import { searchCourseService } from '../../features/course/services/course';
import { printPrice } from "../../utils/formatCurrency";

const NAVIGATION_LIST = [
  ["Realtime-IO", "/session"],
  ["Xuất báo cáo", "/report"],
];
const NAVIGATION_ADMIN_LIST = [
  ["Nhân viên", "/student"],
  ["Tài khoản", "/account"],
  ["Thiết bị", "/device"],
];
const initialStyles = {
  opacity: 0,
  pointerEvents: "none",
  top: "50px",
};

const SearchItem = ({ course }) => {
  return (
    <Link
      to={`/courses/${course.id}/detail`}
      className="flex gap-4 hover:bg-bg_light_gray -m-1 p-3 rounded-lg cursor-pointer"
    >
      <div className="flex">
        <img
          src={course.image}
          alt={course.name}
          className="rounded-lg w-20 aspect-[5/4] m-auto"
        />
      </div>
      <div className="text-md flex-1 flex flex-col justify-between">
        <p className="font-bold">{course.name}</p>
        <div className="flex items-center justify-between">
          <p className="text-ac_green">+{course.pointReward} điểm</p>
          {course.isJoin ? (
            <Tag color="green">đã tham gia</Tag>
          ) : course.charges ? (
            <p className="text-ac_red">{printPrice(course.price)}đ</p>
          ) : (
            <p className="text-primary">{course.pointToUnlock} điểm</p>
          )}
        </div>
      </div>
    </Link>
  );
};

const Header = () => {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const axiosPrivate = useAxiosPrivate(true);
  let showMenu = false;
  const [props, setSpring] = useSpring(() => initialStyles);
  const { user, role } = useSelector((store) => store.auth);
  console.log(
    "store: ",
    useSelector((store) => store)
  );
  console.log("user: ", user);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleToggleMenu = () => {
    setSpring.start(
      showMenu
        ? initialStyles
        : {
            opacity: 1,
            pointerEvents: "auto",
            top: "60px",
          }
    );
    showMenu = !showMenu;
  };
  const avatar =
    "https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg";
  return (
    <div className="h-[60px] bg-white shadow-sd_primary flex md:gap-4 xl:gap-14 items-center justify-between lg:justify-start px-6 z-20 sticky top-0">
      {/* Mobile menu toggle */}
      <button
        className="flex lg:hidden items-center justify-center w-11 h-11 hover:bg-bg_light_gray_3 transition rounded-lg -ml-2"
        onClick={handleToggleMenu}
      >
        <AiOutlineMenu className="w-6 h-6" />
      </button>

      {/* Logo */}
      <Link to="/">
        <img
          src={Logo}
          alt="Examify Logo - Learn and Practice English"
          className="h-10"
        />
      </Link>

      {/* Search Bar */}
      <div className="flex-1 hidden lg:block">
        <AutoComplete
          value={search}
          maxWidth="400px"
          onChange={handleChange}
          width="100%"
          placeholder="Tìm gì đó trên FaceSense..."
          leftIcon={<BiSearch className="w-5 h-5" />}
        >
          <ul>
            {options.length > 0 ? (
              options.map((opt, i) => <SearchItem key={i} course={opt} />)
            ) : (
              <span className="text-md">Không tìm thấy kết quả nào</span>
            )}
          </ul>
        </AutoComplete>
      </div>

      {/* Navigation Bar */}
      {user?.role === "ADMIN_ROLE" ? (
        <ul className="text-md items-center gap-6 hidden lg:flex">
          {NAVIGATION_ADMIN_LIST.map(([title, path], index) => (
            <li key={index} className="text-t_dark">
              <Link to={path}>{title}</Link>
            </li>
          ))}
          {NAVIGATION_LIST.map(([title, path], index) => (
            <li key={index} className="text-t_dark">
              <Link to={path}>{title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="text-md items-center gap-6 hidden lg:flex">
          {NAVIGATION_LIST.map(([title, path], index) => (
            <li key={index} className="text-t_dark">
              <Link to={path}>{title}</Link>
            </li>
          ))}
        </ul>
      )}
      {/* Buttons */}
      <div data-testid="user-avatar" className="gap-4 flex">
        {user.firstName ? (
          <Avatar
            avt={user.avt}
            lastName={user.lastName}
            firstName={user.role}
            email={user.email}
          />
        ) : (
          <>
            <Link to="/signin">
              <Button type="default" width="112px" className="md:block hidden">
                Đăng nhập
              </Button>
            </Link>
            <Link to="/signup">
              <Button type="primary" width="112px">
                Đăng ký
              </Button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile menu */}
      <animated.div
        style={props}
        className={classNames(
          "block lg:hidden bg-bg_dark_gray bg-opacity-30 fixed top-[60px] left-0 right-0 bottom-0 border-t overflow-hidden"
        )}
        onClick={handleToggleMenu}
      >
        <div
          className="bg-white pt-4 rounded-bl-lg rounded-br-lg px-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Bar */}
          <div>
            <AutoComplete
              value={search}
              onChange={handleChange}
              width="100%"
              placeholder="Tìm gì đó trên FaceSense..."
              leftIcon={<BiSearch className="w-5 h-5" />}
            >
              <ul>
                {options.length > 0 ? (
                  options.map((opt, i) => <SearchItem key={i} course={opt} />)
                ) : (
                  <span className="text-md">Không tìm thấy kết quả nào</span>
                )}
              </ul>
            </AutoComplete>
          </div>
          {user?.role === "ADMIN_ROLE" ? (
            <ul className="text-md py-4">
              {NAVIGATION_LIST.map(([title, path], index) => (
                <li key={index} className="text-t_dark">
                  <Link
                    className="block p-3 hover:bg-bg_light_gray_3 transition rounded-md cursor-pointer"
                    to={path}
                  >
                    {title}
                  </Link>
                </li>
              ))}
              {NAVIGATION_ADMIN_LIST.map(([title, path], index) => (
                <li key={index} className="text-t_dark">
                  <Link
                    className="block p-3 hover:bg-bg_light_gray_3 transition rounded-md cursor-pointer"
                    to={path}
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="text-md py-4">
              {NAVIGATION_LIST.map(([title, path], index) => (
                <li key={index} className="text-t_dark">
                  <Link
                    className="block p-3 hover:bg-bg_light_gray_3 transition rounded-md cursor-pointer"
                    to={path}
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </animated.div>
    </div>
  );
};

export default Header;
