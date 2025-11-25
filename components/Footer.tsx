import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className=" py-12 px-4 font-fustat" data-aos="fade-up">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div data-aos="fade-up" data-aos-delay="100">
          <Image src={'/logo.png'} alt='looprail logo' width={160} height={130} />
          <p className="mt-4 text-gray-600">
            The stablecoin wallet for Africa&#39;s connected diaspora.
          </p>
        </div>
        
        <div data-aos="fade-up" data-aos-delay="200">
          <h3 className="font-dm-sans font-bold text-lg mb-4">Product</h3>
          <ul className="space-y-2">
            <li><Link href="#features" className="text-gray-600 hover:text-[#5D26FF]">Features</Link></li>
            <li><Link href="#how-it-works" className="text-gray-600 hover:text-[#5D26FF]">How It Works</Link></li>
            <li><Link href="#why-us" className="text-gray-600 hover:text-[#5D26FF]">Why Looprail</Link></li>
          </ul>
        </div>
        
        <div data-aos="fade-up" data-aos-delay="300">
          <h3 className="font-dm-sans font-bold text-lg mb-4">Company</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="text-gray-600 hover:text-[#5D26FF]">About Us</Link></li>
            <li><Link href="#" className="text-gray-600 hover:text-[#5D26FF]">Careers</Link></li>
            <li><Link href="#" className="text-gray-600 hover:text-[#5D26FF]">Contact</Link></li>
          </ul>
        </div>
        
        <div data-aos="fade-up" data-aos-delay="400">
          <h3 className="font-dm-sans font-bold text-lg mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="text-gray-600 hover:text-[#5D26FF]">Privacy Policy</Link></li>
            <li><Link href="#" className="text-gray-600 hover:text-[#5D26FF]">Terms of Service</Link></li>
            <li><Link href="#" className="text-gray-600 hover:text-[#5D26FF]">Compliance</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-300 text-center text-gray-600" data-aos="fade-up" data-aos-delay="500">
        <p>© {new Date().getFullYear()} Looprail. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer