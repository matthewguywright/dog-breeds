import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Modal,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";

function App() {
  const [breedData, setBreedData] = useState([]);
  const [breed, setBreed] = useState("");
  const [subBreed, setSubBreed] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const logData = () => {
    console.log(breed);
    console.log(subBreed);
  };

  const handleBreedChange = (event: SelectChangeEvent) => {
    setBreed(event.target.value);
    logData();
  };

  const handleSubBreedChange = (event: SelectChangeEvent) => {
    setSubBreed(event.target.value);
    logData();
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(breed);
    console.log(subBreed);
    handleOpen();
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    async function fetchBreeds() {
      await axios
        .get("https://dog.ceo/api/breeds/list/all", {
          cancelToken: cancelToken.token,
        })
        .then((res) => {
          const breedArray = [];
          for (const breed in res.data.message) {
            breedArray.push({ sub: res.data.message[breed], name: breed });
          }
          setBreedData(res.data);
          console.log(res.data.message);
          console.log(breedArray);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("cancelled call");
          } else {
            // TODO: message
          }
        });
    }
    fetchBreeds();
  }, []);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <form id="dogForm" noValidate onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="breed-label">Breed</InputLabel>
                <Select
                  labelId="breed-label"
                  id="breed"
                  value={breed}
                  label="Breed"
                  onChange={handleBreedChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>Choose a breed</FormHelperText>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="sub-breed-label">Sub-Breed</InputLabel>
                <Select
                  labelId="sub-breed-label"
                  id="subBreed"
                  value={subBreed}
                  label="Sub-Breed"
                  onChange={handleSubBreedChange}
                  disabled
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>Choose a sub-breed</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="outlined">
                submit
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Breed Gallery
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
}

export default App;
