import { motion } from 'motion/react';
import { TESTIMONIALS } from '../constants';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-24 bg-brand-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8">What Patients Are Saying</h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              We take pride in our service and our patients' satisfaction is our ultimate goal. Join thousands of happy patients.
            </p>
            <div className="bg-brand-blue p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 flex items-center space-x-4">
                <div className="text-5xl font-extrabold">4.9</div>
                <div>
                  <div className="flex text-yellow-400 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <div className="text-sm font-bold opacity-80 uppercase tracking-widest">Average Rating</div>
                </div>
              </div>
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-[2.5rem] shadow-lg relative group"
              >
                <div className="absolute top-6 right-6 text-brand-blue/10 group-hover:text-brand-blue/20 transition-colors">
                  <Quote size={40} />
                </div>
                <div className="flex text-yellow-400 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 mb-8 italic leading-relaxed">
                  "{t.comment}"
                </p>
                <div className="flex items-center space-x-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-brand-light" />
                  <span className="font-bold text-gray-900">{t.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
