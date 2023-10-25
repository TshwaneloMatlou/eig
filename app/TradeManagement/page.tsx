import React from 'react'

import TablePercentage from "../Components/TablePercentage";


const MoneyManagement = () => {
  return (
    <div className='grid overflow-x-auto m-5 shadow-lg shadow-green-500 '>

      <div className='m-5 p-5'>
        <TablePercentage />
      </div>
    </div>
  )
}

export default MoneyManagement
