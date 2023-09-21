import Gallery from "../Gallery/Gallery"
import { mockPhotos } from '../../data'

const images = mockPhotos.slice();

function App() {
  return (
    <>
      <Gallery images={images} refreshFrequency={30 * 60 * 1000} />
    </>
  )
}

export default App
