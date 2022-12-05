import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBreeds,
  fetchImages,
  clearImageList,
} from "./features/breeds/breedSlice";
import { AppDispatch } from "./app/store";
import BreedItemRow from "./component/BreedItemRow";
import ImagesModal from "./component/ImagesModal";
import withAlertStyling from "./component/withAlertStyling";
import "./App.css";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const breed = useSelector((state: any) => state.breed);
  const [open, setOpen] = useState(false);
  const [rowCount, setRowCount] = useState(1);
  const [clearRows, setClearRows] = useState(false);

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
          key={i}
          rowId={i}
          addRowHandler={addRowHandler}
          breeds={breed.breeds}
          clearRows={clearRows}
          onRowsCleared={onRowsCleared}
        />
      );
    }
    return rows;
  };

  const addRowHandler = (event: any) => {
    event.preventDefault();
    setRowCount(() => rowCount + 1);
  };

  const onRowsCleared = () => {
    setClearRows(false);
  };

  const clearFormHandler = (event: any) => {
    event.preventDefault();
    dispatch(clearImageList());
    setClearRows(true);
    setRowCount(() => 1);
  };

  useEffect(() => {
    dispatch(fetchBreeds());
  }, []);

  const AlertMessage = withAlertStyling(Alert);

  return (
    <Container sx={{ pt: 3, pb: 3 }}>
      <Grid container sx={{ mb: 2 }}>
        <Grid item xs={12} className="banner"></Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {breed.loading && (
            <Typography variant="h2">Waiting on data...</Typography>
          )}

          {breed.error && (
            <AlertMessage severity="error">
              There was an application error.
            </AlertMessage>
          )}

          {breed.breeds?.length && (
            <>
              <Grid item xs={12}>
                <Typography variant="h2" sx={{ mb: 2 }}>
                  Dog Poster Generator
                </Typography>
                <AlertMessage severity="info">
                  Choose desired breeds to view in the table below and click the
                  "Generate" button to view them.
                </AlertMessage>
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
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  sx={{ mr: 2 }}
                  disabled={!breed.selectedBreeds.length}
                >
                  Generate
                </Button>
                <Button onClick={clearFormHandler} variant="outlined" disabled={!breed.selectedBreeds.length}>
                  Reset
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
      <ImagesModal isOpen={open} handleClose={handleClose} />
    </Container>
  );
}

export default App;
