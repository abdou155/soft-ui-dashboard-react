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
import { getAllParkings } from "services/parking.service";
import { Link } from "react-router-dom";
import ParkingForm from "./components/CreateForm";

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};


function Parkings() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);


  const [open, setOpen] = useState(false);
  const [openSpotForm, setOpenSpotForm] = useState(false);
  const [modalData, setModalData] = useState({});
  const [spots, setSpots] = useState([]);
  
  const handleOpen = (data) => {
    setModalData(data);
    prepareSpotsData(data.spots);
    setOpen(true);
  }
  
  const handleClose = () => {
    setModalData({});
    setOpen(false);
    setSpots({})
  }

  const handleSpotFormOpen = (data) => {
    setOpenSpotForm(true);
  }

  const handleSpotFormClose = () => {
    setOpenSpotForm(false);
  }


  const SpotCols = [
    { name: "ID", align: "left" },
    { name: "price", align: "left" },
    { name: "EV", align: "left" },
    { name: "max_hour", align: "left" },
    { name: "status", align: "left" },
    { name: "action", align: "center" },
  ]


  const prCols = [
    { name: "ID", align: "left" },
    { name: "name", align: "left" },
    { name: "spots", align: "left" },
    { name: "city", align: "left" },
    { name: "status", align: "left" },
    { name: "action", align: "center" },
  ]

  const prepareData = async (data) => {
    let arr = [];
    data.map( async (el) => {
      let obj = {
        ID : <>
             <SoftTypography variant="button" color="text" pl={3} fontWeight="small">
                {el._id.slice(-4).toUpperCase()}
              </SoftTypography>
            </>,
        name : <>
            <SoftTypography  variant="button" color="text" fontWeight="medium">
              {el.name }
            </SoftTypography>
          </>,
        spots : <>
              <SoftTypography  variant="button" color="text" fontWeight="medium">
                {el.spots.length}
              </SoftTypography>
            </>,
        city : <>
                <SoftTypography  variant="button" color="text" fontWeight="medium">
                  {el.city}
                </SoftTypography>
              </>,
        status : <>
                  <SoftBadge variant="gradient" badgeContent={el.status} color={(el.status == 'open' ? "danger" : "secondary")} size="xs" container />
                </>,
        action : <>
        <SoftBox style={{display : "flex"}} >
          <SoftBox onClick={() => handleOpen(el)}>
            <Icon  sx={{ cursor: "pointer", color : "gray" , marginRight : "8px" }} fontSize="small">
              visibility
            </Icon>
            </SoftBox>
            <SoftBox onClick={() => handleOpen(el)}>
            <Icon  sx={{ cursor: "pointer", color : "red" }} fontSize="small">
              delete_outline
            </Icon>
            </SoftBox>
          </SoftBox>
        </>
      }
      arr.push(obj);
    })
    setRows(arr)
  }

  const prepareSpotsData = async (data) => {
    let arr = [];
    data.map( async (el) => {
      console.log("🚀 ~ file: index.js:128 ~ data.map ~ el:", el.max_hour)
      let obj = {
        ID : <>
             <SoftTypography variant="button" color="text" pl={3} fontWeight="small">
                {el._id.slice(-4).toUpperCase()}
              </SoftTypography>
            </>,
        price : <>
            <SoftTypography  variant="button" color="text" fontWeight="medium">
              {el.price } TND
            </SoftTypography>
          </>,
        EV : <>
              <SoftTypography  variant="button" color="text" fontWeight="medium">
                {(el.is_ev) ? "YES" : "NO" }
              </SoftTypography>
            </>,
        max_hour : <>
                <SoftTypography  variant="button" color="text" fontWeight="medium">
                  {(!el.max_hour) ? "N/A" : el.max_hour  }
                </SoftTypography>
              </>,
        status : <>
                  <SoftBadge variant="gradient" badgeContent={el.status} color={(el.status == 'available' ? "success" : "error")} size="xs" container />
                </>,
        action : <>
        <SoftBox style={{display : "flex"}} >
            <SoftBox onClick={() => handleOpen(el)}>
            <Icon  sx={{ cursor: "pointer", color : "red" }} fontSize="small">
              delete_outline
            </Icon>
            </SoftBox>
          </SoftBox>
        </>
      }
      arr.push(obj);
    })
    setSpots(arr)
  }



  const fetchParkings = async () => {
    let response = await getAllParkings()
    if( response ){
      prepareData(response); 
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchParkings();
  }, []);

  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Parking List</SoftTypography>
            <Link to="/parkings/parking-form">
            <SoftButton variant="gradient" color="info" size="small" fullWidth >
              Add new parking
            </SoftButton>
            {Error && <small style={{color : "red" , fontSize : "12px"}}>{Error}</small>}
          </Link>
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
            Parking details
          </SoftTypography>
          <SoftBox style={{fontSize : "14px" , marginBottom : "20px"}} sx={{ mt: 2 }} >
            <p>
              <strong>Name :</strong> {modalData.name}
            </p>
            <p>
              <strong>Longiture :</strong> {modalData.longitude}
            </p>
            <p>
              <strong>Latitude :</strong>  {modalData.latitude}
            </p>
            <p>
              <strong>City :</strong>  {modalData.city}
            </p>
            <p>
              <strong>Description :</strong>  {modalData.description}
            </p>
          </SoftBox>
          <hr style={{ marginBottom : "20px"}}/>
          {
            ( spots.length == 0 ) ? (
              <SoftTypography style={{textAlign : "center"}} variant="h6" component="h2">
                No data found.
              </SoftTypography>
            ) : (
              <Table columns={SpotCols} rows={spots} />
            )
          }
          <SoftBox sx={{ mt: 2 }} style={{display : "flex" , justifyContent : "end"}}>
            <SoftButton style={{marginRight : "10px"}}
              onClick={handleClose}
              color="dark"
              size="small"
            >
              Back
            </SoftButton>
            {/* <Link to={"/spots/"+modalData._id}>
              <SoftButton
                onClick={handleClose}
                color="primary"
                size="small"
              >
                Create Spot
              </SoftButton>
            </Link> */}
          </SoftBox>
        </SoftBox>
      </Modal>


      <Modal
        open={openSpotForm}
        onClose={handleSpotFormClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <SoftBox sx={style}>
          <SoftTypography id="modal-modal-title" variant="h6" component="h2">
            Parking details
          </SoftTypography>
          <SoftBox style={{fontSize : "14px" , marginBottom : "20px"}} sx={{ mt: 2 }} >
            <p>
              <strong>Name :</strong> {modalData.name}
            </p>
            <p>
              <strong>Longiture :</strong> {modalData.longitude}
            </p>
            <p>
              <strong>Latitude :</strong>  {modalData.latitude}
            </p>
            <p>
              <strong>City :</strong>  {modalData.city}
            </p>
            <p>
              <strong>Description :</strong>  {modalData.description}
            </p>
          </SoftBox>
          <hr style={{ marginBottom : "20px"}}/>
         
          <SoftBox sx={{ mt: 2 }} style={{display : "flex" , justifyContent : "end"}}>
            <SoftButton
              onClick={handleSpotFormClose}
              color="dark"
              size="small"
            >
              Back
            </SoftButton>
            <SoftButton
              onClick={handleSpotFormClose}
              color="dark"
              size="small"
            >
              Submit
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </Modal>
    </DashboardLayout>
  );
}

export default Parkings;
