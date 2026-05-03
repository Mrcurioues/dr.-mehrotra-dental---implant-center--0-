import { motion } from 'motion/react';
import { SERVICES } from '../constants';
import * as LucideIcons from 'lucide-react';
import { ChevronRight } from 'lucide-react';

export default function Services() {
  return (
    <section className="py-24 bg-brand-blue relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Our Dental Services</h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
            We offer a wide range of dental services to ensure your teeth are healthy and your smile is beautiful. Explore our expert treatments below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const IconComponent = (LucideIcons as any)[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2.5rem] p-8 shadow-xl hover:shadow-2xl transition-all group"
              >
                <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center text-brand-blue mb-8 group-hover:scale-110 transition-transform duration-300">
                  {IconComponent && <IconComponent size={32} />}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {service.description}
                </p>
                <button className="flex items-center space-x-2 text-brand-blue font-bold hover:space-x-4 transition-all">
                  <span>Learn More</span>
                  <ChevronRight size={18} />
                </button>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-8 py-3 rounded-full font-bold transition-all backdrop-blur-sm">
            View All Services
          </button>
        </div>
      </div>
    </section>
  );
}
