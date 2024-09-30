import { Card } from 'flowbite-react'
import React from 'react'
import Background from '../../img/background.jpg';

const References = () => {


    return(
        <div className='flex flex-col pt-10 bg-black text-gray-500'>
        <div className='w-full text-center'>
          <h2 className='sm:text-5xl font-medium title-font text-white mb-4'>Our Projects</h2>
          <div className='w-16 h-1 rounded-full bg-white mx-auto'></div>
        </div>

        <div className='flex items-center grid-cols-2 gap-10'>
            <div className='flex flex-col gap-5 justify-center text-center md:col-span-1 col-span-2 mt-20'>
                <Card className='w-full' imgAlt='' imgSrc={Background}>
                  <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                    Noteworthy technology acquisitions 2021
                  </h5>
                  <p className='font-normal text-gray-700 dark:text-gray-400'>
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                  </p>
                </Card>

                <Card className='w-full' imgAlt='' imgSrc={Background}>
                  <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                    Noteworthy technology acquisitions 2021
                  </h5>
                  <p className='font-normal text-gray-700 dark:text-gray-400'>
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                  </p>
                </Card>
            </div>
            <div className='flex flex-col gap-5 justify-center text-center md:col-span-1 col-span-2 mt-20'>
                <Card className='w-full' imgAlt='' imgSrc={Background}>
                  <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                    Noteworthy technology acquisitions 2021
                  </h5>
                  <p className='font-normal text-gray-700 dark:text-gray-400'>
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                  </p>
                </Card>

                <Card className='w-full' imgAlt='' imgSrc={Background}>
                  <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                    Noteworthy technology acquisitions 2021
                  </h5>
                  <p className='font-normal text-gray-700 dark:text-gray-400'>
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                  </p>
                </Card> 
            </div>

        </div>
      </div>
    )
}

export default References