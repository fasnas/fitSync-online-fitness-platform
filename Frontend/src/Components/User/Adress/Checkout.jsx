// import React, { useState, useContext } from 'react';
// import { useParams } from 'react-router-dom';
// import { UserContext } from '../../Context/UserContext';

// const CheckoutPage = () => {
//   const { id, planType } = useParams(); // Destructure id and planType from URL params
//   console.log(id)
//   const { coaches } = useContext(UserContext); // Get coaches from UserContext

//   // Extract the coach array (handle case where coaches is an object)
//   const coachArray = coaches?.coach || coaches || [];

//   // Find the trainer by _id from the coach array
//   const trainer = coachArray.find((t) => t._id === id);

//   // Get the selected plan price and clean it to a number
//   const selectedPrice = trainer?.pricing[planType];
//   const originalPrice = Number(selectedPrice?.replace(/[^0-9]/g, '')) || 0;

//   const [coupon, setCoupon] = useState('');
//   const [couponApplied, setCouponApplied] = useState(false);
//   const [couponDiscount, setCouponDiscount] = useState(0);
//   const [address, setAddress] = useState({
//     label: 'Home',
//     full: '',
//     phone: '',
//   });
//   const [showAddressForm, setShowAddressForm] = useState(false);

//   const applyCoupon = () => {
//     if (coupon.toLowerCase() === 'fit10') {
//       setCouponDiscount(originalPrice * 0.1); // 10% discount
//       setCouponApplied(true);
//     } else {
//       setCouponDiscount(0);
//       setCouponApplied(false);
//       alert('Invalid coupon');
//     }
//   };

//   const handleAddressSubmit = (e) => {
//     e.preventDefault();
//     setShowAddressForm(false);
//   };

//   const totalToPay = originalPrice - couponDiscount;

//   if (!coachArray.length) {
//     return <div className="p-6 text-center text-red-500">No coaches available.</div>;
//   }

//   if (!trainer) {
//     return <div className="p-6 text-center text-red-500">Trainer not found.</div>;
//   }

//   if (!selectedPrice) {
//     return <div className="p-6 text-center text-red-500">Invalid plan type.</div>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow mt-8">
//       {/* Trainer Info */}
//       <div className="flex items-center gap-4 border-b pb-4">
//         <img
//           src={trainer.image || 'https://via.placeholder.com/80'} // Fallback image
//           alt={trainer.name}
//           className="w-20 h-20 rounded-full object-cover border-2"
//         />
//         <div>
//           <h2 className="text-xl font-semibold">{trainer.name}</h2>
//           <span className="text-sm bg-yellow-500 text-white px-2 py-0.5 rounded">
//             {trainer.specialty || 'Fitness Coach'} {/* Fallback specialty */}
//           </span>
//           <div className="text-yellow-400 mt-1">
//             {'★'.repeat(Math.floor(trainer.rating || 4))} {/* Fallback rating */}
//           </div>
//         </div>
//       </div>

//       {/* Plan Details */}
//       <div className="mt-6">
//         <h3 className="text-lg font-bold capitalize">{planType.replace(/([A-Z])/g, ' $1')} Plan</h3>
//         <p className="text-gray-600">Price: ₹{originalPrice}</p>
//       </div>

//       {/* Billing Summary */}
//       <div className="mt-6 border-t pt-4 space-y-3">
//         <div className="flex justify-between">
//           <span>Package Amount</span>
//           <span className="text-green-600">₹{originalPrice}</span>
//         </div>
//         <div className="flex justify-between">
//           <span>Coupon Discount</span>
//           <span className="text-red-600">- ₹{couponDiscount.toFixed(2)}</span>
//         </div>
//         <div className="flex gap-3 mt-2">
//           <input
//             type="text"
//             className="border px-3 py-2 rounded w-full"
//             placeholder="Enter coupon code (e.g. FIT10)"
//             value={coupon}
//             onChange={(e) => setCoupon(e.target.value)}
//           />
//           <button
//             className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
//             onClick={applyCoupon}
//             disabled={couponApplied}
//           >
//             {couponApplied ? 'Applied' : 'Apply'}
//           </button>
//         </div>
//         <hr />
//         <div className="flex justify-between font-bold text-lg">
//           <span>Total To Pay</span>
//           <span>₹{totalToPay.toFixed(2)}</span>
//         </div>
//       </div>

//       {/* Address Section */}
//       <div className="mt-6 border-t pt-4">
//         <h4 className="font-semibold mb-3">Billing Address</h4>

//         {showAddressForm ? (
//           <form onSubmit={handleAddressSubmit} className="space-y-3">
//             <input
//               type="text"
//               className="border px-3 py-2 rounded w-full"
//               placeholder="Label (e.g. Home)"
//               value={address.label}
//               onChange={(e) => setAddress({ ...address, label: e.target.value })}
//               required
//             />
//             <textarea
//               className="border px-3 py-2 rounded w-full"
//               placeholder="Full Address"
//               value={address.full}
//               onChange={(e) => setAddress({ ...address, full: e.target.value })}
//               required
//             />
//             <input
//               type="tel"
//               className="border px-3 py-2 rounded w-full"
//               placeholder="Phone Number"
//               value={address.phone}
//               onChange={(e) => setAddress({ ...address, phone: e.target.value })}
//               required
//             />
//             <div className="flex gap-2 justify-end">
//               <button type="button" onClick={() => setShowAddressForm(false)} className="text-gray-600">
//                 Cancel
//               </button>
//               <button type="submit" className="bg-black text-white px-4 py-2 rounded">
//                 Save
//               </button>
//             </div>
//           </form>
//         ) : (
//           <div className="border rounded-lg p-4 shadow w-full">
//             {address.full ? (
//               <>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm font-bold">{address.label}</span>
//                   <button onClick={() => setShowAddressForm(true)} className="text-blue-600 text-sm">
//                     Edit
//                   </button>
//                 </div>
//                 <p className="text-sm mt-2">{address.full}</p>
//                 <p className="text-sm mt-1">{address.phone}</p>
//               </>
//             ) : (
//               <button
//                 className="text-blue-600 underline text-sm"
//                 onClick={() => setShowAddressForm(true)}
//               >
//                 Add New Address
//               </button>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Payment Button */}
//       <div className="mt-6 flex justify-end">
//         <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-900">
//           Make Payment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;