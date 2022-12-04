import React, { useState } from "react";
import {
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  Grid,
  Chip,
  IconButton,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

function BreedItemRow(props: any) {
  const [allBreeds, setAllBreeds] = useState(props.breeds);
  const [breed, setBreed] = useState("");
  const [subBreed, setSubBreed] = useState("");
  const [subBreeds, setSubBreeds] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const dispatch = useDispatch();

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
          <Select id="breed" value={breed} onChange={onBreedChange}>
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
            <Select id="subBreed" value={subBreed} onChange={onSubBreedChange}>
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
          <TextField disabled value={imageCount} />
        </span>
      </Grid>
      <Grid>
        <IconButton onClick={props.addRowHandler} aria-label="delete">
          <ControlPointIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default BreedItemRow;
