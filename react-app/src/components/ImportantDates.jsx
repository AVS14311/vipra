function ImportantDates() {
  const dates = [
    { label: 'Propose', value: '23rd November' },
    { label: 'My love birthday', value: '8th July' },
    { label: 'Favourite Color', value: 'Light Blue' },
  ]

  return (
    <section id="important-dates" className="scroll-mt-20 p-5 max-w-6xl mx-auto w-full">
      <h1 className="text-white text-[2.5rem] my-5 text-center py-2.5 break-words drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
        Important Dates
      </h1>
      <table className="w-full border-collapse my-5 mx-auto bg-white/10 rounded-2xl overflow-hidden backdrop-blur-sm shadow-lg">
        <tbody>
          {dates.map((date, idx) => (
            <tr key={idx}>
              <td className="rounded-[15%] border-[3px] border-white/30 text-white drop-shadow-[1px_1px_3px_rgba(0,0,0,0.7)] p-4 text-center text-base bg-white/5 transition-all duration-300 hover:bg-white/15 hover:scale-105 align-middle font-medium leading-relaxed">
                {date.label}
              </td>
              <td className="rounded-[15%] border-[3px] border-white/30 text-white drop-shadow-[1px_1px_3px_rgba(0,0,0,0.7)] p-4 text-center text-base bg-white/5 transition-all duration-300 hover:bg-white/15 hover:scale-105 align-middle font-medium leading-relaxed">
                {date.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default ImportantDates

