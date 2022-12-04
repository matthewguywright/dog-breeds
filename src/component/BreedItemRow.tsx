import React, { useState } from "react";
import {
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  Grid,
  Chip,
  Paper,
  IconButton,
  TextField,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
      return breed.breed === e.target.value;
    });
    setBreed(e.target.value);
    setSubBreeds(subBreeds[0].sub);
  };

  const onSubBreedChange = (e: any) => {
    setSubBreed(e.target.value);
  };

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell component="th" scope="row">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select id="breed" value={breed} onChange={onBreedChange}>
            {allBreeds.map((breed: any) => (
              <MenuItem key={breed.breed} value={breed.breed}>
                {breed.breed}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell>
        {subBreeds.length ? (
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select id="subBreed" value={subBreed} onChange={onSubBreedChange}>
              {subBreeds?.map((subBreed: any) => (
                <MenuItem key={subBreed} value={subBreed}>
                  {subBreed}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <TextField value="n/a" disabled />
        )}
      </TableCell>
      <TableCell>
        {" "}
        <TextField disabled value={imageCount} />
      </TableCell>
      <TableCell>
        <IconButton onClick={props.addRowHandler} aria-label="delete">
          <ControlPointIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default BreedItemRow;
