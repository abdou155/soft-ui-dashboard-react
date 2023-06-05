// @mui material components
import Card from "@mui/material/Card";

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
import { MenuItem, Select } from "@mui/material";
import SelectDropdown from "components/SoftSelect";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  Button,
  LinearProgress,
} from "@material-ui/core";
import SoftButton from "components/SoftButton";
import { Link, useNavigate } from "react-router-dom";
import spot1 from "assets/images/shapes/spot-1.jpg";
import { getAllParkings } from "services/parking.service";
import { createSpot } from "services/parking.service";

const initialFormState = {
  price: 0,
  max_hour: undefined ,
  is_ev: false,
  category : "normal",
  status: "available",
  parking_id: "",
};

function Spots() {
  const [formState, setFormState] = useState(initialFormState);
  const [parkings, setParkings] = useState([]);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchParkingList = async () => {
    const response = await getAllParkings();
    if (response ) {
      setParkings(response)
      setLoading(false)
    }
  };

  const handleSubmit = async () => {
    setLoading(true)
    if( formState.parking_id == "" ){
      alert("Please select parking spot");
    }else{
      const payload = {
        parking_id : formState.parking_id,
        price : formState.price,
        max_hour : (formState.max_hour == 0) ? null : formState.max_hour,
        status : formState.status,
        category : (formState.category) ? formState.category : "NORMAL"
      }
      const response = await createSpot(formState);
      if ( response ) {
        setLoading(false)
        navigate("/parkings");
      }
    }   
  };

  const selectStyles = {
    position: 'relative',
    display: 'inline-block',
    width: '460px',
    height: '40px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    overflow: 'hidden',
    border: '1px solid #ccc',
  };

  const dropdownStyles = {
    width: '100%',
    height: '100%',
    padding: '10px',
    border: 'none',
    background: 'transparent',
    fontSize: '16px',
    color: '#333',
    cursor: 'pointer',
  };


  useEffect(() => {
    fetchParkingList();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
      { (loading) ? (
        <LinearProgress/>
      ) : (
       <> </>
      )}
       <Card>
          <SoftBox display="flex" justifyContent="space-between" p={3}>
            <SoftBox style={{ width: "500px" }} p={3}>
              <form>
               
                <SoftBox style={{ marginBottom: "15px" }}>
                  <TextField
                    name="price"
                    label="Price (TND)"
                    value={formState.price}
                    onChange={handleChange}
                    fullWidth
                    required
                    type="number"
                  />
                </SoftBox>
                <SoftBox style={{ marginBottom: "25px" }}>
                  <TextField
                    name="max_hour"
                    label="Maximum hour"
                    value={formState.max_hour}
                    onChange={handleChange}
                    fullWidth
                    type="number"
                  />
                </SoftBox>
                <SoftBox style={{ marginBottom: "15px" }}>
                  <FormControl component="fieldset" style={{ marginBottom: "20px" }}>
                    <FormLabel component="legend">EV</FormLabel>
                    <RadioGroup
                      aria-label="Category"
                      name="category"
                      value={formState.category}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="NORMAL" control={<Radio />} label="Traditional spot" />
                      <FormControlLabel value="EVSE" control={<Radio />} label="EVSE" />
                      <FormControlLabel value="PREGNENT" control={<Radio />} label="Pregenet women" />
                      <FormControlLabel value="HANDICAP" control={<Radio />} label="Individual with disabilites" />
                    </RadioGroup>
                  </FormControl>
                </SoftBox>
                <SoftBox style={{ marginBottom: "15px" }}>
                  <FormControl component="fieldset" style={{ marginBottom: "30px" }}>
                    <FormLabel component="legend">Status</FormLabel>
                    <RadioGroup
                      aria-label="status"
                      name="status"
                      value={formState.status}
                      onChange={handleChange}
                    >
                       <FormControlLabel
                        value="available"
                        control={<Radio color="primary" />}
                        label="Available"
                      />
                      <FormControlLabel value="occupied" control={<Radio />} label="Occupied" />
                      <FormControlLabel value="out_of_order" control={<Radio />} label="Out of order" />
                    </RadioGroup>
                  </FormControl>
                </SoftBox>
                <SoftBox style={{ marginBottom: "15px" }}>
                <div style={selectStyles}>
                  <select style={dropdownStyles} name="parking_id" onChange={handleChange}>
                    <option value="" selected  disabled>Select a parking</option>
                    {
                      parkings.map( (el , index) => {
                        return (
                          <option key={index} value={el._id}>{el.name}</option>
                        )
                      })
                    }
                  </select>
                </div>
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
                    &nbsp;add new spot
                  </SoftButton>
                </SoftBox>
              </form>
            </SoftBox>
            <SoftBox component="img" src={spot1} alt="parking spot" lg={{ m: "auto" }} style={{ objectFit : "cover"}} height="600px" width="50%" pt={1}/>
            {/* <LeafletMap latlng={latlng} onMarkerChange={handleMarkerChange} /> */}
          </SoftBox>
        </Card>
      
     
      </SoftBox>
    </DashboardLayout>
  );
}

export default Spots;
