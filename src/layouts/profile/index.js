// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
// Overview page components
import Header from "layouts/profile/components/Header";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { findAdmin } from "services/admin.service";
import { Divider } from "@mui/material";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { findConfig } from "services/admin.service";
import { editConfig } from "services/admin.service";

function Overview() {
  let navigate = useNavigate();
  const configCode = "VIP_LEVEL";
  const [profile, setProfile] = useState({});
  const [config, setConfig] = useState(10);
  const [promotion, setPromotion] = useState(0);
  const [configMsg, setConfigMsg] = useState("");

  const fetchProfile = async () => {
    const profile = JSON.parse(localStorage.getItem("auth"));
    if (profile && profile._id) {
      const response = await findAdmin(profile._id);
      if (response.data) {
        setProfile(response.data);
      } else {
        setProfile(profile);
      }
    } else {
      navigate("/authentication/sign-in");
    }
  };

  const fetchConfig = async () => {
    const response = await findConfig(configCode);
    if (response.data) {
      setConfig(response.data?.content);
      const promo = await findConfig('PROMOTION');
      setPromotion(promo.data.content)
    } else {
      setConfig(10);
    }
  };

  const updateConfig = async () => {
    const payload = {
      code: configCode,
      content: config,
      is_active: true,
    } 
    await editConfig({ code: "PROMOTION", content: promotion, is_active: true })
    const response = await editConfig(payload);
    if (response.data) {
      setConfigMsg("Config updated successfuly");
      setTimeout(() => {
        setConfigMsg("");
      }, 3000);
    } else {
      setConfigMsg("Config Error !");
      setTimeout(() => {
        setConfigMsg("");
      }, 3000);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchConfig();
  }, []);

  return (
    <DashboardLayout>
      <Header />
      <SoftBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={10} xl={6}>
            <ProfileInfoCard
              title="profile information"
              description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
              info={{
                firstname: profile.firstName?.charAt(0).toUpperCase() + profile.firstName?.slice(1),
                lastname: profile.lastName?.charAt(0).toUpperCase() + profile.lastName?.slice(1),
                email: profile.email,
                location: "Tunisia",
                role: profile.role?.charAt(0).toUpperCase() + profile.role?.slice(1),
              }}
              action={{ route: "/admin/admin-form", tooltip: "Edit Profile" }}
            />
          </Grid>
          <Grid item xs={12} md={10} xl={6}>
            <Card sx={{ height: "100%", padding: "15px" }}>
              <SoftBox>
                <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                  Configuration
                </SoftTypography>
                <Divider sx={{ margin: "10px 0" }} />
                <SoftBox component="form" role="form">
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Number of reservations to be VIP
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      type="number"
                      name="firstName"
                      value={config}
                      onChange={(e) => setConfig(e.target.value)}
                    />
                  </SoftBox>
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Promotion (%)
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      type="number"
                      name="firstName"
                      value={promotion}
                      onChange={(e) => setPromotion(e.target.value)}
                    />
                  </SoftBox>

                  <SoftBox display="flex" justifyContent="space-between">
                    <SoftBox>
                      {configMsg && (
                        <small style={{ color: "green", fontSize: "12px" }}>{configMsg}</small>
                      )}
                    </SoftBox>
                    <SoftButton
                      variant="gradient"
                      color="warning"
                      size="small"
                      onClick={updateConfig}
                    >
                      Update
                    </SoftButton>
                  </SoftBox>
                </SoftBox>
              </SoftBox>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Overview;
