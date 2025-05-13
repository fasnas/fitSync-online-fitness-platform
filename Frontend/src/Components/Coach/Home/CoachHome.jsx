import React from 'react';
import CoachNavbar from './CoachNavbar';
import CoachSidebar from './CoachSidebar';
import { CoachContext } from '../../Context/CoachContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const CoachDashboard = () => {
  const navigate = useNavigate();
  const { bookedUsers, loading } = useContext(CoachContext);

  // Metrics
  const activeClients = bookedUsers?.length || 0;
  const totalRevenue = bookedUsers?.reduce((sum, booking) => sum + (booking.paymentDetails?.amount || 0), 0) || 0;
  const pendingPayments = bookedUsers?.filter(booking => booking.paymentStatus === 'pending').length || 0;

  // Format today's date
  const currentDate = new Date().toLocaleDateString();

  // Client data
  const clients = bookedUsers?.map(booking => ({
    id: booking._id,
    name: booking.user.name || 'Unknown',
    goal: booking.plan === 'oneMonth' ? 'One Month Plan' : booking.plan === 'threeMonths' ? 'Three Months Plan' : booking.plan || 'Custom Plan',
    status: booking.paymentStatus,
  })) || [];

  // Upcoming sessions
  const upcomingSessions = bookedUsers?.map(booking => {
    const startMinutes = parseInt(booking.slot.start.split(':')[0]) * 60 + parseInt(booking.slot.start.split(':')[1]);
    const endMinutes = parseInt(booking.slot.end.split(':')[0]) * 60 + parseInt(booking.slot.end.split(':')[1]);
    const durationMinutes = endMinutes - startMinutes;
    const duration = durationMinutes >= 60
      ? `${Math.floor(durationMinutes / 60)} hour${durationMinutes >= 120 ? 's' : ''}`
      : `${durationMinutes} minute${durationMinutes !== 1 ? 's' : ''}`;
    return {
      time: booking.slot.start,
      client: booking.user.name || 'Unknown',
      duration,
    };
  }) || [];

  // Program data
  const programs = [
    { program: 'One Month Plan', clients: bookedUsers?.filter(b => b.plan === 'oneMonth').length || 0 },
    { program: 'Three Months Plan', clients: bookedUsers?.filter(b => b.plan === 'threeMonths').length || 0 },
    { program: 'Six Months Plan', clients: bookedUsers?.filter(b => b.plan === 'sixMonths').length || 0 },
    { program: 'Annual Plan', clients: bookedUsers?.filter(b => b.plan === 'annual').length || 0 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CoachSidebar />
      <div className="flex-1 ml-64">
        <CoachNavbar />
        <main className="p-8 mt-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
            <p className="text-gray-600 mt-2">Last updated: {currentDate}</p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-500">
              <p className="text-sm text-gray-500">Active Clients</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{activeClients}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
              <p className="text-sm text-gray-500">Monthly Revenue</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">₹{totalRevenue}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
              <p className="text-sm text-gray-500">Pending Payments</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{pendingPayments}</p>
            </div>
          </div>

          {/* Client Management */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Client Management</h2>
                <button className="text-indigo-600 hover:text-indigo-700" onClick={() => navigate('/coach/clients')}>
                  View All →
                </button>
              </div>
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-4">Loading clients...</div>
                ) : clients.length === 0 ? (
                  <div className="text-center py-4">No clients found</div>
                ) : (
                  clients.map(client => (
                    <div key={client.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-indigo-600 font-medium">{client.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{client.name}</h3>
                          <p className="text-sm text-gray-600">{client.goal}</p>
                        </div>
                      </div>
                      <button
                        className={`px-3 py-1 text-sm rounded-full ${
                          client.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {client.status}
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Upcoming Sessions</h2>
                <button className="text-indigo-600 hover:text-indigo-700"
                  onClick={()=>navigate("/coach/sessions")}
                >View All →</button>
              </div>
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-4">Loading sessions...</div>
                ) : upcomingSessions.length === 0 ? (
                  <div className="text-center py-4">No upcoming sessions</div>
                ) : (
                  upcomingSessions.map((session, index) => (
                    <div key={index} className="p-4 border-l-4 border-indigo-500 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-gray-800">{session.time}</h3>
                          <p className="text-sm text-gray-600">{session.client}</p>
                        </div>
                        <p className="text-sm text-gray-600">{session.duration}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Program Overview */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Program Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {programs.map((program, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-gray-800">{program.program}</h3>
                  <p className="text-sm text-gray-600 mt-1">{program.clients} clients</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CoachDashboard;