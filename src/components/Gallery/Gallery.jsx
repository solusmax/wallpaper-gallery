import PropTypes from 'prop-types';

import PhotoAlbum from 'react-photo-album';
import { shuffleArray } from '../../utils/common';
import { useEffect, useState } from 'react';

export default function Gallery({
  images,
  refreshFrequency = 60 * 1000
}) {
  const [currentImages, setCurrentImages] = useState(shuffleArray(images));

  useEffect(() => {
    const interval = setInterval(() => setCurrentImages(shuffleArray(currentImages)), refreshFrequency);

    return () => {
      clearInterval(interval);
    };
  }, [currentImages, refreshFrequency]);

  return (
    <PhotoAlbum layout="rows" spacing={() => 0} targetRowHeight={() => 460} photos={currentImages} />
  )
}

Gallery.propTypes = {
  images: PropTypes.array.isRequired,
  refreshFrequency: PropTypes.number
}
