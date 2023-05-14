import React from "react";
import classNames from "classnames";
import ReactDom from "react-dom";
import { IoCloseOutline } from 'react-icons/io5';


const ModalDetail = ({
  children,
  excludeHeader,
  closeBtn = true,
  isShowing,
  hide,
  header,
  maxWidth,
  className,
  zIndex,
  type,
  borderRadius,
}) => {
  return ReactDom.createPortal(
    <div>
      <div
        className={classNames(
          "bg-black bg-opacity-20 z-20 fixed top-0 left-0 bottom-0 right-0 flex transition-all",
          !isShowing && "pointer-events-none opacity-0",
          // Modal Type
          type === "normal" && "p-7",
          type === "right" && "duration-500",
          zIndex
        )}
        onClick={hide}
        data-testid="test-wrapper"
      >
        <div
          className={classNames( // mt-20
            "container mx-auto  mt-5 w-11/12 md:w-2/3 max-w-screen-xl",
            maxWidth,
            borderRadius,
            // Modal Type
            type === "normal" && "m-auto",
            type === "right" && {
              "ml-auto my-auto h-full relative": true,
              "left-full opacity-0": !isShowing,
              "left-0 opacity-100": isShowing,
            },
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
         {/* {!excludeHeader && (
          <header className="font-bold text-black text-h3 flex justify-between gap-4">
            {header}
            {closeBtn && (
              <button onClick={hide} className="p-[6px] bg-bg_light_gray_2 rounded-full h-fit">
                <IoCloseOutline />{' '}
              </button>
            )}
          </header>
        )} */}
        <div className="">{children}</div>

        </div>

      </div>
    </div>,
    document.getElementById("modal-portal")
  );
};

ModalDetail.defaultProps = {
  maxWidth: "max-w-[400px]",
  type: "normal",
  borderRadius: "rounded-lg",
};
export default ModalDetail;
