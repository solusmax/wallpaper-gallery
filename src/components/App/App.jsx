import config from '../../config.json';
import { useEffect, useState } from 'react';
import './App.css';
import Gallery from '../Gallery/Gallery';
import decodeUriComponent from 'decode-uri-component';
import { loadImage, isImagesSame, getRgbValue } from '../../utils';

let {
  targetNumberOfRows: targetNumberOfRowsDefault,
  autoRefresh: autoRefreshDefault,
  autoRefreshFrequencyMinutes: autoRefreshFrequencyMinutesDefault,
  imagesToRenderCount: imagesToRenderCountDefault,
  imageHoverEffect: imageHoverEffectDefault,
  refreshButton: refreshButtonDefault,
  refreshButtonInvisibleIfNoHover: refreshButtonInvisibleIfNoHoverDefault,
  refreshButtonPositionSide: refreshButtonPositionSideDefault,
  backgroundColor: backgroundColorDefault,
} = config;

function App() {
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [removedImageURLs, setRemovedImageURLs] = useState([]);

  const [targetNumberOfRows, setTargetNumberOfRows] = useState(
    targetNumberOfRowsDefault,
  );
  const [autoRefresh, setAutoRefresh] = useState(autoRefreshDefault);
  const [autoRefreshFrequencyMinutes, setAutoRefreshFrequencyMinutes] =
    useState(autoRefreshFrequencyMinutesDefault);
  const [imagesToRenderCount, setImagesToRenderCount] = useState(
    imagesToRenderCountDefault,
  );
  const [imageHoverEffect, setImageHoverEffect] = useState(
    imageHoverEffectDefault,
  );
  const [refreshButton, setRefreshButton] = useState(refreshButtonDefault);
  const [refreshButtonInvisibleIfNoHover, setRefreshButtonInvisibleIfNoHover] =
    useState(refreshButtonInvisibleIfNoHoverDefault);
  const [refreshButtonPositionSide, setRefreshButtonPositionSide] = useState(
    refreshButtonPositionSideDefault,
  );
  const [appBackgroundColor, setAppBackgroundColor] = useState(
    backgroundColorDefault,
  );

  useEffect(() => {
    const previousNewImages = [...newImages];

    const throttlingTimeoutId = setTimeout(() => {
      if (isImagesSame(previousNewImages, newImages)) {
        setImages((prevState) => {
          return [...prevState, ...newImages];
        });
        setRemovedImageURLs([]);
      }
    }, 500);

    return () => {
      clearTimeout(throttlingTimeoutId);
    };
  }, [newImages]);

  useEffect(() => {
    if (removedImageURLs.length > 0) {
      setImages((prevState) => {
        return [
          ...prevState.filter((image) => {
            for (let removedImageURL of removedImageURLs) {
              if (image.src == removedImageURL) {
                return false;
              }
            }

            return true;
          }),
        ];
      });
      setNewImages([]);
    }
  }, [removedImageURLs]);

  window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {
      if (properties.targetnumberofrows) {
        setTargetNumberOfRows(properties.targetnumberofrows.value);
      }
      if (properties.autorefresh) {
        setAutoRefresh(properties.autorefresh.value);
      }
      if (properties.autorefreshfrequencymins) {
        setAutoRefreshFrequencyMinutes(
          properties.autorefreshfrequencymins.value,
        );
      }
      if (properties.hovereffect) {
        setImageHoverEffect(properties.hovereffect.value);
      }
      if (properties.numberofimagestodisplay) {
        setImagesToRenderCount(properties.numberofimagestodisplay.value);
      }
      if (properties.refreshbutton) {
        setRefreshButton(properties.refreshbutton.value);
      }
      if (properties.refreshbuttoninvisibility) {
        setRefreshButtonInvisibleIfNoHover(
          properties.refreshbuttoninvisibility.value,
        );
      }
      if (properties.refreshbuttonposition) {
        setRefreshButtonPositionSide(properties.refreshbuttonposition.value);
      }
      if (properties.backgroundcolor) {
        setAppBackgroundColor(getRgbValue(properties.backgroundcolor.value));
      }
    },
    userDirectoryFilesAddedOrChanged: (propertyName, changedFiles) => {
      if (propertyName === 'images') {
        changedFiles.forEach((newImageUrl) => {
          const decodedNewImageUrl = decodeUriComponent(newImageUrl);

          if (images.some((image) => image.src === decodedNewImageUrl)) {
            return;
          }

          const imgNode = new Image();

          async function generateNewImagesData() {
            const newImage = await loadImage(decodedNewImageUrl, imgNode);

            setNewImages((prevState) => {
              return [
                ...prevState,
                {
                  src: decodedNewImageUrl,
                  width: newImage.naturalWidth,
                  height: newImage.naturalHeight,
                },
              ];
            });
          }

          generateNewImagesData();
        });
      }
    },
    userDirectoryFilesRemoved: (propertyName, removedFiles) => {
      if (propertyName === 'images') {
        removedFiles.forEach((removedImage) => {
          const decodedRemovedImageUrl = decodeUriComponent(removedImage);

          setRemovedImageURLs((prevState) => {
            return [...prevState, decodedRemovedImageUrl];
          });
        });
      }
    },
  };

  useEffect(() => {
    document.body.style.backgroundColor = appBackgroundColor;

    return () => {
      document.body.style.backgroundColor = null;
    };
  }, [appBackgroundColor]);

  return (
    <div
      className={`
        ${imageHoverEffect ? 'image-hover-effect' : ''}
      `}
      style={{
        backgroundColor: appBackgroundColor,
      }}
    >
      <Gallery
        images={images}
        targetNumberOfRows={targetNumberOfRows}
        autoRefresh={autoRefresh}
        autoRefreshFrequency={autoRefreshFrequencyMinutes * 60 * 1000}
        imagesToRenderCount={imagesToRenderCount}
        refreshButton={refreshButton}
        refreshButtonInvisibleIfNoHover={refreshButtonInvisibleIfNoHover}
        refreshButtonPositionSide={refreshButtonPositionSide}
      />
    </div>
  );
}

export default App;
