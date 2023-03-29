import { MuiSteps } from "components/ui";
import StudentProfile from "../StudentCreate/components/StudentProfile";
import StudentEkyc from "../StudentCreate/components/StudentEkyc";
import ConfirmProfile from "../StudentCreate/components/ConfirmProfile";

import { useState } from "react";

function StudentCreate() {
  const [personProfile, setPersonProfile]=useState({
    studentId:"",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  })
  return (
    <div className="w-full bg-white p-10">
      <MuiSteps
        componentList={[
          {
            label: (
              <>
                <div className="flex items-center md:mt-0 mt-4">
                  <div className="w-8 h-8 bg-indigo-700 rounded flex items-center justify-center">
                    <p className="text-base font-medium leading-none text-white">
                      01
                    </p>
                  </div>
                  <p className="text-base ml-3 font-medium leading-4 text-gray-800">
                    Sign Up
                  </p>
                </div>
              </>
            ),
            data: <StudentProfile data={personProfile} onDataChange={setPersonProfile}/>,
          },
          {
            label: (
              <div className="flex items-center md:mt-0 mt-4 md:ml-12">
                <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-base font-medium leading-none text-gray-800">
                    02
                  </p>
                </div>
                <p className="text-base ml-3 font-medium leading-4 text-gray-800">
                  Security Check
                </p>
              </div>
            ),
            data: <StudentEkyc data={personProfile} />,
          },
          // {
          //   label: (
          //     <div className="flex items-center md:mt-0 mt-4 md:ml-12">
          //       <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
          //         <p className="text-base font-medium leading-none text-gray-800">
          //           03
          //         </p>
          //       </div>
          //       <p className="text-base ml-3 font-medium leading-4 text-gray-800">
          //         Confirm Info
          //       </p>
          //     </div>
          //   ),
          //   data: <ConfirmProfile data={personProfile}/>,
          // },
        ]}
      />
    </div>
  );
}

export default StudentCreate;
