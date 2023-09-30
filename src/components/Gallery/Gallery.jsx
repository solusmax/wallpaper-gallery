import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getShuffledSlicedArray } from '../../utils';
import useWindowDimensions from '../../hooks/use-window-dimensions';
import PhotoAlbum from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import RefreshButton from '../RefreshButton/RefreshButton';

export default function Gallery({
  images,
  targetNumberOfRows,
  autoRefresh,
  autoRefreshFrequency,
  imagesToRenderCount,
  refreshButton,
  refreshButtonInvisibleIfNoHover,
  refreshButtonPositionSide,
}) {
  const [renderedImages, setRenderedImages] = useState(
    getShuffledSlicedArray(images, imagesToRenderCount),
  );
  const [selectedImage, setSelectedImage] = useState(-1);

  const { height: windowHeight } = useWindowDimensions();

  useEffect(() => {
    setRenderedImages(getShuffledSlicedArray(images, imagesToRenderCount));
  }, [images, imagesToRenderCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!(selectedImage >= 0) && autoRefresh) {
        setRenderedImages(getShuffledSlicedArray(images, imagesToRenderCount));
      }
    }, autoRefreshFrequency);

    return () => {
      clearInterval(interval);
    };
  }, [
    autoRefreshFrequency,
    selectedImage,
    autoRefresh,
    imagesToRenderCount,
    images,
  ]);

  const handleRefreshButtonClick = (evt) => {
    evt.preventDefault();

    setRenderedImages(getShuffledSlicedArray(images, imagesToRenderCount));
  };

  return (
    <>
      {refreshButton && (
        <RefreshButton
          onClick={handleRefreshButtonClick}
          positionSide={refreshButtonPositionSide}
          invisibleIfNoHover={refreshButtonInvisibleIfNoHover}
        />
      )}
      <PhotoAlbum
        layout="rows"
        spacing={() => 0}
        targetRowHeight={() => Math.round(windowHeight / targetNumberOfRows)}
        photos={renderedImages}
        onClick={({ index: current }) => {
          setSelectedImage(current);
        }}
      />
      <Lightbox
        index={0}
        slides={[renderedImages[selectedImage]]}
        open={selectedImage >= 0}
        close={() => setSelectedImage(-1)}
        styles={{
          container: {
            backgroundColor: 'rgba(0, 0, 0, 0.93)',
          },
        }}
        plugins={[Zoom]}
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
  );
}

Gallery.propTypes = {
  images: PropTypes.array.isRequired,
  targetNumberOfRows: PropTypes.number.isRequired,
  autoRefresh: PropTypes.bool.isRequired,
  autoRefreshFrequency: PropTypes.number.isRequired,
  imagesToRenderCount: PropTypes.number.isRequired,
  refreshButton: PropTypes.bool.isRequired,
  refreshButtonInvisibleIfNoHover: PropTypes.bool.isRequired,
  refreshButtonPositionSide: PropTypes.string.isRequired,
};
