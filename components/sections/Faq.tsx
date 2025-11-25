'use client'
import React, { useState } from 'react'

const Faq = () => {
  // Simple FAQ data
  const faqs = [
    {
      question: "How does Looprail work?",
      answer: "Looprail uses stablecoin technology to send money across borders instantly. Fund your wallet using a debit or credit card, google pay, apple pay or transfer from your bank account, enter the amount to send, and your recipient receives Nigerian Naira or stablecoins within minutes."
    },
    {
      question: "Do I need a crypto wallet?",
      answer: "Looprail uses stablecoins like USDC and USDT to enable instant, transparent transfers across borders. You can send money directly to friends, family, or merchants in Africa without traditional banking delays."
    },
    {
      question: "How long do transfer take?",
      answer: "Yes, Looprail is protected by blockchain security and verified KYC processes. Your funds are stored in stablecoins, retaining their value without volatility risks."
    },
    {
      question: "Is Looprail licensed and compliant?",
      answer: "Looprail currently supports sending and receiving money in 40+ countries, with a focus on connecting Africa to the rest of the world."
    },
    {
      question: "Which bank can i connect with?",
      answer: "Looprail currently supports sending and receiving money in 40+ countries, with a focus on connecting Africa to the rest of the world."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-16 px-4 lg:px-0">
      <h1 className='font-dm-sans font-bold leading-10 lg:leading-16 text-[36px] lg:text-[56px] mt-8 text-center'>Questions? We’ve got you covered.</h1>
      <p className="font-fustat text-[16px] lg:text-[23px] text-center mt-2 mb-16">
      Everything you need to know about banking with Looprail
      </p>
      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="bg-[#F5F5F5] rounded-xl overflow-hidden transition-all duration-300"
          >
            <button
              className="flex justify-between items-center w-full p-4 lg:p-6 text-left font-dm-sans font-bold text-[16px] lg:text-[20px] focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              <span>{faq.question}</span>
              <svg 
                className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-6 text-[14px] lg:text-[16px] font-fustat text-gray-600">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Faq