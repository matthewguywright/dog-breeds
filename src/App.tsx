import React, { Suspense, useEffect, useState } from "react";
import { Container, Grid, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchBreeds } from "./features/breeds/breedSlice";
import { AppDispatch } from "./app/store";
import BreedItemRow from "./component/BreedItemRow";
import ImagesModal from "./component/ImagesModal";

function App() {
  const [breedList, setBreedList] = useState([]);
  const dispatch = useDispatch<AppDispatch>();
  const breed = useSelector((state: any) => state.breed);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <Suspense></Suspense>
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
      <ImagesModal
        isOpen={open}
        handleClose={handleClose}
        imageList={breed.imageList}
      />
    </Container>
  );
}

export default App;
