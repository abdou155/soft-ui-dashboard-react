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

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Images
import wavesWhite from "assets/images/shapes/waves-white.svg";
import rocketWhite from  "assets/images/app-logo.png";

function BuildByDevelopers() {
  return (
    <Card>
      <SoftBox p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <SoftBox display="flex" flexDirection="column" height="100%">
              <SoftBox pt={1} mb={0.5}>
                <SoftTypography variant="body2" color="text" fontWeight="medium">
                  Description
                </SoftTypography>
              </SoftBox>
              <SoftTypography variant="h5" fontWeight="bold" gutterBottom>
                Parkini
              </SoftTypography>
              <SoftBox mb={6}>
                <SoftTypography variant="body2" color="text">
                Parkini is a mobile application designed to help drivers find and pay for parking more easily and efficiently. Our solution is a digital and intelligent service that promises to offer a range of benefits such as making the parking experience more convenient and less stressful by directing drivers to open parking spots and allowing them to pay for parking through the app and to recharge their electric vehicle, help save time and reduce costs associated with parking, reduce traffic congestion and emissions by minimizing the amount of time drivers spend circling the block in search of parking, providing real-time data on parking availability, create  new financial sources for the municipality, reduce pollution, improve the working comfort of employees as well as visitors and add value to modern urbanization. <br />This admin dashboard serves as a decision support system. <br />It is an accompanying web tool for monitoring and managing clients, parkings, parking spaces, configurations, consult reservations and statistics. <br />The statistics below are showing, in numbers, the daily incomes, number of customers and VIPs, reserved spots and reservation and customer evolution in the main graphical charters.                </SoftTypography>
              </SoftBox>
              {/* <SoftTypography
                component="a"
                href="#"
                variant="button"
                color="text"
                fontWeight="medium"
                sx={{
                  mt: "auto",
                  mr: "auto",
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",

                  "& .material-icons-round": {
                    fontSize: "1.125rem",
                    transform: `translate(2px, -0.5px)`,
                    transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
                  },

                  "&:hover .material-icons-round, &:focus  .material-icons-round": {
                    transform: `translate(6px, -0.5px)`,
                  },
                }}
              >
                Read More
                <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
              </SoftTypography> */}
            </SoftBox>
          </Grid>
          <Grid container  xs={12} lg={5} justifyContent="flex-end" >
            <SoftBox component="img" src={rocketWhite} alt="rocket" lg={{ m: "auto" }}  width="80%" pt={3}/>
           {/*  <SoftBox
              height="100%"
              display="grid"
              justifyContent="center"
              alignItems="center"
              bgColor="info"
              borderRadius="lg"
              variant="gradient"
            >
              <SoftBox
                component="img"
                src={wavesWhite}
                alt="waves"
                display="block"
                position="absolute"
                left={0}
                width="100%"
                height="100%"
              />
              
            </SoftBox> */}
          </Grid>
        </Grid>
      </SoftBox>
    </Card>
  );
}

export default BuildByDevelopers;
