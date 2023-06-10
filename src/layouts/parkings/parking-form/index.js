// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import LeafletMap from "components/LeafletMap";
import React, { useEffect, useState } from "react";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftBox from "components/SoftBox";
import { Card } from "@mui/material";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  Button,
} from "@material-ui/core";
import { createParking } from "services/parking.service";
import Swal from "sweetalert2";

const initialFormState = {
  name: "",
  address: "",
  city: "",
  latitude: "",
  longitude: "",
  status: "open",
  description : ""
};

function ParkingForm() {
  //window.location.reload(false);
  const [latlng, setLatLng] = useState([35.68177088485512, 10.10398864746094]);
  const [formState, setFormState] = useState(initialFormState);
  let navigate = useNavigate ();

  useEffect(() => {
    console.log(latlng);
  }, [latlng]);

  function handleMarkerChange(marker) {
    setLatLng(marker.getLatLng());
    setFormState((prevState) => ({
      ...prevState,
      latitude: latlng.lat,
      longitude: latlng.lng,
    }));
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    const response = await createParking(formState);
    if (response.message === "Parking is already exist") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text:  "Parking is already exist !"
      })
    }else{
      navigate("/parkings");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" p={3}>
            <SoftBox style={{ width: "700px" }} p={3}>
              <form>
                <SoftBox style={{ marginBottom: "15px" }}>
                  <TextField
                    name="name"
                    label="Name"
                    value={formState.name}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </SoftBox>
                <SoftBox style={{ marginBottom: "15px" }}>
                  <TextField
                    name="address"
                    label="Address"
                    value={formState.address}
                    onChange={handleChange}
                    fullWidth
                  />
                </SoftBox>
                <SoftBox style={{ marginBottom: "15px" }}>
                  <TextField
                    name="city"
                    label="City"
                    value={formState.city}
                    onChange={handleChange}
                    fullWidth
                  />
                </SoftBox>
                <SoftBox style={{ marginBottom: "15px" }}>
                  <TextField
                    name="latitude"
                    label="Latitude"
                    value={formState.latitude}
                    onChange={handleChange}
                    fullWidth
                    required
                    disabled
                  />
                </SoftBox>
                <SoftBox style={{ marginBottom: "25px" }}>
                  <TextField
                    name="longitude"
                    label="Longitude"
                    value={formState.longitude}
                    onChange={handleChange}
                    fullWidth
                    required
                    disabled
                  />
                </SoftBox>
                <SoftBox style={{ marginBottom: "25px" }}>
                  <TextField
                    name="description"
                    label="Details"
                    value={formState.description}
                    onChange={handleChange}
                    multiline
                    fullWidth
                    minRows={4}
                  />
                </SoftBox>
                <SoftBox style={{ marginBottom: "15px" }}>
                  <FormControl component="fieldset" style={{ marginBottom: "70px" }}>
                    <FormLabel component="legend">Status</FormLabel>
                    <RadioGroup
                      aria-label="status"
                      name="status"
                      value={formState.status}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="open"
                        control={<Radio color="primary" />}
                        label="Open"
                      />
                      <FormControlLabel value="closed" control={<Radio />} label="Closed" />
                    </RadioGroup>
                  </FormControl>
                </SoftBox>
                <SoftBox display="flex" justifyContent="end">
                  <SoftButton
                    variant="outlined"
                    size="small"
                    color="info"
                    component={Link}
                    to="/parkings"
                  >
                    &nbsp;Back
                  </SoftButton>
                  <SoftButton
                    onClick={handleSubmit}
                    variant="contained"
                    size="small"
                    color="info"
                    style={{ marginLeft: "8px" , padding:"5px" }}
                    /* component={Link}
                    to="/parkings/parking-form" */
                  >
                    &nbsp;add new parking
                  </SoftButton>
                </SoftBox>
              </form>
            </SoftBox>
            <LeafletMap latlng={latlng} onMarkerChange={handleMarkerChange} />
          </SoftBox>
        </Card>
      </SoftBox>
    </DashboardLayout>
  );
}

export default ParkingForm;
