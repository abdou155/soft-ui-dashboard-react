import { useState } from "react";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  Button,
} from "@material-ui/core";
import SoftBox from "components/SoftBox";

const initialFormState = {
  name: "",
  address: "",
  city: "",
  latitude: "",
  longitude: "",
  status: "open",
};

export default function ParkingForm() {
  const [formState, setFormState] = useState(initialFormState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formState);
    // Call your API to submit the form data here
  };

  return (
    <SoftBox py={3}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Name"
          value={formState.name}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          name="address"
          label="Address"
          value={formState.address}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          name="city"
          label="City"
          value={formState.city}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          name="latitude"
          label="Latitude"
          value={formState.latitude}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          name="longitude"
          label="Longitude"
          value={formState.longitude}
          onChange={handleChange}
          fullWidth
          required
        />
        <FormControl component="fieldset" style={{  marginBottom : '70px' }} >
          <FormLabel component="legend">Status</FormLabel>
          <RadioGroup
            aria-label="status"
            name="status"
            value={formState.status}
            onChange={handleChange}
          >
            <FormControlLabel
              value="open"
              control={<Radio />}
              label="Open"
            />
            <FormControlLabel
              value="closed"
              control={<Radio />}
              label="Closed"
            />
          </RadioGroup>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </SoftBox>
  );
}
