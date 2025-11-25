import Image from 'next/image'
import React from 'react'

const HowItWorks = () => {
  return (
    <section className='py-16 px-3 lg:px-0'>
      {/* Heading  */}
      <h1 className='font-dm-sans font-bold text-[34px] lg:text-[56px] my-8 ' data-aos="fade-up" data-aos-delay="100">How <span className="text-[#5D26FF]">Looprail</span> Works</h1>

      {/* Bento grid  */}
      <div className="grid grid-cols-1 lg:grid-cols-12 w-full gap-6  px-3 lg:px-0">
        <div className="lg:col-span-5 w-full bg-[#F7F7F7] px-6 pt-6 rounded-2xl" data-aos="fade-right" data-aos-delay="200">
          <h2 className='font-dm-sans font-bold text-[32px] mt-2'>Send</h2>
          <p className="font-fustat text-gray-500 mt-2 w-[80%]">
            Easily send stablecoins directly to friends, family, or merchants in Africa — no banks, no hidden fees, and no waiting days for settlement.
          </p>
          <Image src={'/send.png'}
            alt='send money internationally with looprail'
            width={400}
            height={100}
            className='mt-14 mx-auto'
          />
        </div>
        <div className="lg:col-span-7 gap-5 items-start justify-start ">
          <div className="row-span-6 flex flex-col w-auto bg-[#5D26FF] rounded-2xl text-white overflow-hidden font-fustat h-[57%] relative p-6" data-aos="fade-left" data-aos-delay="300">
            <Image
              src={'/overlay.png'} alt='overlap image' width={400} height={100}
              className='absolute top-0 bottom-0 right-0 left-0 w-full opacity-30 '
            />
            <h2 className='font-dm-sans font-bold text-[32px] mt-2'>Accept</h2>
            <p className="font-fustat  mt-2 w-[80%]">
              Whether you’re a merchant, freelancer, or hotel, Looprail lets you receive payments from anywhere in the world in stablecoins or local currency.
            </p>
            <Image src={'/stack.png'} alt='accept payments with looprail' width={500} height={100}
              className='mx-auto z-3 mt-8'
            />
          </div>
          <div className="row-span-4 w-full mt-6 bg-[#F7F7F7] px-6 pt-6 rounded-2xl overflow-hidden relative lg:h-[40%] h-[65%]" data-aos="fade-left" data-aos-delay="400">
            <h2 className='font-dm-sans font-bold text-[32px] mt-2'>Spend</h2>
            <p className="font-fustat text-gray-500 mt-2  w-[60%] mb-24">
              Use your Looprail wallet or card to pay for what matters; hotels, groceries, transport, and more, all directly from your
              stablecoin balance.
            </p>
            <Image src={'/cards.png'}
              alt='spend money with looprail card'
              width={300}
              height={100}
              className='absolute bottom-0 right-0  '
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks