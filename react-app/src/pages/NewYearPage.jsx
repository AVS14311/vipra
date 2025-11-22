import NewYear from '../components/NewYear'
import { useLightbox } from '../context/LightboxContext'

function NewYearPage() {
  const { openLightbox } = useLightbox()
  return <NewYear onImageClick={openLightbox} />
}

export default NewYearPage

