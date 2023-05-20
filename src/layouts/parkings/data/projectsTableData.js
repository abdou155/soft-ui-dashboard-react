/* eslint-disable react/prop-types */
// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftProgress from "components/SoftProgress";
import SoftBadge from "components/SoftBadge";

// Images
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoWebDev from "assets/images/small-logos/logo-webdev.svg";
import logoXD from "assets/images/small-logos/logo-xd.svg";

function Completion({ value, color }) {
  return (
    <SoftBox display="flex" alignItems="center">
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {value}%&nbsp;
      </SoftTypography>
      <SoftBox width="8rem">
        <SoftProgress value={value} color={color} variant="gradient" label={false} />
      </SoftBox>
    </SoftBox>
  );
}

const action = (
  <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
    more_vert
  </Icon>
);

const projectsTableData = {
  columns: [
    { name: "ID", align: "left" },
    { name: "phone", align: "left" },
    { name: "status", align: "left" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      ID: (
        <SoftTypography variant="button" color="text" pl={3} fontWeight="small">
          ID12544
        </SoftTypography>
      ),
      phone: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          (+216) 95 722 400
        </SoftTypography>
      ),
      status: (
        <SoftBadge variant="gradient" badgeContent="LEAD" color="warning" size="xs" container />
      ),
      action,
    },{
      ID: (
        <SoftTypography variant="button" color="text" pl={3} fontWeight="small">
          ID12544
        </SoftTypography>
      ),
      phone: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          (+216) 50 629 312
        </SoftTypography>
      ),
      status: (
        <SoftBadge variant="gradient" badgeContent="LEAD" color="warning" size="xs" container />
      ),
      action,
    },
  ],
};

export default projectsTableData;
