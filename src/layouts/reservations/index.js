// @mui material components
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";

import { useEffect, useState } from "react";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import Icon from "@mui/material/Icon";
import { LinearProgress } from "@material-ui/core";

import { listCustomres } from "services/customer.service";
import SoftButton from "components/SoftButton";
import { listReservations } from "services/customer.service";
import { deleteReservation } from "services/customer.service";
import { cancelReservation } from "services/customer.service";
import html2pdf from 'html2pdf.js';
import { useRef } from 'react';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  //border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const selectStyles = {
  position: "relative",
  display: "inline-block",
  width: "200px",
  height: "40px",
  backgroundColor: "#fff",
  borderRadius: "4px",
  overflow: "hidden",
  border: "1px solid #ccc",
};

const dropdownStyles = {
  width: "100%",
  height: "100%",
  padding: "10px",
  border: "none",
  background: "transparent",
  fontSize: "14px",
  color: "#333",
  cursor: "pointer",
};

function Reservations() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);

  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const handleOpen = (data) => {
    setModalData(data);
    setOpen(true);
  };
  const handleClose = () => {
    setModalData({});
    setOpen(false);
  };

  const handleDelete = async (data) => {
    setLoading(true);
    if( data._id ){
      const deleted = await deleteReservation(data._id);
      if( deleted ){
        fetchReservations()
        setLoading(false);
      }
    }
  }

  const modalContentRef = useRef();

  const handlePrint = () => {
    const content = modalContentRef.current;

    html2pdf()
      .set({ filename: 'invoice.pdf', image: { type: 'jpeg', quality: 0.98 } , margin: [5, 5, 5, 5]})
      .from(content)
      .save();
  };

  const handleCancel = async (data) => {
    setLoading(true);
    if( data._id ){
      const cancelled = await cancelReservation(data._id);
      if( cancelled ){
        fetchReservations()
        setLoading(false);
      }
    }
  }

  const prCols = [
    { name: "ID", align: "left" },
    { name: "fullName", align: "left" },
    { name: "phone", align: "left" },
    { name: "spot", align: "left" },
    { name: "price", align: "left" },
    { name: "checkin", align: "left" },
    { name: "checkout", align: "left" },
    { name: "status", align: "left" },
    { name: "action", align: "center" },
  ];

  const getBadgeColor = (type) => {
    switch (type) {
      case "pending":
        return "warning";
      case "approved":
        return "success";
      case "cancelled":
        return "error";
      default:
        break;
    }
  };

  const prepareData = async (data) => {
    let arr = [];
    data.map(async (el) => {
      console.log("🚀 ~ file: index.js:124 ~ data.map ~ el:", el)
      let obj = {
        ID: (
          <>
            <SoftTypography variant="button" color="text" pl={3} fontWeight="small">
              {el._id.slice(-8).toUpperCase()}
            </SoftTypography>
          </>
        ),
        fullName: (
          <>
            <SoftTypography variant="button" color="text" fontWeight="medium">
              {el.user_id.first_name + " " + el.user_id.last_name}
            </SoftTypography>
          </>
        ),
        spot: (
          <>
            <SoftTypography variant="button" color="text" fontWeight="medium">
              {el.spot_id.parking_id.name}
            </SoftTypography>
          </>
        ),
        price: (
          <>
            <SoftTypography variant="button" color="text" fontWeight="medium">
              {el.price} TND
            </SoftTypography>
          </>
        ),
        phone: (
          <>
            <SoftTypography variant="button" color="text" fontWeight="medium">
              {el.user_id.phone}
            </SoftTypography>
          </>
        ),
        checkin: (
          <>
            <SoftTypography variant="button" color="text" fontWeight="medium">
              {new Date(el.checkin).toDateString()}
            </SoftTypography>
          </>
        ),
        checkout: (
          <>
            <SoftTypography variant="button" color="text" fontWeight="medium">
              {new Date(el.checkout).toDateString()}
            </SoftTypography>
          </>
        ),
        status: (
          <>
            <SoftBadge
              variant="gradient"
              badgeContent={el.status}
              color={getBadgeColor(el.status)}
              size="xs"
              container
            />
          </>
        ),
        action: (
          <>
            <SoftBox display="flex">
              { el.status == "pending" ? (
                 <>  
                  <SoftBox onClick={() => handleCancel(el)}>
                    <Icon sx={{ cursor: "pointer", color: "orange" }} fontSize="small">
                      cancel
                    </Icon>
                  </SoftBox>
                </>
              ) : null }
              {el.status != "approved" ? (
                <SoftBox onClick={() => handleDelete(el)}>
                  <Icon sx={{ cursor: "pointer", color: "red" }} fontSize="small">
                    delete
                  </Icon>
                </SoftBox>
              ) : (
                <SoftBox onClick={() => handleOpen(el)}>
                  <Icon sx={{ cursor: "pointer", color: "green" }} fontSize="small">
                    receipt
                  </Icon>
                </SoftBox>
              )}
            </SoftBox>
          </>
        ),
      };
      arr.push(obj);
    });
    setRows(arr);
  };

  const fetchReservations = async () => {
    let response = await listReservations("");
    if (response.data) {
      prepareData(response.data);
      setLoading(false);
    }
  };

  
  const handleFilter = async (e) => {
    setLoading(true);
    let response = await listReservations(e.target.value);
    if (response.data) {
      prepareData(response.data);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Reservations List</SoftTypography>
            <div style={selectStyles}>
              <select style={dropdownStyles} name="parking_id" onChange={handleFilter}>
                <option selected value="">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
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
            {loading ? <LinearProgress /> : <></>}
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
        <div ref={modalContentRef}>
          <SoftTypography id="modal-modal-title" variant="h3" component="h2">
            Invoice
          </SoftTypography>
          <hr/>
          <SoftBox style={{ fontSize: "14px" }} sx={{ mt: 2 , mb:2 }}>
            <p>
              <strong>First name :</strong> {modalData.user_id?.first_name}
            </p>
            <p>
              <strong>Last name :</strong> {modalData.user_id?.last_name}
            </p>
            <p>
              <strong>Phone :</strong> {modalData.user_id?.phone}
            </p>
            <p>
              <strong>Email :</strong> {modalData.user_id?.email}
            </p>
            <p>
              <strong>Type :</strong> {modalData.user_id?.type}
            </p>
          </SoftBox>
          <hr/>
          <SoftBox style={{ fontSize: "14px" }} sx={{ mt: 2 , mb:2 }}>
            <p>
              <strong>Reservation ID :</strong> {modalData._id?.toUpperCase()}
            </p>
            <p>
              <strong>Checkin :</strong> {modalData.checkin}
            </p>
            <p>
              <strong>Checkout :</strong> {modalData.checkout}
            </p>
            <p>
              <strong>Net Price :</strong> {modalData.price}
            </p>
            <p>
              <strong>Status :</strong> {modalData.status?.toUpperCase()}
            </p>
          </SoftBox>
          <hr/>
          <SoftBox style={{ fontSize: "14px" }} sx={{ mt: 2 , mb:3 }}>
            <p>
              <strong>Transaction ID :</strong> {modalData.payment_id?.transactionId?.toUpperCase()}
            </p>
            <p>
              <strong>Amount :</strong> {modalData.payment_id?.amount}
            </p>
            <p>
              <strong>Transaction Date :</strong> {new Date(modalData.payment_id?.date).toDateString()}
            </p>
          </SoftBox>
          </div>
          <SoftBox sx={{ mt: 2 }} style={{ display: "flex", justifyContent: "space-between" }}>
            <SoftButton onClick={handleClose} color="dark" size="small">
              Back
            </SoftButton>
            <SoftButton onClick={handlePrint} color="info" size="small">
              Print
            </SoftButton>
          </SoftBox>
          
        </SoftBox>
        
      </Modal>
    </DashboardLayout>
  );
}

export default Reservations;
