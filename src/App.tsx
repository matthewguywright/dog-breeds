import React, { useEffect, useState } from 'react';
import './App.css';
import { Container, Grid, Typography, Box, Button, Modal } from '@mui/material';
import axios from 'axios';

function App() {
  const [breedData, setBreedData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    async function fetchBreeds() {
      await axios.get('https://dog.ceo/api/breeds/list/all', { cancelToken: cancelToken.token })
        .then((res) => {
          const breedArray = [];
          for (const breed in res.data.message) {
            breedArray.push({ subBreeds: res.data.message[breed], breed });
          }
          setBreedData(res.data);
          console.log(res.data.message);
          console.log(breedArray);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log('cancelled call');
          } else {
            // TODO: message
          }
        })
    }
    fetchBreeds();
  }, []);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>Breeds</h1>
        </Grid>
      </Grid>

      <Button onClick={handleOpen}>Open modal</Button>
      
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
