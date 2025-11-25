import Image from "next/image"

const BuiltForEveryone = () => {
  return (
    <section className="py-16 px-3.5 lg:px-0">
      <div className="container mx-auto">
        {/* Heading  */}
        <h1 className='font-dm-sans font-semibold leading-12 text-center lg:text-left  text-[38px] lg:text-[56px] my-8 lg:leading-16'>Built For Everyone Connecting <span className="text-[#5D26FF]">Africa</span> <br /> To The <span className="text-[#5D26FF]">World.</span> </h1>

        <div className="flex overflow-x-scroll gap-5">
          <Image src={'/people1.png'} alt='diaspora community members' height={100} width={350} />
          <Image src={'/people2.png'} alt='african diaspora families' height={100} width={350} />
          <Image src={'/people3.png'} alt='international travelers and expats' height={100} width={350} />
          <Image src={'/people1.png'} alt='global african community' height={100} width={350} />
        </div>
      </div>

      {/* global   */}
      <div className="w-screen ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)] mt-16 flex flex-col items-center relative bg-[#5D26FF] lg:h-screen h-[60vh] px-5">
        <Image
          src={'/overlay.png'}
          alt="background overlay"
          width={300}
          height={100}
          className="absolute z-1 top-0 right-0 bottom-0 left-0 w-full h-full opacity-30"
        />
        <h2 className="font-dm-sans font-semibold text-[30px] leading-10 lg:text-[64px] mt-[70px] lg:mt-[130px] mb-4 lg:leading-16 text-white text-center " >Your Global Wallet for Life <br /> Across Borders. </h2>

        <p className="font-fustat font-semibold text-white text-[16px] lg:text-[24px] text-center max-w-4xl px-4">
          Access a stable, secure way to send and spend money across Africa and beyond.  Join early to unlock travel perks, lower fees, and priority access when Looprail launches.
        </p>

        {/* Input  */}
        <div className="lg:w-[30%] w-full mt-5 z-50 relative font-fustat">
          <input type="email" placeholder='Email address' className='w-full p-3 lg:p-5 bg-white rounded-xl text-[16px]' />
          <span className="absolute right-1 lg:right-2 inline-flex p-2 lg:p-3 rounded-xl top-1 lg:top-2 bg-[#5D26FF] text-white ">
            Get Early Access
          </span>
        </div>

        <Image
          src={'/phones.png'}
          alt="looprail mobile wallets on phones"
          width={900}
          height={100}
          className="z-10 absolute bottom-0"
        />
      </div>
    </section>
  )
}

export default BuiltForEveryone