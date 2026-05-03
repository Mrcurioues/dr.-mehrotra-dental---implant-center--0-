import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../constants';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore answers to your top dental questions here! We're here to help you achieve a healthier, happier smile with ease.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-light rounded-full z-0" />
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600&h=800"
                alt="Support"
                className="relative z-10 rounded-[3rem] shadow-2xl object-cover grayscale brightness-75"
              />
              <div className="absolute -bottom-8 -right-8 bg-brand-blue text-white p-8 rounded-[2rem] shadow-2xl z-20">
                <HelpCircle size={48} className="mb-4 opacity-50" />
                <div className="text-2xl font-bold">Have and <br /> Any Question?</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`border-2 rounded-[2rem] transition-all duration-300 overflow-hidden ${
                    isOpen ? 'border-brand-blue bg-brand-light/50' : 'border-gray-100 hover:border-brand-blue/30'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left"
                  >
                    <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-brand-blue' : 'text-gray-900'}`}>
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-brand-blue text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-8 pb-8 text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
