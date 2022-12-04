import React, { useEffect, useState } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  IconButton,
  TextField,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import breedService from "../services/breed.service";
import { addSelectedBreed } from "../features/breeds/breedSlice";

function BreedItemRow(props: any) {
  const [allBreeds, setAllBreeds] = useState(props.breeds);
  const [breed, setBreed] = useState("");
  const [subBreed, setSubBreed] = useState("");
  const [subBreeds, setSubBreeds] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const dispatch = useDispatch();
  const breedSlice = useSelector((state: any) => state.breed);

  const hasSubBreeds = (breed: string) => {
    const breedInfo = allBreeds.find((item: any) => {
      return item.breed === breed;
    });
    return breedInfo?.sub?.length;
  };

  const addSelectedBreeds = () => {
    const alreadyExists = breedSlice.selectedBreeds.find((item: any) => {
      return item.breed === breed && item.subBreed === subBreed;
    });
    if (alreadyExists) {
      return;
    }
    if (breed && !subBreed && hasSubBreeds(breed)) {
      return;
    }
    if (breed) {
      dispatch(addSelectedBreed({ breed, subBreed }));
    }
  };

  const onBreedChange = (e: any) => {
    const subBreeds = allBreeds.filter((breed: any) => {
      return breed.breed === e.target.value;
    });
    setBreed(e.target.value);
    setSubBreed("");
    setSubBreeds(subBreeds[0].sub);
  };

  const onSubBreedChange = (e: any) => {
    setSubBreed(e.target.value);
  };

  useEffect(() => {
    async function getImageCount() {
      if (breed) {
        const count = await breedService.getImageCount({ breed, subBreed });
        setImageCount(count);
      }
    }
    getImageCount();
    addSelectedBreeds();
  }, [breed, subBreed]);

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell component="th" scope="row">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            id={"breed" + props.rowId}
            name={"breed" + props.rowId}
            value={breed}
            onChange={onBreedChange}
          >
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
            <Select
              id={"subBreed" + props.rowId}
              name={"breed" + props.rowId}
              value={subBreed}
              onChange={onSubBreedChange}
            >
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
