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

       <AccountProfile />

  );
}

export default AccountCreate;
