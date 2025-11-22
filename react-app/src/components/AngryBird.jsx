function AngryBird({ onImageClick }) {
  const angryImages = [
    'media/Angry/7ac3036a-a27e-4c32-b926-97cf06adfdc4.jpg',
    'media/Angry/07c2cc29-b1d6-4561-8d1e-be4f65c75b12.jpg',
    'media/Angry/Screenshot_2023-09-26-02-15-49-389_com.instagram.android.jpg',
    'media/Angry/Screenshot_2023-09-26-02-16-03-593_com.instagram.android.jpg',
  ]

  const angryImages2 = [
    'media/Angry/Screenshot_2023-09-30-01-44-27-347_com.instagram.android.jpg',
    'media/Angry/Screenshot_2023-09-30-01-44-37-585_com.instagram.android.jpg',
    'media/Angry/Screenshot_2023-09-30-01-47-38-229_com.instagram.android.jpg',
    'media/Angry/Screenshot_2023-09-30-01-48-11-722_com.instagram.android.jpg',
  ]

  const angryImages3 = [
    'media/Angry/Screenshot_2023-10-20-05-23-43-891_com.instagram.android.jpg',
    'media/Angry/Screenshot_2023-10-20-05-28-24-710_com.instagram.android.jpg',
    'media/Angry/Screenshot_2023-10-20-05-30-42-892_com.instagram.android.jpg',
    'media/Angry/Screenshot_2023-10-23-01-56-05-505_com.instagram.android.jpg',
  ]

  const angryImages4 = [
    'media/Angry/Screenshot_2023-10-23-02-01-57-700_com.instagram.android.jpg',
    'media/Angry/Screenshot_2023-10-23-02-15-22-726_com.instagram.android.jpg',
    'media/Angry/Screenshot_2023-10-27-04-50-53-514_com.instagram.android.jpg',
    'media/Angry/Screenshot_2023-10-27-05-04-32-988_com.instagram.android.jpg',
  ]

  const angryImages5 = [
    'media/Angry/Screenshot_2023-11-08-11-07-59-074_com.instagram.android.jpg',
    'media/Angry/Screenshot_2023-11-11-05-22-04-344_com.instagram.android.jpg',
    'media/Angry/Screenshot_2023-11-11-05-24-37-159_com.instagram.android.jpg',
    'media/Angry/Screenshot_2023-11-13-04-06-11-829_com.instagram.android.jpg',
  ]

  const quote = "मुझे जीने के लिए साँसो की नहीं ,\nबस आपकी ज़रूरत है ..!!💞"

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
    <section id="angry-bird" className="scroll-mt-20 p-5 max-w-6xl mx-auto w-full">
      <h1 className="text-white text-[2.5rem] my-5 text-center py-2.5 break-words drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
        Angry Bird👻👻👻👻👻👻👻🐧🦜🦜🦜🦜
      </h1>
      <ImageTable images={angryImages} />
      <h2 className="text-white text-2xl my-4 text-center py-2.5 bg-white/10 rounded-lg backdrop-blur-sm drop-shadow-[2px_2px_4px_rgba(0,0,0,0.6)]">
        {quote.split('\n').map((line, idx) => (
          <span key={idx}>
            {line}
            {idx === 0 && <br />}
          </span>
        ))}
      </h2>
      <ImageTable images={angryImages2} />
      <h2 className="text-white text-2xl my-4 text-center py-2.5 bg-white/10 rounded-lg backdrop-blur-sm drop-shadow-[2px_2px_4px_rgba(0,0,0,0.6)]">
        {quote.split('\n').map((line, idx) => (
          <span key={idx}>
            {line}
            {idx === 0 && <br />}
          </span>
        ))}
      </h2>
      <ImageTable images={angryImages3} />
      <h2 className="text-white text-2xl my-4 text-center py-2.5 bg-white/10 rounded-lg backdrop-blur-sm drop-shadow-[2px_2px_4px_rgba(0,0,0,0.6)]">
        {quote.split('\n').map((line, idx) => (
          <span key={idx}>
            {line}
            {idx === 0 && <br />}
          </span>
        ))}
      </h2>
      <ImageTable images={angryImages4} />
      <h2 className="text-white text-2xl my-4 text-center py-2.5 bg-white/10 rounded-lg backdrop-blur-sm drop-shadow-[2px_2px_4px_rgba(0,0,0,0.6)]">
        {quote.split('\n').map((line, idx) => (
          <span key={idx}>
            {line}
            {idx === 0 && <br />}
          </span>
        ))}
      </h2>
      <ImageTable images={angryImages5} />
    </section>
  )
}

export default AngryBird

