import React, { useEffect, useState } from "react";
import { Typography, Modal, Box, Card } from "@mui/material";
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
          Breed Gallery
        </Typography>
        {imageList.map((image: any) => (
          <Card>
            <img src={image} alt={image} />
          </Card>
        ))}
      </Box>
    </Modal>
  );
}

export default ImagesModal;
