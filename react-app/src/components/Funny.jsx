function Funny({ onImageClick }) {
  const funnyImages1 = [
    'media/funny/0bc098ed-13fa-46e1-a56d-52382e1d853a.jpg',
    'media/funny/9f3fdaec-b626-4e5b-8d4c-a41b289654d9.jpg',
    'media/funny/Screenshot_2023-08-17-02-38-22-908_com.instagram.android.jpg',
    'media/funny/Screenshot_2023-08-25-13-41-28-975_com.instagram.android.jpg',
  ]

  // Note: Some love images may not exist, they will show as broken images
  // This matches the original HTML behavior
  const loveImages1 = [
    'media/love/Screenshot_2023-09-18-02-03-00-739_com.gallery.player.jpg',
    'media/love/Screenshot_2023-09-21-02-06-47-296_com.instagram.android.jpg',
    'media/love/Screenshot_2023-09-21-02-06-55-356_com.instagram.android.jpg',
    'media/love/Screenshot_2023-10-04-01-49-32-646_com.instagram.android.jpg',
  ]

  const loveImages2 = [
    'media/love/Screenshot_2023-10-19-01-36-56-349_com.instagram.android.jpg',
    'media/love/Screenshot_2023-10-20-05-32-35-471_com.instagram.android.jpg',
    'media/love/Screenshot_2023-10-23-01-48-17-433_com.instagram.android.jpg',
    'media/love/Screenshot_2023-10-27-04-52-55-995_com.instagram.android.jpg',
  ]

  const ImageTable = ({ images }) => (
    <table className="w-full border-collapse my-5 mx-auto bg-white/10 rounded-2xl overflow-hidden backdrop-blur-sm shadow-lg">
      <tbody>
        <tr>
          {images.map((img, idx) => (
            <td
              key={idx}
              className="rounded-[15%] border-[3px] border-white/30 text-white drop-shadow-[1px_1px_3px_rgba(0,0,0,0.7)] p-4 text-center text-base bg-white/5 transition-all duration-300 hover:bg-white/15 hover:scale-105 align-middle font-medium leading-relaxed"
            >
              <img
                src={`/${img}`}
                alt=""
                className="w-full max-w-[250px] h-[300px] object-cover object-center border-8 border-white rounded-[20%] shadow-lg transition-all duration-300 block mx-auto my-2.5 cursor-pointer hover:scale-105"
                onClick={() => onImageClick(`/${img}`)}
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )

  return (
    <section id="funny" className="scroll-mt-20 p-5 max-w-6xl mx-auto w-full">
      <h1 className="text-white text-[2.5rem] my-5 text-center py-2.5 break-words drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
        Funnnnn😆😆😆😆😆😆😆😆😆😆😆😆😆
      </h1>
      <ImageTable images={funnyImages1} />
      <ImageTable images={loveImages1} />
      <ImageTable images={loveImages2} />
      <h1 className="text-white text-[2.5rem] my-5 text-center py-2.5 break-words drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
        I LOVE YOU❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
      </h1>
      <div className="flex flex-col items-center gap-5 my-5">
        <img
          src="/media/New/11.jpg"
          alt=""
          className="w-full max-w-[600px] h-auto min-h-[400px] max-h-[950px] border-8 border-white rounded-lg block mx-auto my-5 cursor-pointer hover:scale-105 transition-all duration-300"
          onClick={() => onImageClick('/media/New/11.jpg')}
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
        <img
          src="/media/New/22.jpg"
          alt=""
          className="w-full max-w-[600px] h-auto min-h-[400px] max-h-[950px] border-8 border-white rounded-lg block mx-auto my-5 cursor-pointer hover:scale-105 transition-all duration-300"
          onClick={() => onImageClick('/media/New/22.jpg')}
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
      </div>
    </section>
  )
}

export default Funny

