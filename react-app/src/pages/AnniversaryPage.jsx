import Anniversary from '../components/Anniversary'
import ValentineWeek from '../components/ValentineWeek'
import { useLightbox } from '../context/LightboxContext'

function AnniversaryPage() {
  const { openLightbox } = useLightbox()
  return (
    <>
      <Anniversary onImageClick={openLightbox} />
      <ValentineWeek onImageClick={openLightbox} />
    </>
  )
}

export default AnniversaryPage

