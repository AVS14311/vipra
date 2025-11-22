import Anniversary from '../components/Anniversary'
import { useLightbox } from '../context/LightboxContext'

function AnniversaryPage() {
  const { openLightbox } = useLightbox()
  return <Anniversary onImageClick={openLightbox} />
}

export default AnniversaryPage

