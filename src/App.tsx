import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchBreeds } from "./features/breeds/breedSlice";
import { AppDispatch } from "./app/store";
import BreedItemRow from "./component/BreedItemRow";

function App() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch<AppDispatch>();
  const breed = useSelector((state: any) => state.breed);

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

  const handleBreedChange = (event: SelectChangeEvent) => {};

  const handleSubBreedChange = (event: SelectChangeEvent) => {};

  const handleSubmit = (event: any) => {
    event.preventDefault();
    handleOpen();
  };

  useEffect(() => {
    dispatch(fetchBreeds());
  }, []);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {breed.loading && <Typography variant="h2">Loading...</Typography>}

          {breed.error && (
            <Typography variant="h2" component="p">
              There was an application error.
            </Typography>
          )}

          {breed.breeds?.length && (
            <>
              <Grid container>
                <Grid item xs={3}>
                  Breed
                </Grid>
                <Grid item xs={3}>
                  Sub-Breed
                </Grid>
                <Grid item xs={3}>
                  Image Count
                </Grid>
                <Grid item xs={3}></Grid>
              </Grid>
              <form id="dogForm" noValidate onSubmit={handleSubmit}>
                <Grid item xs={12}>
                  <BreedItemRow breeds={breed.breeds} />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="outlined">
                    View Breed Images
                  </Button>
                </Grid>
              </form>
            </>
          )}
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
