import { useState, ChangeEvent, FormEvent } from 'react';
import { Calendar, Clock, User, Mail, Phone, ChevronRight } from 'lucide-react';
import { SERVICES } from '../constants';

interface BookingFormProps {
  onSubmit: (data: any) => void;
}

export default function BookingForm({ onSubmit }: BookingFormProps) {
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: SERVICES[0].title,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      setIsSuccess(true);
      setFormData({
        patientName: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        service: SERVICES[0].title,
      });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white p-12 rounded-[3rem] shadow-2xl text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-extrabold text-gray-900 mb-4">Request Sent!</h3>
        <p className="text-gray-600 mb-8 max-w-sm mx-auto">
          Thank you for choosing Smile Bright. Our team will contact you shortly to confirm your preferred time slot.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="bg-brand-blue text-white px-8 py-3 rounded-full font-bold hover:bg-brand-dark transition-all"
        >
          Book Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6 relative overflow-hidden">
      <div className="md:col-span-1">
        <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Patient Name</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <User size={18} />
          </div>
          <input
            required
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-brand-blue focus:bg-white rounded-2xl outline-none transition-all"
          />
        </div>
      </div>

      <div className="md:col-span-1">
        <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Email Address</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Mail size={18} />
          </div>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-brand-blue focus:bg-white rounded-2xl outline-none transition-all"
          />
        </div>
      </div>

      <div className="md:col-span-1">
        <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Phone Number</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Phone size={18} />
          </div>
          <input
            required
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 234 567 890"
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-brand-blue focus:bg-white rounded-2xl outline-none transition-all"
          />
        </div>
      </div>

      <div className="md:col-span-1">
        <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Service</label>
        <div className="relative">
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-4 bg-gray-50 border-2 border-transparent focus:border-brand-blue focus:bg-white rounded-2xl outline-none appearance-none transition-all font-medium text-gray-700"
          >
            {SERVICES.map((s) => (
              <option key={s.id} value={s.title}>{s.title}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
            <ChevronRight size={18} className="rotate-90" />
          </div>
        </div>
      </div>

      <div className="md:col-span-1">
        <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Preferred Date</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Calendar size={18} />
          </div>
          <input
            required
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-brand-blue focus:bg-white rounded-2xl outline-none transition-all"
          />
        </div>
      </div>

      <div className="md:col-span-1">
        <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Preferred Time</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Clock size={18} />
          </div>
          <input
            required
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-brand-blue focus:bg-white rounded-2xl outline-none transition-all"
          />
        </div>
      </div>

      <div className="md:col-span-2 pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-blue text-white py-5 rounded-2xl text-lg font-bold hover:bg-brand-dark shadow-xl shadow-brand-blue/30 transition-all transform hover:translate-y-[-2px] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Confirming with Google Sheets...
            </span>
          ) : (
            'Book Your Appointment Now'
          )}
        </button>
      </div>

      {/* Decorative accent */}
      <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-brand-blue rounded-full blur-2xl opacity-10" />
    </form>
  );
}
