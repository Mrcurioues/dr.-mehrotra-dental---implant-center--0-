import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import { Appointment } from './types';

export default function App() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load appointments from localStorage on start
  useEffect(() => {
    const saved = localStorage.getItem('smile_bright_appointments');
    if (saved) {
      setAppointments(JSON.parse(saved));
    }
  }, []);

  const addAppointment = async (newApp: Appointment) => {
    const freshApp = { ...newApp, id: Math.random().toString(36).substr(2, 9), createdAt: new Date().toISOString(), status: 'pending', isSynced: false };
    const initialUpdated = [...appointments, freshApp];
    setAppointments(initialUpdated);
    localStorage.setItem('smile_bright_appointments', JSON.stringify(initialUpdated));

    // Sync with Google Sheets via Backend
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(freshApp),
      });
      const result = await response.json();
      
      if (result.synced) {
        setAppointments(prev => prev.map(app => app.id === freshApp.id ? { ...app, isSynced: true } : app));
        // Update local storage too
        const finalApps = initialUpdated.map(app => app.id === freshApp.id ? { ...app, isSynced: true } : app);
        localStorage.setItem('smile_bright_appointments', JSON.stringify(finalApps));
      }
    } catch (error) {
      console.error('Failed to sync appointment with Google Sheets:', error);
    }
  };

  const updateAppointmentStatus = (id: string, status: 'confirmed' | 'cancelled') => {
    const updated = appointments.map(app => app.id === id ? { ...app, status } : app);
    setAppointments(updated);
    localStorage.setItem('smile_bright_appointments', JSON.stringify(updated));
  };

  const updateAppointmentNotes = (id: string, notes: string) => {
    const updated = appointments.map(app => app.id === id ? { ...app, notes } : app);
    setAppointments(updated);
    localStorage.setItem('smile_bright_appointments', JSON.stringify(updated));
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage onBook={addAppointment} />} />
            <Route 
              path="/admin" 
              element={
                isAuthenticated ? (
                  <AdminPage 
                    appointments={appointments} 
                    onUpdateStatus={updateAppointmentStatus}
                    onUpdateNotes={updateAppointmentNotes}
                    onLogout={() => setIsAuthenticated(false)}
                  />
                ) : (
                  <LoginPage onLogin={setIsAuthenticated} />
                )
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
