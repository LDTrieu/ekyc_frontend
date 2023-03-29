import { MuiSteps } from "components/ui";
import AccountProfile from "../AccountCreate/components/AccountProfile";
import ConfirmProfile from "./components/AccountProfile";

import { useState } from "react";

function AccountCreate() {
  const [personProfile, setPersonProfile]=useState({
    studentId:"",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  })
  return (
    // <div className="w-full bg-white p-10">
       <AccountProfile />

  );
}

export default AccountCreate;
