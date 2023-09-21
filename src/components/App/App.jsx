import './App.css';
import Gallery from '../Gallery/Gallery';
import config from '../../config.json';
import { mockPhotos } from '../../data';
import { useState } from 'react';

const images = mockPhotos;

let {
  targetRowHeight: targetRowHeightDefault,
  autoRefresh: autoRefreshDefault,
  autoRefreshFrequencyMinutes: autoRefreshFrequencyMinutesDefault,
  imagesToRenderCount: imagesToRenderCountDefault,
  imageHoverEffect: imageHoverEffectDefault,
  refreshButton: refreshButtonDefault,
  refreshButtonInvisibleIfNoHover: refreshButtonInvisibleIfNoHoverDefault,
  refreshButtonPositionSide: refreshButtonPositionSideDefault,
} = config;

function App() {
  const [targetRowHeight, setTargetRowHeight] = useState(targetRowHeightDefault);
  const [autoRefresh, setAutoRefresh] = useState(autoRefreshDefault);
  const [autoRefreshFrequencyMinutes, setAutoRefreshFrequencyMinutes] = useState(autoRefreshFrequencyMinutesDefault);
  const [imagesToRenderCount, setImagesToRenderCount] = useState(imagesToRenderCountDefault);
  const [imageHoverEffect, setImageHoverEffect] = useState(imageHoverEffectDefault);
  const [refreshButton, setRefreshButton] = useState(refreshButtonDefault);
  const [refreshButtonInvisibleIfNoHover, setRefreshButtonInvisibleIfNoHover] = useState(refreshButtonInvisibleIfNoHoverDefault);
  const [refreshButtonPositionSide, setRefreshButtonPositionSide] = useState(refreshButtonPositionSideDefault);

  if (window.wallpaperPropertyListener) {
    window.wallpaperPropertyListener = {
      applyUserProperties: function(properties) {
        if (properties.targetrowheight) {
          setTargetRowHeight(properties.targetrowheight.value);
        }
        if (properties.autorefresh) {
          setAutoRefresh(properties.autorefresh.value);
        }
        if (properties.autorefreshfrequencymins) {
          setAutoRefreshFrequencyMinutes(properties.autorefreshfrequencymins.value);
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
          setRefreshButtonInvisibleIfNoHover(properties.refreshbuttoninvisibility.value);
        }
        if (properties.refreshbuttonposition) {
          setRefreshButtonPositionSide(properties.refreshbuttonposition.value);
        }
      },
    };
  }

  return (
    <div className={`
      ${imageHoverEffect ? 'image-hover-effect' : ''}
    `}>
      <Gallery
        images={images}
        targetRowHeight={targetRowHeight}
        autoRefresh={autoRefresh}
        autoRefreshFrequency={autoRefreshFrequencyMinutes * 60 * 1000}
        imagesToRenderCount={imagesToRenderCount}
        refreshButton={refreshButton}
        refreshButtonInvisibleIfNoHover={refreshButtonInvisibleIfNoHover}
        refreshButtonPositionSide={refreshButtonPositionSide}
      />
    </div>
  )
}

export default App
