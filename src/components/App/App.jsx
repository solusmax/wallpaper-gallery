import Gallery from "../Gallery/Gallery"
import config from '../../config.json'
import { mockPhotos } from '../../data'

const images = mockPhotos.slice();

function App() {
  return (
    <>
      <Gallery
        images={images}
        refreshFrequency={config.autorefreshFrequencyMinutes * 60 * 1000}
      />
    </>
  )
}

export default App
