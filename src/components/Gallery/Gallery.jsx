import PropTypes from 'prop-types';
import PhotoAlbum from 'react-photo-album';
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { shuffleArray } from '../../utils/common';
import { useEffect, useState } from 'react';

export default function Gallery({
  images,
  refreshFrequency = 60 * 1000
}) {
  const [currentImages, setCurrentImages] = useState(shuffleArray(images));
  const [selectedImage, setSelectedImage] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {

      if (!(selectedImage >= 0)) {
        setCurrentImages(shuffleArray(currentImages))
      }

    }, refreshFrequency);

    return () => {
      clearInterval(interval);
    };
  }, [currentImages, refreshFrequency, selectedImage]);

  return (
      <>
        <PhotoAlbum
          layout="rows"
          spacing={() => 0}
          targetRowHeight={() => 460}
          photos={currentImages}
          onClick={({ index: current }) => {
            setSelectedImage(current)
          }}
        />
        <Lightbox
          index={selectedImage}
          slides={currentImages}
          open={selectedImage >= 0}
          close={() => setSelectedImage(-1)}
          styles={{
            container: {
              backgroundColor: 'rgba(0, 0, 0, 0.93)'
            }
          }}
          plugins={[
            Fullscreen,
            Zoom,
          ]}
          zoom={{
            maxZoomPixelRatio: 10,
            zoomInMultiplier: 1.7,
            doubleClickMaxStops: 3
          }}
          animation={{
            zoom: 350
          }}
        />
      </>
  )
}

Gallery.propTypes = {
  images: PropTypes.array.isRequired,
  refreshFrequency: PropTypes.number
}
