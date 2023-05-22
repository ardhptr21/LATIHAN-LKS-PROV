export default function TableInfo({ data, badge }) {
  return (
    <table className='w-full'>
      <tbody>
        {badge && (
          <tr className='bg-zinc-200'>
            <td className='py-2 px-5 font-bold'>{badge[0]}</td>
            <td className='px-5'>
              <span className='bg-blue-400 capitalize rounded px-1 text-xs text-white font-bold'>{badge[1]}</span>
            </td>
          </tr>
        )}
        {Object.entries(data).map(([key, value]) => (
          <tr key={key} className='odd:bg-zinc-200'>
            <td className='py-2 px-5 font-bold'>{key}</td>
            <td className='px-5'>{value || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
