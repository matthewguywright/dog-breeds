import React, { useEffect, useState } from "react";
import {
  Typography,
  Modal,
  Box,
  Card,
  Grid,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import { fetchImages } from "../features/images/imagesSlice";

function ImagesModal(props: any) {
  const [imageList, setImageList] = useState([]);
  const [breedList, setBreedList] = useState(props.breedList);
  const dispatch = useDispatch<AppDispatch>();
  const images = useSelector((state: any) => state.images);

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

  useEffect(() => {
    dispatch(fetchImages(breedList));
  }, []);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.isOpen}
      onClose={props.handleClose}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Gallery
        </Typography>
        {imageList.length ? (
          <Grid container spacing={2}>
            <ImageList
              sx={{ width: 500, height: 450 }}
              cols={3}
              rowHeight={164}
            >
              {imageList.map((item, i) => (
                <ImageListItem key={item + i}>
                  <img
                    src={`${item}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        ) : (
          <p>No images to display. Make a selection.</p>
        )}
      </Box>
    </Modal>
  );
}

export default ImagesModal;
