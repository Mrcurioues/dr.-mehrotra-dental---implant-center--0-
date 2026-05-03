import { CheckCircle, XCircle, Clock, Search, Filter, Mail, Phone, Calendar as CalendarIcon, AlertCircle, LayoutList, Calendar, ChevronRight, LogOut, StickyNote, Save } from 'lucide-react';
import { Appointment } from '../types';
import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameDay, 
  addMonths, 
  subMonths,
  isToday
} from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';

interface AdminPageProps {
  appointments: Appointment[];
  onUpdateStatus: (id: string, status: 'confirmed' | 'cancelled') => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onLogout: () => void;
}

export default function AdminPage({ appointments, onUpdateStatus, onUpdateNotes, onLogout }: AdminPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [confirmDialog, setConfirmDialog] = useState<{ id: string; status: 'confirmed' | 'cancelled' } | null>(null);
  const [editingNotes, setEditingNotes] = useState<{ [key: string]: string }>({});

  // Fuse.js Fuzzy Search Configuration
  const fuse = useMemo(() => {
    return new Fuse(appointments, {
      keys: [
        'id',
        'patientName',
        'email',
        'phone',
        'date',
        'service'
      ],
      threshold: 0.3, // Lower is stricter, higher is fuzzier
      ignoreLocation: true,
      minMatchCharLength: 2
    });
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    let result = appointments;

    // Apply Fuzzy Search
    if (searchTerm.trim()) {
      const fuseResults = fuse.search(searchTerm);
      result = fuseResults.map(res => res.item);
    }

    // Apply Status Filter
    if (filter !== 'all') {
      result = result.filter(app => app.status === filter);
    }

    return result;
  }, [appointments, fuse, searchTerm, filter]);

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
  };

  const handleUpdate = () => {
    if (confirmDialog) {
      onUpdateStatus(confirmDialog.id, confirmDialog.status);
      setConfirmDialog(null);
    }
  };

  const handleSaveNotes = (id: string) => {
    onUpdateNotes(id, editingNotes[id]);
  };

  // Calendar Logic
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-6 md:space-y-0 text-center md:text-left">
          <div>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2 font-display">Clinic Schedule</h1>
              <button 
                onClick={onLogout}
                className="p-3 text-gray-400 hover:text-red-500 hover:bg-white rounded-xl transition-all shadow-sm group"
                title="Logout"
              >
                <LogOut size={20} className="group-hover:scale-110" />
              </button>
            </div>
            <p className="text-gray-600 font-medium">Overview and management of all patient bookings.</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
            {/* View Mode Toggle */}
            <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 w-full md:w-auto overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  viewMode === 'list' ? 'bg-brand-blue text-white shadow-lg' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <LayoutList size={18} />
                <span>List View</span>
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  viewMode === 'calendar' ? 'bg-brand-blue text-white shadow-lg' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Calendar size={18} />
                <span>Calendar</span>
              </button>
            </div>

            <div className="flex space-x-6 bg-white px-8 py-3 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-center">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total</div>
                <div className="text-xl font-bold text-gray-900 leading-none">{stats.total}</div>
              </div>
              <div className="w-[1px] h-8 bg-gray-100 self-center" />
              <div className="text-center">
                <div className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest mb-1">Pending</div>
                <div className="text-xl font-bold text-gray-900 leading-none">{stats.pending}</div>
              </div>
              <div className="w-[1px] h-8 bg-gray-100 self-center" />
              <div className="text-center">
                <div className="text-[10px] font-bold text-green-500 uppercase tracking-widest mb-1">Done</div>
                <div className="text-xl font-bold text-gray-900 leading-none">{stats.confirmed}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters/Search (List View Only) */}
        {viewMode === 'list' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-gray-200/50 mb-8 border border-gray-50 flex flex-col lg:flex-row gap-6"
          >
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search by ID, name, email, phone, date, or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-brand-blue focus:shadow-md focus:shadow-brand-blue/10 focus:bg-white rounded-2xl transition-all outline-none font-medium"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center space-x-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest shrink-0">
                <Filter size={14} />
                <span>Filter Status:</span>
              </div>
              <div className="flex bg-gray-50 p-1 rounded-xl w-full sm:w-auto">
                {(['all', 'pending', 'confirmed', 'cancelled'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`flex-1 sm:flex-none px-5 py-2.5 text-xs font-bold rounded-lg transition-all capitalize ${
                      filter === f ? 'bg-white text-brand-blue shadow-md' : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Content Display */}
        {viewMode === 'list' ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredAppointments.length === 0 ? (
              <div className="bg-white rounded-[3rem] p-32 text-center border-2 border-dashed border-gray-100">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-200">
                  <CalendarIcon size={48} />
                </div>
                <h3 className="text-3xl font-extrabold text-gray-900 mb-3 font-display">No Results Found</h3>
                <p className="text-gray-500 max-w-sm mx-auto">We couldn't find any appointments matching your search criteria. Try a different term or clear filters.</p>
              </div>
            ) : (
              filteredAppointments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((app) => (
                <motion.div
                  key={app.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border-2 transition-all ${
                    app.status === 'confirmed' ? 'border-green-100 hover:border-green-200' : 
                    app.status === 'cancelled' ? 'border-red-100 hover:border-red-200' : 'border-transparent hover:border-brand-blue/10'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="flex items-start md:items-center gap-8">
                      <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center shrink-0 shadow-lg ${
                        app.status === 'confirmed' ? 'bg-green-100 text-green-600 shadow-green-100' :
                        app.status === 'cancelled' ? 'bg-red-100 text-red-600 shadow-red-100' : 'bg-brand-light text-brand-blue shadow-brand-light'
                      }`}>
                        {app.status === 'confirmed' ? <CheckCircle size={40} /> :
                         app.status === 'cancelled' ? <XCircle size={40} /> : <Clock size={40} />}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-4 mb-2">
                          <h3 className="text-2xl font-extrabold text-gray-900">{app.patientName}</h3>
                          <span className="bg-gray-100 text-gray-400 px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-tighter">#{app.id?.slice(0, 8)}</span>
                          {app.isSynced && (
                            <span className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold">
                              <Save size={10} />
                              Synced to Sheet
                            </span>
                          )}
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] border ${
                            app.status === 'confirmed' ? 'bg-green-50 border-green-200 text-green-600' :
                            app.status === 'cancelled' ? 'bg-red-50 border-red-200 text-red-600' : 'bg-yellow-50 border-yellow-200 text-yellow-600'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-500 font-semibold">
                          <div className="flex items-center gap-2 group cursor-pointer hover:text-brand-blue transition-colors">
                            <Mail size={16} className="text-brand-blue/40 group-hover:text-brand-blue transition-colors" />
                            <span>{app.email}</span>
                          </div>
                          <div className="flex items-center gap-2 group cursor-pointer hover:text-brand-blue transition-colors">
                            <Phone size={16} className="text-brand-blue/40 group-hover:text-brand-blue transition-colors" />
                            <span>{app.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-brand-blue/40" />
                            <span className="opacity-75">Booked on {format(new Date(app.createdAt), 'MMM dd, h:mm a')}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-10 lg:border-l lg:pl-12 border-gray-100">
                      <div className="text-center md:text-right">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Service</div>
                        <div className="text-brand-blue font-bold text-lg">{app.service}</div>
                      </div>
                      <div className="text-center md:text-right min-w-[140px]">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Reserved Time</div>
                        <div className="text-gray-900 font-bold text-lg">{app.date} <br className="hidden md:block" /> {app.time}</div>
                      </div>
                      
                      {app.status === 'pending' && (
                        <div className="flex gap-3">
                          <button
                            onClick={() => setConfirmDialog({ id: app.id!, status: 'confirmed' })}
                            className="bg-green-500 hover:bg-green-600 text-white px-7 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-green-500/30 transition-all active:scale-95"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setConfirmDialog({ id: app.id!, status: 'cancelled' })}
                            className="bg-white border-2 border-red-50 text-red-500 hover:bg-red-500 hover:text-white px-7 py-3 rounded-2xl text-sm font-bold transition-all active:scale-95"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Internal Notes Section */}
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-2 mb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                      <StickyNote size={14} className="text-brand-blue" />
                      <span>Internal Notes</span>
                    </div>
                    <div className="relative group">
                      <textarea
                        defaultValue={app.notes || ''}
                        onChange={(e) => setEditingNotes({ ...editingNotes, [app.id!]: e.target.value })}
                        placeholder="Add patient history, allergies, or follow-up details..."
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-blue focus:bg-white rounded-2xl p-5 text-sm font-medium transition-all min-h-[100px] outline-none resize-none"
                      />
                      <button
                        onClick={() => handleSaveNotes(app.id!)}
                        disabled={editingNotes[app.id!] === undefined}
                        className={`absolute bottom-4 right-4 shadow-lg px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                          editingNotes[app.id!] !== undefined 
                            ? 'bg-brand-blue text-white opacity-100' 
                            : 'bg-white text-gray-300 opacity-0 group-hover:opacity-100 group-hover:text-brand-blue'
                        }`}
                      >
                        <Save size={14} />
                        <span>Save Notes</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden"
          >
            {/* Calendar Controls */}
            <div className="px-10 py-8 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between bg-gray-50/50 gap-6">
              <div className="flex items-center gap-6">
                <h2 className="text-3xl font-extrabold text-gray-900 font-display">
                  {format(currentMonth, 'MMMM yyyy')}
                </h2>
                <div className="flex bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                    className="p-3 hover:bg-gray-50 text-gray-400 hover:text-brand-blue transition-all border-r border-gray-100"
                  >
                    <ChevronRight size={20} className="rotate-180" />
                  </button>
                  <button
                    onClick={() => setCurrentMonth(new Date())}
                    className="px-6 py-2 text-xs font-bold text-brand-blue hover:bg-brand-light transition-all border-r border-gray-100"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                    className="p-3 hover:bg-gray-50 text-gray-400 hover:text-brand-blue transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-[10px] font-bold text-green-700 uppercase">Confirmed</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-light rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-brand-blue" />
                  <span className="text-[10px] font-bold text-brand-blue uppercase">Pending</span>
                </div>
              </div>
            </div>

            {/* Week Labels */}
            <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/30">
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                <div key={day} className="py-5 text-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                  <span className="hidden sm:inline">{day}</span>
                  <span className="sm:hidden">{day.substring(0, 3)}</span>
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7">
              {calendarDays.map((day, idx) => {
                const dayAppointments = appointments.filter(app => isSameDay(new Date(app.date), day));
                const isCurrentMonth = isSameDay(startOfMonth(day), startOfMonth(currentMonth));
                
                return (
                  <div
                    key={idx}
                    className={`min-h-[160px] p-3 border-r border-b border-gray-50 transition-colors group relative overflow-hidden ${
                      !isCurrentMonth ? 'bg-gray-50/30' : 'bg-white hover:bg-gray-50/50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className={`text-base font-bold transition-all ${
                        isToday(day) 
                          ? 'w-9 h-9 bg-brand-blue text-white rounded-xl flex items-center justify-center shadow-lg shadow-brand-blue/30 scale-110' 
                          : isCurrentMonth ? 'text-gray-900 group-hover:text-brand-blue' : 'text-gray-200'
                      }`}>
                        {format(day, 'd')}
                      </span>
                      {dayAppointments.length > 0 && isCurrentMonth && (
                        <span className="text-[10px] font-bold text-brand-blue bg-white border border-brand-blue/10 px-2.5 py-1 rounded-full shadow-sm">
                          {dayAppointments.length} Bookings
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-1.5">
                      {dayAppointments.slice(0, 3).map((app) => (
                        <motion.div
                          initial={{ x: -5, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          key={app.id}
                          className={`px-3 py-1.5 rounded-xl text-[10px] font-bold truncate transition-all shadow-sm flex items-center gap-2 ${
                            app.status === 'confirmed' ? 'bg-green-500/10 text-green-700' :
                            app.status === 'cancelled' ? 'bg-red-500/10 text-red-700' : 'bg-brand-blue/10 text-brand-blue'
                          }`}
                          title={`${app.patientName} - ${app.service} at ${app.time}`}
                        >
                          <span className="opacity-50 text-[9px]">{app.time}</span>
                          <span>{app.patientName.split(' ')[0]}</span>
                        </motion.div>
                      ))}
                      {dayAppointments.length > 3 && (
                        <div className="pt-1 text-[9px] text-center text-gray-400 font-bold uppercase tracking-widest cursor-default">
                          + {dayAppointments.length - 3} more
                        </div>
                      )}
                    </div>

                    {/* Today indicator line */}
                    {isToday(day) && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-brand-blue" />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmDialog && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmDialog(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl max-w-md w-full text-center border border-gray-100"
            >
              <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-xl ${
                confirmDialog.status === 'confirmed' ? 'bg-green-100 text-green-600 shadow-green-100' : 'bg-red-100 text-red-600 shadow-red-100'
              }`}>
                <AlertCircle size={48} />
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900 mb-4 font-display">
                Confirm Update?
              </h3>
              <p className="text-gray-600 mb-12 text-lg leading-relaxed">
                Are you sure you want to <span className={confirmDialog.status === 'confirmed' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                  {confirmDialog.status === 'confirmed' ? 'confirm' : 'cancel'}
                </span> this patient appointment? A notification will be logged.
              </p>
              <div className="grid grid-cols-2 gap-5">
                <button
                  onClick={() => setConfirmDialog(null)}
                  className="px-8 py-5 rounded-[1.5rem] bg-gray-50 text-gray-500 font-bold hover:bg-gray-100 hover:text-gray-900 transition-all active:scale-95 border border-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className={`px-8 py-5 rounded-[1.5rem] text-white font-bold transition-all active:scale-95 shadow-xl ${
                    confirmDialog.status === 'confirmed' ? 'bg-green-500 hover:bg-green-600 shadow-green-500/40' : 'bg-red-500 hover:bg-red-600 shadow-red-500/40'
                  }`}
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
