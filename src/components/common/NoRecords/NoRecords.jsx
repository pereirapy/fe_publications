import React from 'react'

const NoRecords = ({ cols }) => {
  return (
    <tr>
      <td className="text-center" colSpan={cols}>
        No records
      </td>
    </tr>
  )
}

export default NoRecords
