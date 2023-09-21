import PropTypes from 'prop-types';
import PhotoAlbum from 'react-photo-album';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { getShuffledSlicedArray } from '../../utils/common';
import { useEffect, useState } from 'react';
import RefreshButton from '../RefreshButton/RefreshButton';


export default function Gallery({
  images,
  targetRowHeight,
  autoRefresh,
  autoRefreshFrequency,
  imagesToRenderCount,
  refreshButton,
  refreshButtonInvisibleIfNoHover,
  refreshButtonPositionSide,
}) {
  const [currentImages, setCurrentImages] = useState(getShuffledSlicedArray(images, imagesToRenderCount));
  const [selectedImage, setSelectedImage] = useState(-1);

  useEffect(() => {

    const interval = setInterval(() => {
      if (!(selectedImage >= 0) && autoRefresh) {
        setCurrentImages(getShuffledSlicedArray(images, imagesToRenderCount))
      }

    }, autoRefreshFrequency);

    return () => {
      clearInterval(interval);
    };
  }, [currentImages, images, autoRefreshFrequency, selectedImage, autoRefresh, imagesToRenderCount]);

  const handleRefreshButtonClick = (evt) => {
    evt.preventDefault();

    setCurrentImages(getShuffledSlicedArray(images, imagesToRenderCount));
  }

  return (
      <>
        {refreshButton && (
          <RefreshButton onClick={handleRefreshButtonClick} positionSide={refreshButtonPositionSide} invisibleIfNoHover={refreshButtonInvisibleIfNoHover} />
        )}
        <PhotoAlbum
          layout="rows"
          spacing={() => 0}
          targetRowHeight={() => targetRowHeight}
          photos={currentImages}
          onClick={({ index: current }) => {
            setSelectedImage(current)
          }}
        />
        <Lightbox
          index={0}
          slides={[currentImages[selectedImage]]}
          open={selectedImage >= 0}
          close={() => setSelectedImage(-1)}
          styles={{
            container: {
              backgroundColor: 'rgba(0, 0, 0, 0.93)',
            }
          }}
          plugins={[
            Zoom,
          ]}
          zoom={{
            maxZoomPixelRatio: 10,
            zoomInMultiplier: 1.7,
            doubleClickMaxStops: 3,
          }}
          animation={{
            zoom: 350,
            fade: 150,
          }}
          controller={{
            closeOnBackdropClick: true,
          }}
          render={{
            iconZoomIn: () => null,
            iconZoomOut: () => null,
            iconClose: () => null,
            buttonPrev: () => null,
            buttonNext: () => null,
          }}
          carousel={{
            finite: true,
          }}
        />
      </>
  )
}

Gallery.propTypes = {
  images: PropTypes.array.isRequired,
  targetRowHeight: PropTypes.number.isRequired,
  autoRefresh: PropTypes.bool.isRequired,
  autoRefreshFrequency: PropTypes.number.isRequired,
  imagesToRenderCount: PropTypes.number.isRequired,
  refreshButton: PropTypes.bool.isRequired,
  refreshButtonInvisibleIfNoHover: PropTypes.bool.isRequired,
  refreshButtonPositionSide: PropTypes.string.isRequired,
}
