import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Alert,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBreeds,
  fetchImages,
  clearImageList,
} from "./features/breeds/breedSlice";
import { AppDispatch } from "./app/store";
import BreedItemRow from "./component/BreedItemRow";
import ImagesModal from "./component/ImagesModal";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const breed = useSelector((state: any) => state.breed);
  const [open, setOpen] = useState(false);
  const [rowCount, setRowCount] = useState(1);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(fetchImages(breed.selectedBreeds));
    handleOpen();
  };

  const getRows = () => {
    let rows = [] as any[];
    for (let i = 0; i < rowCount; i++) {
      rows.push(
        <BreedItemRow
          rowId={i}
          addRowHandler={addRowHandler}
          breeds={breed.breeds}
        />
      );
    }
    return rows;
  };

  const addRowHandler = (event: any) => {
    event.preventDefault();
    setRowCount(() => rowCount + 1);
  };

  const clearFormHandler = (event: any) => {
    event.preventDefault();
    dispatch(clearImageList());
    setRowCount(() => 1);
  };

  useEffect(() => {
    dispatch(fetchBreeds());
  }, []);

  return (
    <Container sx={{ pt: 3, pb: 3 }}>
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
              <form id="dogForm" noValidate onSubmit={handleSubmit}>
                <Grid item xs={12}>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    Choose desired breeds to view in the table below and click
                    the "Generate" button to view them.
                  </Alert>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="breed table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Breed</TableCell>
                          <TableCell>Sub-Breed</TableCell>
                          <TableCell>Image Count</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>{getRows()}</TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12} sx={{ mt: 4 }}>
                  <Button type="submit" variant="outlined" sx={{ mr: 2 }}>
                    Generate
                  </Button>
                  <Button onClick={clearFormHandler} variant="outlined">
                    Clear
                  </Button>
                </Grid>
              </form>
            </>
          )}
        </Grid>
      </Grid>
      <ImagesModal isOpen={open} handleClose={handleClose} />
    </Container>
  );
}

export default App;
