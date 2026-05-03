import { motion } from 'motion/react';
import { TEAM } from '../constants';
import { Linkedin, Twitter, Facebook } from 'lucide-react';

export default function TeamSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Our Dental Team is Ready <br /> to Assist You</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Our team of expert dentists is committed to providing specialized care with a gentle touch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {TEAM.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group text-center"
            >
              <div className="relative mb-8 inline-block">
                <div className="absolute inset-0 bg-brand-light rounded-[3rem] rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                <img
                  src={member.image}
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  className="relative w-64 h-80 object-cover rounded-[3rem] shadow-xl group-hover:scale-105 transition-all duration-500 grayscale group-hover:grayscale-0"
                />
                <div className="absolute -bottom-4 right-4 flex space-x-2">
                  {[Linkedin, Twitter, Facebook].map((Icon, i) => (
                    <div key={i} className="w-10 h-10 bg-white shadow-lg rounded-xl flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-all cursor-pointer">
                      <Icon size={18} />
                    </div>
                  ))}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-brand-blue transition-colors">{member.name}</h3>
              <p className="font-semibold text-gray-500 uppercase tracking-widest text-xs">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
