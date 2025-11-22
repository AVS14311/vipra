import { useLightbox } from '../context/LightboxContext'

function LoveTimeline({ onImageClick }) {
  const milestones = [
    {
      date: '2022-11-23',
      title: 'The Proposal 💍',
      description: 'The day I proposed and we became a couple - Our beautiful journey began 💕',
      image: 'media/images/0b5c3414-0b62-44e3-be4f-73790982be0b.jpg',
      emoji: '💍',
    },
    {
      date: '2022-12-01',
      title: 'First Date as a Couple',
      description: 'Our first magical date together as boyfriend and girlfriend 🌟',
      image: 'media/New/vvv.jpg',
      emoji: '💑',
    },
    {
      date: '2023-02-14',
      title: 'First Valentine\'s Day',
      description: 'Our first Valentine\'s Day together - celebrating our love 💋',
      image: 'media/images/1900bd60-4c02-485c-84c7-159298f6938f.jpg',
      emoji: '💋',
    },
    {
      date: '2023-03-20',
      title: 'Said "I Love You"',
      description: 'The first time we said those three magical words 💗',
      image: 'media/images/22abc5e8-5e02-4b1e-9140-6b5092b80e75.jpg',
      emoji: '💕',
    },
    {
      date: '2023-06-01',
      title: 'First Trip Together',
      description: 'Our first adventure as a couple - creating beautiful memories ✈️',
      image: 'media/images/35f65b3c-f268-460c-a23e-a3edce291afd.jpg',
      emoji: '✈️',
    },
  ]

  return (
    <section id="love-timeline" className="scroll-mt-20 p-5 max-w-6xl mx-auto w-full">
      <h1 className="text-white text-[3rem] md:text-[4rem] my-8 text-center py-4 break-words drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
        💕 Our Love Timeline 💕
      </h1>
      
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-white/30 transform md:-translate-x-1/2"></div>
        
        {milestones.map((milestone, idx) => (
          <div
            key={idx}
            className={`relative mb-12 flex flex-col md:flex-row items-center ${
              idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-8 md:left-1/2 w-6 h-6 bg-pink-500 rounded-full border-4 border-white transform md:-translate-x-1/2 z-10"></div>
            
            {/* Content */}
            <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${idx % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-white/30 shadow-xl">
                <div className="text-4xl mb-2">{milestone.emoji}</div>
                <h2 className="text-white text-2xl font-bold mb-2">{milestone.title}</h2>
                <p className="text-white/80 text-sm mb-2">{new Date(milestone.date).toLocaleDateString()}</p>
                <p className="text-white mb-4">{milestone.description}</p>
                {milestone.image && (
                  <img
                    src={`/${milestone.image}`}
                    alt={milestone.title}
                    className="w-full h-48 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => onImageClick(`/${milestone.image}`)}
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default LoveTimeline

