import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  Modal,
  Box,
  Grid,
  ImageList,
  ImageListItem,
  Alert,
} from "@mui/material";
import shuffle from "lodash/shuffle";
import withAlertStyling from "./withAlertStyling";

function ImagesModal(props: any) {
  const breed = useSelector((state: any) => state.breed);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const handleImageClick = (e: any, url: string) => {
    window.open(url, "_blank");
  };

  const AlertMessage = withAlertStyling(Alert);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.isOpen}
      onClose={props.handleClose}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Dog Poster Gallery ({breed.imageList.length} images)
        </Typography>
        {breed.imageList.length ? (
          <Grid container spacing={2}>
            <ImageList
              sx={{ width: 650, height: 450 }}
              cols={3}
              rowHeight={164}
            >
              {shuffle(breed.imageList).map((item: any, i: number) => (
                <ImageListItem key={item + i}>
                  <img
                    src={`${item}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item}
                    loading="lazy"
                    onClick={(e) => handleImageClick(e, item)}
                    style={{ cursor: "pointer" }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        ) : (
          <AlertMessage severity="warning">
            No images to display. Please make a selection.
          </AlertMessage>
        )}
      </Box>
    </Modal>
  );
}

export default ImagesModal;
