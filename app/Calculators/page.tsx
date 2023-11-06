import BasicCalculator from '@/app/Components/BasicCalculator';
import React from 'react';
import ProfitLossCalculator from '../Components/ProfitLossCalculator';
import CompoundCalculator from '../Components/CompoundCalculator';
import ForexCalculator from '../Components/ForexCalculator';


function Calculators() {
  return (
    <div className="grid justify-center gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 mt-24">
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