import { useEffect, useState } from 'react'

function Anniversary({ onImageClick }) {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Date.now(),
          left: Math.random() * 100,
          delay: Math.random() * 2,
        },
      ])
    }, 500)

    return () => clearInterval(interval)
  }, [])

  const anniversaryImages = [
    ['media/New/0aa4ecb0-5a29-4755-9ba5-c32c39108012.jpg', 'New/0f38b017-1e23-4858-8073-88de35b36aab.jpg', 'New/0fd33c4a-4283-43dd-81be-10f7a8251390.jpg', 'New/5d0cc042-5259-4e07-bdfd-76e34323e9b5.jpg'],
    ['media/New/2e8266b8-60df-42f8-91c8-d60a599c68a5.jpg', 'New/3b9b6ce9-bd66-47cf-856f-60069771d39e.jpg', 'New/5d0cc042-5259-4e07-bdfd-76e34323e9b5.jpg', 'New/6c207036-1143-4e25-a10d-c0030dd33043.jpg'],
    ['media/New/7a22c499-ebb0-440a-b254-3129d2fa0bb4.jpg', 'New/7f5db84f-5eb3-48b4-94cd-94854436bee3.jpg', 'New/43d33d2e-b034-4c2b-92f5-f49500ebb02b.jpg', 'New/87cf23bd-f721-4ed2-8e8e-db23a788c848.jpg'],
    ['media/New/89c0687d-edb7-41a7-b492-2bff487084a5.jpg', 'New/93a05d76-cf6d-4402-b095-c384c21861eb.jpg', 'New/377e1eeb-d08f-446f-a0c2-9a9620411ea6.jpg', 'New/484ff81c-b020-4ef5-8320-ced4049370eb.jpg'],
    ['media/New/3332b448-615c-4b50-a5e9-fb975ac8b566.jpg', 'New/6188a785-02e2-47a4-a359-1ab582821022.jpg', 'New/443966df-db73-4030-b993-7e9582e4be32.jpg', 'New/bf22499d-790c-45ac-909a-2692e2b84dab.jpg'],
    ['media/New/dc9a5059-2714-45bc-8ca7-6fe735528b9c.jpg', 'New/ddbb04f8-9cc0-423f-82d1-47b64c9c7d0d.jpg', 'New/e1afe912-4537-4955-8ce6-1a63d42d1af8.jpg', 'New/e265e7a6-bafd-4cdd-8e53-62dc2a272fda.jpg'],
    ['media/New/e18080d2-5ce3-4923-ab61-bbe90c491621.jpg', 'New/f3ce862b-e405-44bd-9fd0-6452d4281eda.jpg', 'New/vvv.jpg', 'New/93a05d76-cf6d-4402-b095-c384c21861eb.jpg'],
  ]

  const ImageTable = ({ images, index }) => (
    <table className="w-full border-collapse my-5 mx-auto bg-white/10 rounded-2xl overflow-hidden backdrop-blur-sm shadow-lg animate-fadeInUp" style={{ animationDelay: `${index * 0.2}s` }}>
      <tbody>
        <tr>
          {images.map((img, idx) => (
            <td
              key={idx}
              className="rounded-[15%] border-[3px] border-white/30 text-white drop-shadow-[1px_1px_3px_rgba(0,0,0,0.7)] p-4 text-center text-base bg-white/5 transition-all duration-300 hover:bg-white/15 hover:scale-105 align-middle font-medium leading-relaxed animate-float"
              style={{ animationDelay: `${(index * 0.2 + idx * 0.1)}s` }}
            >
              <img
                src={`/${img}`}
                alt=""
                className="w-full max-w-[250px] h-[300px] object-cover object-center border-8 border-white rounded-[20%] shadow-lg transition-all duration-300 block mx-auto my-2.5 cursor-pointer hover:scale-110 hover:rotate-2 animate-heartbeat"
                onClick={() => onImageClick(`/${img}`)}
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
                style={{ animationDelay: `${(index * 0.2 + idx * 0.1)}s` }}
              />
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )

  return (
    <section id="anniversary" className="scroll-mt-20 p-5 max-w-6xl mx-auto w-full relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-2xl animate-heartFloat"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: '4s',
            }}
          >
            💕
          </div>
        ))}
      </div>

      {/* Sparkles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-xl animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <div className="relative z-10">
        <h1 className="text-white text-[2.5rem] my-5 text-center py-2.5 break-words drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)] animate-anniversaryTitle">
          💕 HAPPY ANNIVERSARY 💕
        </h1>
        <h2 className="text-white text-[1.8rem] my-5 text-center py-2.5 break-words drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)] animate-pulse">
          🎉 Celebrating Our Beautiful Journey Together 🎉
        </h2>
        <div className="text-white text-[1.5rem] my-5 text-center py-2.5 break-words drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)] animate-bounce">
          💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖💖
        </div>
        {anniversaryImages.map((imageRow, idx) => (
          <ImageTable key={idx} images={imageRow} index={idx} />
        ))}
      </div>
    </section>
  )
}

export default Anniversary

