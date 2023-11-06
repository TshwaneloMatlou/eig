import BasicCalculator from '@/app/Components/BasicCalculator';
import React from 'react';
import ProfitLossCalculator from '../Components/ProfitLossCalculator';
import CompoundCalculator from '../Components/CompoundCalculator';
import ForexCalculator from '../Components/ForexCalculator';


function Calculators() {
  return (
    <div className="grid justify-center gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 mt-36">
      <h1 className="text-center font-semibold bg-green-300 mb-5 rounded-3xl border-2 border-red-500">Calculators</h1>
      <div className='mt-5 mb-5 mx-5'>
      <BasicCalculator />
      </div>
      <div className='mt-5 mb-5 mx-5'>
      <ProfitLossCalculator />
      </div>
      <div className='mb-5 mx-5'>
      <CompoundCalculator />
      </div>
      <div className='mb-5 mx-5'>
      <ForexCalculator />
      </div>
      
    </div>
  );
}

export default Calculators;