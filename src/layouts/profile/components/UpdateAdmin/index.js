import { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { findAdmin } from "services/admin.service";
import { editAdmin } from "services/admin.service";

function UpdateAdmin() {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const fetchProfile = async (id) => {
    let response = await findAdmin(id);
    if (response.data) {
      setProfile(response.data);
    }
  };

  const submitProfile = async () => {
    if ( profile.password == profile.confirmPassword ){
        setError('')
        const response = await editAdmin(profile)
        if (response.success){
            navigate('/profile')
        }
    }else{
        setError('Wrong password ! , please confirm your password')
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("auth"));
    if (user) {
      setProfile(user);
      const profile_id = user._id;
      if (profile_id) {
        fetchProfile(profile_id);
      }
    } else {
      navigate("/authentication/sign-in");
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <DashboardLayout>
      <Header />
      <SoftBox mt={5} mb={3}>
        <Grid container spacing={3} style={{ justifyContent: "center" }}>
          <Grid item xs={12} md={10} xl={10}>
            <SoftBox component="form" role="form">
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    First name
                  </SoftTypography>
                </SoftBox>
                <SoftInput
                  type="text"
                  name="firstName"
                  value={profile?.firstName} 
                  onChange={handleChange} 
                />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Last name
                  </SoftTypography>
                </SoftBox>
                <SoftInput
                  type="text"
                  name="lastName"
                  value={profile?.lastName} 
                    onChange={handleChange} 
                />
                {/*  {emailError && (
                  <small style={{ color: "red", fontSize: "12px" }}>{emailError}</small>
                )} */}
              </SoftBox>
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Email
                  </SoftTypography>
                </SoftBox>
                <SoftInput
                  type="email"
                  name="email"

                  value={profile?.email} 
                  onChange={handleChange} 
                />
                {/*  {emailError && (
                  <small style={{ color: "red", fontSize: "12px" }}>{emailError}</small>
                )} */}
              </SoftBox>
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Password
                  </SoftTypography>
                </SoftBox>
                <SoftInput
                  type="password"
                  name="password"

                    onChange={handleChange} 
                />
                {/* {passError && <small style={{ color: "red", fontSize: "12px" }}>{passError}</small>} */}
              </SoftBox>
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Confirm Password
                  </SoftTypography>
                </SoftBox>
                <SoftInput
                  type="password"
                  name="confirmPassword"

                    onChange={handleChange} 
                />
                {error && <small style={{ color: "red", fontSize: "12px" }}>{error}</small>}
              </SoftBox>
              <SoftBox mt={4} mb={1} style={{ display: "flex", justifyContent: "space-between" }}>
                <Link to="/profile">
                  <SoftButton
                    variant="gradient"
                    color="secondary"
                    /* onClick={submitLogin} */
                  >
                    Back
                  </SoftButton>
                  {/* {Error && <small style={{ color: "red", fontSize: "12px" }}>{Error}</small>} */}
                </Link>
            
                  <SoftButton
                    variant="gradient"
                    color="primary"
                    onClick={submitProfile} 
                  >
                    Update
                  </SoftButton>
                  {/* {Error && <small style={{ color: "red", fontSize: "12px" }}>{Error}</small>} */}
              </SoftBox>
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );
}

export default UpdateAdmin;
