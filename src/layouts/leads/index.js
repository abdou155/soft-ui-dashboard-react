// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";


import { useEffect ,useState } from "react";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import Icon from "@mui/material/Icon";
import { LinearProgress } from "@material-ui/core";


import { listCustomres } from "services/customer.service";

function Leads() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);

  const prCols = [
    { name: "ID", align: "left" },
    { name: "phone", align: "left" },
    { name: "status", align: "left" },
    { name: "action", align: "center" },
  ]

  const prepareData = async (data) => {
    let arr = [];
    data.map( async (el) => {
      let obj = {
        ID : <>
             <SoftTypography variant="button" color="text" pl={3} fontWeight="small">
                {el._id.slice(-8)}
              </SoftTypography>
            </>,
        phone : <>
                  <SoftTypography  variant="button" color="text" fontWeight="medium">
                    {el.phone}
                  </SoftTypography>
                </>,
        status : <>
                  <SoftBadge variant="gradient" badgeContent="LEAD" color="warning" size="xs" container />
                </>,
        action : <>
          <Icon sx={{ cursor: "pointer", color : "red" }} fontSize="small">
            delete_outline
          </Icon>
        </>
      }
      arr.push(obj);
    })
    setRows(arr)
  }



  const fetchLeads = async () => {
    let response = await listCustomres("lead")
    if( response.data ){
      prepareData(response.data); 
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLeads();
  }, []);

  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Leads List</SoftTypography>
          </SoftBox>
          
          <SoftBox
            sx={{
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
            {loading ? (
              <LinearProgress />
            ) : ( <></> )}
            <Table columns={prCols} rows={rows} />
          </SoftBox>
        </Card>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Leads;
