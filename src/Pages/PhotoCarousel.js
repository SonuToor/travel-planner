import datesDemo from "../Images/dates-demo.png";
import itineraryDemo from "../Images/itinerary-demo.png";
import itineraryClosedDemo from "../Images/itinerary2-demo.png";
import ImageGallery from "react-image-gallery";
import locationDemo from "../Images/location-demo.png";
import modalDemo from "../Images/modal-demo.png";
import React from "react";
import tripsDemo from "../Images/trips-demo.png";

const images = [
  {
    original: itineraryClosedDemo
  },
  {
    original: itineraryDemo
  },
  {
    original: modalDemo
  },
  {
    original: locationDemo
  },
  {
    original: datesDemo
  },
  {
    original: tripsDemo
  }
];

const PhotoCarousel = () => {
  return (
    <ImageGallery
      items={images}
      showThumbnails={false}
      showFullscreenButton={false}
      showPlayButton={false}
    />
  );
};

export default PhotoCarousel;
