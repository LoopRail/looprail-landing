import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className='p-4 py-4 lg:py-8 flex justify-between items-center font-fustat'>
      <Link href="/">
        <Image src={'/logo.png'} alt='looprail logo' width={130} height={130} />
      </Link>
      <nav className="lg:flex gap-6 items-center hidden lg:text-lg text-md">
        <Link href="#features" className="hover:text-[#5D26FF] transition-colors">Features</Link>
        <Link href="#usecases" className="hover:text-[#5D26FF] transition-colors">Use Cases</Link>
        <Link href="#partnership" className="hover:text-[#5D26FF] transition-colors">Partnership</Link>
        <Link href="#community" className="hover:text-[#5D26FF] transition-colors">Community</Link>
      </nav>

      <button className="lg:p-3 p-1.5 bg-[#5D26FF] rounded-xl text-sm lg:text-md text-white hover:bg-[#4a1ce0] transition-colors">
        Join Waitlist
      </button>
    </header>
  )
}

export default Header