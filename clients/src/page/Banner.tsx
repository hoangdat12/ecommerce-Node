import React from 'react';

const Banner = () => {
  return (
    <div className='flex items-center justify-center w-screen h-screen bg-[#d9d3cc]'>
      <div className='w-[92%] h-[80%] border-8 border-white rounded-xl'>
        <div className='grid grid-cols-2 bg-[#fbf8f2] rounded-xl p-6'>
          <div className='col-span-1'>1</div>
          <div className='overflow-hidden col-span-1 md:flex hidden'>
            <img
              className='w-full h-full object-center'
              src='https://images.pexels.com/photos/1656563/pexels-photo-1656563.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              alt=''
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
