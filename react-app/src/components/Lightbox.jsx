function Lightbox({ image, onClose }) {
  if (!image) return null

  return (
    <div
      className="fixed z-[9999] left-0 top-0 w-full h-full bg-black/90 overflow-auto flex items-center justify-center"
      style={{
        animation: 'fadeIn 0.3s'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <span
        className="absolute top-5 right-9 text-white text-4xl font-bold cursor-pointer z-[10000] transition-all duration-300 bg-black/50 w-12 h-12 rounded-full flex items-center justify-center leading-none hover:bg-white/20 hover:rotate-90"
        onClick={onClose}
      >
        &times;
      </span>
      <div 
        className="relative max-w-[90%] max-h-[90%] mx-auto"
        style={{
          animation: 'zoomIn 0.3s'
        }}
      >
        <img
          src={image}
          alt=""
          className="w-auto h-auto max-w-full max-h-[90vh] border-[5px] border-white rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.8)] object-contain m-0 block"
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
      </div>
    </div>
  )
}

export default Lightbox

