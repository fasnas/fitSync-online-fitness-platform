import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { CoachContext } from '../../Context/CoachContext';

const ClientManagement = () => {
  const { bookedUsers } = useContext(CoachContext);
  const [clients, setClients] = useState([]);
  const [view, setView] = useState('table');

  useEffect(() => {
    if (bookedUsers?.length) {
      const transformed = bookedUsers.map(booking => ({
        id: booking._id,
        name: booking.user?.name || 'Unknown',
        email: booking.user?.email || 'N/A',
        age: booking.user?.age || 'N/A',
        gender: booking.user?.gender || 'N/A',
        height: booking.user?.height || 'N/A',
        weight: booking.user?.weight || 'N/A',
        bmi: booking.user?.bmi || 'N/A',
        joinDate: booking.validity?.start || booking.createdAt,
        plan: booking.plan === 'oneMonth' ? 'One Month Plan' : booking.plan === 'threeMonths' ? 'Three Months Plan' : booking.plan || 'Custom Plan',
        status: booking.paymentStatus === 'success' ? 'Active' : 'Pending',
        amount: booking.paymentDetails?.amount || 0,
        validityEnd: booking.validity?.end || 'N/A',
      }));
      setClients(transformed);
    }
  }, [bookedUsers]);

  const stats = [
    { title: 'Total Clients', value: clients.length },
    { title: 'Active Clients', value: clients.filter(c => c.status === 'Active').length },
    { title: 'Pending Payments', value: clients.filter(c => c.status === 'Pending').length },
  ];

  return (
    <div className="pl-64 pt-16 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Client Management</h1>
        <p className="text-sm text-gray-600 mt-2">View and manage client details and bookings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
          >
            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* View Toggle */}
      <div className="flex space-x-2 mb-6">
        
        <button
          onClick={() => setView('table')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            view === 'table'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
          }`}
        >
          Table View
        </button>
        <button
          onClick={() => setView('grid')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            view === 'grid'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
          }`}
        >
          Grid View
        </button>
      </div>

      {/* Grid View */}
      {view === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.length === 0 ? (
            <div className="col-span-3 text-center py-8 text-gray-500">No clients found</div>
          ) : (
            clients.map(client => (
              <div
                key={client.id}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 text-lg font-medium">{client.name[0].toUpperCase()}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                      <p className="text-sm text-gray-500 truncate max-w-xs">{client.email}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      client.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {client.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Plan</p>
                    <p className="font-medium text-gray-900">{client.plan}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Amount</p>
                    <p className="font-medium text-gray-900">₹{client.amount}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Joined</p>
                    <p className="font-medium text-gray-900">
                      {moment(client.joinDate).format('MMM D, YYYY')}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Valid Until</p>
                    <p className="font-medium text-gray-900">
                      {client.validityEnd === 'N/A'
                        ? 'N/A'
                        : moment(client.validityEnd).format('MMM D, YYYY')}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Age</p>
                    <p className="font-medium text-gray-900">{client.age}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Gender</p>
                    <p className="font-medium text-gray-900">{client.gender}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Height</p>
                    <p className="font-medium text-gray-900">{client.height} cm</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Weight</p>
                    <p className="font-medium text-gray-900">{client.weight} kg</p>
                  </div>
                  <div>
                    <p className="text-gray-500">BMI</p>
                    <p className="font-medium text-gray-900">{client.bmi}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Table View */}
      {view === 'table' && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 font-semibold">
                <tr>
                  <th className="px-6 py-4 text-left">Client</th>
                  <th className="px-6 py-4 text-left">Plan</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Amount</th>
                  <th className="px-6 py-4 text-left">Joined</th>
                  <th className="px-6 py-4 text-left">Valid Until</th>
                  <th className="px-6 py-4 text-left">Age</th>
                  <th className="px-6 py-4 text-left">Gender</th>
                  <th className="px-6 py-4 text-left">Height</th>
                  <th className="px-6 py-4 text-left">Weight</th>
                  <th className="px-6 py-4 text-left">BMI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {clients.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="px-6 py-4 text-center text-gray-500">
                      No clients found
                    </td>
                  </tr>
                ) : (
                  clients.map(client => (
                    <tr key={client.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                            <span className="text-indigo-600 font-medium">{client.name[0].toUpperCase()}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{client.name}</p>
                            <p className="text-xs text-gray-500 truncate max-w-xs">{client.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{client.plan}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            client.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {client.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">₹{client.amount}</td>
                      <td className="px-6 py-4">{moment(client.joinDate).format('MMM D, YYYY')}</td>
                      <td className="px-6 py-4">
                        {client.validityEnd === 'N/A'
                          ? 'N/A'
                          : moment(client.validityEnd).format('MMM D, YYYY')}
                      </td>
                      <td className="px-6 py-4">{client.age}</td>
                      <td className="px-6 py-4">{client.gender}</td>
                      <td className="px-6 py-4">{client.height} cm</td>
                      <td className="px-6 py-4">{client.weight} kg</td>
                      <td className="px-6 py-4">{client.bmi}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManagement;