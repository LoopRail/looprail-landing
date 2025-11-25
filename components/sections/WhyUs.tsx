import Image from "next/image"

const WhyUs = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      {/* Heading  */}
      <h1 className='font-dm-sans font-bold text-center text-[34px] mt-32 lg:mt-0 lg:text-[56px] my-8 '>Why Choose <span className="text-[#5D26FF]">Looprail?</span> </h1>

      {/* subheading  */}
      <p className="font-fustat text-gray-700 -mt-2 mb-8 text-center mx-auto text-[16px] lg:text-[22px] lg:w-[50%]">
        Looprail isn’t just another wallet, it’s the bridge between Africa’s economy
        and the rest of the world. We make moving, spending, and accepting money
        across borders feel as simple as paying locally.
      </p>

      {/* grid items  */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mt-12">
        {/* card  */}
        <div className="flex flex-col lg:text-left text-center">
          <Image src={'/stability.png'} alt='stablecoin wallet stability' width={600} height={100} />
          <h2 className="font-dm-sans font-bold text-[30px] my-3">Built On Stability</h2>
          <p className="font-fustat text-gray-600">Your funds are stored in stablecoins like USDC and USDT, so they retain their value no matter where you go. Low volatilty, better rates.</p>
        </div>
        <div className="flex flex-col lg:text-left text-center">
          <Image src={'/utility.png'} alt='local utility with global access' width={600} height={100} />
          <h2 className="font-dm-sans font-bold text-[30px] my-3">Local Utility, Global Access</h2>
          <p className="font-fustat text-gray-600">Looprail turns digital dollars into local spending power. Pay in shops, book hotels, or send to local banks — all from one wallet.</p>
        </div>
        <div className="flex flex-col lg:text-left text-center">
          <Image src={'/security.png'} alt='secure cryptocurrency transactions' width={600} height={100} />
          <h2 className="font-dm-sans font-bold text-[30px] my-3">Security You Can Trust</h2>
          <p className="font-fustat text-gray-600">Protected by blockchain security and verified KYC processes. Your money stays yours, no custodial risk or unclear intermediaries.</p>
        </div>
        <div className="flex flex-col lg:text-left text-center">
          <Image src={'/transfer.png'} alt='instant money transfers' width={600} height={100} />
          <h2 className="font-dm-sans font-bold text-[30px] my-3">Instant, Transparent Transfers</h2>
          <p className="font-fustat text-gray-600">No hidden fees or long wait times. Transactions settle in seconds, with full visibility from sender to receiver.</p>
        </div>
      </div>
    </section>
  )
}

export default WhyUs