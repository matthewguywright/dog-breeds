import React from 'react';
import './App.css';
import { Container, Grid } from '@mui/material';
import Box from '@mui/material/Box';

function App() {
  return (
    <Container maxWidth="md">
      <Grid xs={12}>
        <Box sx={{ flexGrow: 1 }}>
          <h1>Test</h1>
        </Box>
      </Grid>
    </Container>
  );
}

export default App;
