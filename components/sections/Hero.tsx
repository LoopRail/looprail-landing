/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
      <>
        <div className='flex lg:mt-12 mt-8 flex-col lg:flex-row '>
          <div className="  h-full lg:w-[60%] px-4 lg:px-0">
              {/* Banner  */}
              <span className="bg-[#F2EFFC] p-4 lg:px-6 rounded-full lg:w-[60%]  inline-flex items-center" data-aos="fade-right" data-aos-delay="100">
                  <img
                      src={'/country.png'}
                      alt='countries supported by looprail'
                      className='w-[15%]'
                      data-aos="zoom-in"
                      data-aos-delay="200"
                  />
                  <p className="text-[15px] lg:text-[20px] ml-4 text-[#5D26FF]" data-aos="fade-right" data-aos-delay="300">
                      Send and recieve money in 40+ countries
                  </p>
              </span>

              {/* Heading  */}
              <h1 className='font-dm-sans font-bold text-[34px] leading-10 lg:text-left text-center lg:text-[70px] lg:leading-18 mt-5' data-aos="fade-right" data-aos-delay="400">
                      The <span className="text-[#5D26FF]">Stablecoin</span> Wallet <br/>
                      
                      for Africa’s Connected <span className="text-[#5D26FF]">Diaspora</span>.
              </h1>

              {/* Subheading  */}
              <p className="mt-5 font-fustat lg:w-[90%] lg:text-left text-center text-[18px] lg:text-[22px]" data-aos="fade-right" data-aos-delay="500">
              Looprail lets you send and spend digital dollars like local cash, whether you’re abroad, traveling, or supporting family back home.
              </p>

              {/* Input  */}
              <div className="lg:w-[70%] w-full relative lg:my-4 my-8 font-fustat" data-aos="fade-right" data-aos-delay="600">
                  <input type="text" placeholder='Email address' className='w-full p-3 lg:p-5 bg-[#D7D7D780] rounded-xl text-[14px] lg:text-[16px]' />
                  <span className="absolute top-1 right-1 lg:right-2 inline-flex p-2 text-[13px] lg:text-[16px] lg:p-3 lg:px-3  rounded-xl lg:top-2 bg-[#5D26FF] text-white  ">
                      Get Early Access
                  </span>
              </div>
          </div>
          <div className="flex-1  h-full flex items-center justify-center lg:justify-end w-full">
              <img src={'/phone.png'} alt='looprail' className='  w-[88%]' data-aos="zoom-out" data-aos-delay="300" data-aos-duration="1000"/>
          </div>
          
          </div>
          
          {/* Trusted sectioon  */}
          <div className="flex flex-col items-center justify-center w-full" data-aos="fade-up" data-aos-delay="700">
              <h1 className='font-dm-sans font-bold text-[#C8C8C8] text-[28px] mt-6' data-aos="fade-up" data-aos-delay="800">Trusted by</h1>
              <div className="flex gap-2 lg:gap-6 mt-5 w-full items-center justify-center">
                  <Image src={'/transak.png'} alt='transact with looprail' width={130} height={100} data-aos="zoom-in" data-aos-delay="900"/>
                  <Image src={'/paycrest.png'} alt='transact with looprail' width={130} height={100} data-aos="zoom-in" data-aos-delay="1000"/>
                  <Image src={'/blockradar.png'} alt='transact with looprail' width={130} height={100} data-aos="zoom-in" data-aos-delay="1100"/>
              </div>
          </div>
      </>
  )
}

export default Hero