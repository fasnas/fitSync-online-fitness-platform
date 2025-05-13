import React, { useState, useContext } from 'react';
import moment from 'moment';
import { CoachContext } from '../../Context/CoachContext';

const PaymentManagement = () => {
  const { bookedUsers } = useContext(CoachContext);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Map bookedUsers to payments
  const payments = bookedUsers
    ? bookedUsers.map(booking => ({
        id: booking._id,
        client: booking.user?.name || 'Unknown',
        amount: booking.paymentDetails?.amount || 0,
        date: booking.validity?.start
          ? new Date(booking.validity.start).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        dueDate: booking.validity?.start
          ? moment(booking.validity.start).add(30, 'days').format('YYYY-MM-DD')
          : moment().add(30, 'days').format('YYYY-MM-DD'),
        status: booking.paymentStatus || 'unknown',
        method: 'Razorpay',
        invoiceId: `INV-${booking._id.slice(0, 8)}`,
        paymentDetails: booking.paymentDetails || {},
      }))
    : [];

  // Calculate stats
  const totalPayment = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const thisMonthPayment = payments
    .filter(payment => moment(payment.date).isSame(moment(), 'month'))
    .reduce((sum, payment) => sum + payment.amount, 0);

  const stats = [
    { title: 'Total Payment', value: `₹${totalPayment.toLocaleString()}` },
    { title: 'This Month Payment', value: `₹${thisMonthPayment.toLocaleString()}` },
  ];

  const getStatusColor = (status) => {
    return status === 'success' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="pl-64 pt-16 min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Payment Management</h1>
        <p className="text-sm text-gray-500 mt-1">Track and manage all client payments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-5 rounded-xl shadow">
            <p className="text-sm text-gray-500">{stat.title}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* List View */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Client</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Due Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No payments found
                </td>
              </tr>
            ) : (
              payments.map(payment => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-indigo-600">{payment.client[0]}</span>
                      </div>
                      {payment.client}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">₹{payment.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">{moment(payment.date).format('MMM D, YYYY')}</td>
                  <td className="px-6 py-4">{moment(payment.dueDate).format('MMM D, YYYY')}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => setSelectedPayment(payment)}
                      className="text-indigo-600 hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Payment Details Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-og-blur flex items-center justify-center z-50 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Client</p>
                <p className="font-medium">{selectedPayment.client}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-medium">₹{selectedPayment.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Date</p>
                <p className="font-medium">
                  {moment(selectedPayment.date).format('MMM D, YYYY')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Due Date</p>
                <p className="font-medium">
                  {moment(selectedPayment.dueDate).format('MMM D, YYYY')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedPayment.status)}`}>
                  {selectedPayment.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium">{selectedPayment.method}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-medium">{selectedPayment.paymentDetails.razorpay_order_id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment ID</p>
                <p className="font-medium">{selectedPayment.paymentDetails.razorpay_payment_id}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Signature</p>
                <p className="font-mono text-xs bg-gray-100 p-2 rounded">
                  {selectedPayment.paymentDetails.razorpay_signature}
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                onClick={() => setSelectedPayment(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentManagement;
