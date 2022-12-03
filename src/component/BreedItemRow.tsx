import React, { ChangeEvent, useEffect, useState } from "react";
import {
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

function BreedItemRow(props: any) {
  const [allBreeds, setAllBreeds] = useState(props.breeds);
  const [breed, setBreed] = useState("");
  const [subBreed, setSubBreed] = useState("");
  const [subBreeds, setSubBreeds] = useState([]);
  const [imageCount, setImageCount] = useState(0);

  const onBreedChange = (e: any) => {
    const subBreeds = allBreeds.filter((breed: any) => {
      return breed.name === e.target.value;
    });
    setBreed(e.target.value);
    setSubBreeds(subBreeds[0].sub);
  };

  const onSubBreedChange = (e: any) => {
    setSubBreed(e.target.value);
  };

  return (
    <Grid container>
      <Grid item xs={3}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="breed-label">Breed</InputLabel>
          <Select
            labelId="breed-label"
            id="breed"
            value={breed}
            onChange={onBreedChange}
            label="Breed"
          >
            {allBreeds.map((breed: any) => (
              <MenuItem key={breed.name} value={breed.name}>
                {breed.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Choose a breed</FormHelperText>
        </FormControl>
      </Grid>

      <Grid item xs={3}>
        {subBreeds.length ? (
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="sub-breed-label">Sub-Breed</InputLabel>
            <Select
              labelId="sub-breed-label"
              id="subBreed"
              value={subBreed}
              onChange={onSubBreedChange}
              label="Sub-Breed"
            >
              {subBreeds?.map((subBreed: any) => (
                <MenuItem key={subBreed} value={subBreed}>
                  {subBreed}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Choose a sub-breed</FormHelperText>
          </FormControl>
        ) : (
          <span>n/a</span>
        )}
      </Grid>
      <Grid item xs={3}>
        <span>
          <TextField value={imageCount} disabled />
        </span>
      </Grid>
      <Grid>+</Grid>
    </Grid>
  );
}

export default BreedItemRow;
