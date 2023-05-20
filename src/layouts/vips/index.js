// @mui material components
import Card from "@mui/material/Card";
import Modal from '@mui/material/Modal';


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
import SoftButton from "components/SoftButton";

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};


function Vips() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);


  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const handleOpen = (data) => {
    setModalData(data);
    setOpen(true);
  }
    const handleClose = () => {
      setModalData({});
      setOpen(false);
    }

  const prCols = [
    { name: "ID", align: "left" },
    { name: "name", align: "left" },
    { name: "email", align: "left" },
    { name: "phone", align: "left" },
    { name: "matricule", align: "left" },
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
        name : <>
            <SoftTypography  variant="button" color="text" fontWeight="medium">
              {el.first_name+' '+el.last_name }
            </SoftTypography>
          </>,
        email : <>
              <SoftTypography  variant="button" color="text" fontWeight="medium">
                {el.email}
              </SoftTypography>
            </>,
        phone : <>
                  <SoftTypography  variant="button" color="text" fontWeight="medium">
                    {el.phone}
                  </SoftTypography>
                </>,
        matricule : <>
                <SoftTypography  variant="button" color="text" fontWeight="medium">
                  {el.car_mat}
                </SoftTypography>
              </>,
        status : <>
                  <SoftBadge variant="gradient" badgeContent="VIPs" color="primary" size="xs" container />
                </>,
        action : <>
        <SoftBox onClick={() => handleOpen(el)}>
          <Icon  sx={{ cursor: "pointer", color : "gray" }} fontSize="small">
            visibility
          </Icon>
          </SoftBox>
        </>
      }
      arr.push(obj);
    })
    setRows(arr)
  }



  const fetchLeads = async () => {
    let response = await listCustomres("vips")
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
            <SoftTypography variant="h6">VIPs List</SoftTypography>
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <SoftBox sx={style}>
          <SoftTypography id="modal-modal-title" variant="h6" component="h2">
            Customer details
          </SoftTypography>
          <SoftBox style={{fontSize : "14px"}} sx={{ mt: 2 }} >
            <p>
              <strong>Name :</strong> {modalData.first_name + " " + modalData.last_name}
            </p>
            <p>
              <strong>Email :</strong> {modalData.email}
            </p>
            <p>
              <strong>Phone :</strong>  {modalData.phone}
            </p>
            <p>
              <strong>Matricule :</strong>  {modalData.car_mat}
            </p>
          </SoftBox>
          <SoftBox sx={{ mt: 2 }} style={{display : "flex" , justifyContent : "end"}}>
            <SoftButton
              onClick={handleClose}
              color="dark"
              size="small"
            >
              Back
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </Modal>
    </DashboardLayout>
  );
}

export default Vips;
