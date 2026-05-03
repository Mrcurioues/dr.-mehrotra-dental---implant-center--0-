import { useState, FormEvent } from 'react';
import { Smile, Lock, User, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginPageProps {
  onLogin: (status: boolean) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simple demo credentials: admin / password123
    if (username === 'admin' && password === 'password123') {
      onLogin(true);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl p-10 md:p-12 border border-gray-100"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-brand-blue rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-brand-blue/20">
            <Smile size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 font-display">Staff Login</h2>
          <p className="text-gray-500 mt-2 font-medium">Please enter your credentials to access the dashboard.</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-bold border border-red-100"
          >
            <AlertCircle size={20} />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <User size={18} />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-brand-blue focus:bg-white rounded-2xl outline-none transition-all font-medium"
                placeholder="admin"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Lock size={18} />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-brand-blue focus:bg-white rounded-2xl outline-none transition-all font-medium"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-blue text-white py-5 rounded-2xl text-lg font-bold hover:bg-brand-dark shadow-xl shadow-brand-blue/30 transition-all transform hover:translate-y-[-2px] active:scale-95"
          >
            Access Dashboard
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
            Smile Bright Staff Only
          </p>
        </div>
      </motion.div>
    </div>
  );
}
