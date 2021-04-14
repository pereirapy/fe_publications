import React from 'react'

const NoRecords = ({ cols }) => {
  return (
    <tr>
      <td className="text-center" colSpan={cols}>
        {'noRecords'}
      </td>
    </tr>
  )
}

export default NoRecords
