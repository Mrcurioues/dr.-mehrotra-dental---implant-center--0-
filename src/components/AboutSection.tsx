import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export default function AboutSection() {
  const stats = [
    { label: 'Total Branches', value: '25+' },
    { label: 'Years Experience', value: '12+' },
    { label: 'Satisfied Patients', value: '16k+' },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden bg-brand-light relative z-10">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800&h=800"
                alt="Our Clinic"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Absolute element for "12+ Experience" */}
            <div className="absolute -bottom-8 -right-8 bg-brand-blue text-white p-8 rounded-[2rem] shadow-2xl z-20">
              <div className="text-4xl font-extrabold mb-1">12+</div>
              <div className="text-sm font-medium opacity-90 uppercase tracking-widest">Years of Trust</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-8">
              A Legacy of <br />
              <span className="text-brand-blue">Trusted Dental Care</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Located in the heart of Hazratganj, our practice was established in 1954 by Dr. Prakash Narayan Mehrotra. For over 60 years, we have been providing cutting-edge dental care for the City of Nawabs. Currently led by Dr. Nikhil Mehrotra, we offer complete dental solutions with a focus on precision and comfort.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {[
                'State-of-the-art Technology',
                'Expert Dental Professionals',
                'Comfortable & Relaxing Setting',
                'Personalized Treatment Plans'
              ].map((item) => (
                <div key={item} className="flex items-center space-x-3 group">
                  <CheckCircle2 className="text-brand-blue group-hover:scale-125 transition-transform" />
                  <span className="font-semibold text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-100">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-extrabold text-brand-blue mb-1">{stat.value}</div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
