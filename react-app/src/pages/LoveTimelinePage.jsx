import LoveTimeline from '../components/LoveTimeline'
import { useLightbox } from '../context/LightboxContext'

function LoveTimelinePage() {
  const { openLightbox } = useLightbox()
  return <LoveTimeline onImageClick={openLightbox} />
}

export default LoveTimelinePage

