/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

import validator from 'validator';
import { loginAdmin } from '../../../services/admin.service';
import { useNavigate  } from "react-router-dom";



function SignIn() {
  let navigate = useNavigate ();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [Error, setError] = useState('');

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  };


  const validateEmail = () => {
    if (!validator.isEmail(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const validatePass = () => {
    if ( password == "") {
      setPassError('Please fill the password field');
    } else {
      setEmailError('');
    }
  };

  const submitLogin =  async (event) => {
    event.preventDefault();
    validateEmail();
    validatePass();

    try {
      let response = await loginAdmin({email , password})
      if (  response.data  ){
        localStorage.setItem('auth', JSON.stringify(response.data));
        setError("")
        navigate("/dashboard");
      }
    }catch(error){
      setError("Please verify your credientials")
    }
  };



  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput type="email" value={email} onChange={handleChangeEmail}  />
          {emailError && <small style={{color : "red" , fontSize : "12px"}}>{emailError}</small>}
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" value={password} onChange={handleChangePassword} />
          {passError && <small style={{color : "red" , fontSize : "12px"}}>{passError}</small>}
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <Link to="/">
            <SoftButton variant="gradient" color="info" fullWidth onClick={submitLogin}>
              sign in
            </SoftButton>
            {Error && <small style={{color : "red" , fontSize : "12px"}}>{Error}</small>}
          </Link>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
