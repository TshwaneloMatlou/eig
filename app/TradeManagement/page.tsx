import React from 'react'

import TablePercentage from "../Components/TablePercentage";


const MoneyManagement = () => {
  return (
    <div>
      <h1 className="text-center font-semibold bg-green-300 mb-8 mt-36 rounded-3xl border-2 border-red-500">Trade Table</h1>
      <div className='grid overflow-x-auto m-5 shadow-lg shadow-green-500 rounded-md'>
        <div className='m-5 p-5'>
          <TablePercentage />
        </div>
      </div>
    </div>
  )
}

export default MoneyManagement
