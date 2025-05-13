import React, { useEffect, useState,useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../AxiosInstance";
import { UserContext } from "../../Context/UserContext";


const PaymentPage = () => {
  const{fetchBookings}=useContext(UserContext)
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    const initiatePayment = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axiosInstance.post(`/b/initiate`, { bookingId, }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data)

        const { orderId, keyId, amount, currency } = res.data;


        const success = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");
        if (!success) {
          setError("Failed to load Razorpay");
          return;
        }

        const options = {
            key: keyId,
            amount,
            currency,
            name: "Fit Connect",
            description: "Session Booking Payment",
            order_id: orderId,
          handler: async function (response) {
            try {
              const verifyRes = await axiosInstance.post("/b/verify", {
                bookingId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              await fetchBookings()
              if (verifyRes.data.success) {
                navigate("/user/myplan");
              } else {
                setError("Payment verification failed");
              }
            } catch (err) {
              console.error(err);
              setError("Verification error");
            }
          },
          theme: {
            color: "#22c55e",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Payment initiation failed");
      } finally {
        setLoading(false);
      }
    };

    initiatePayment();
  }, [bookingId, navigate]);

  if (loading) {
    return <div className="p-6 text-center">Loading payment gateway...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        {error}
        <button onClick={() => navigate("/user")} className="block mt-4 text-blue-600 underline">
          Go back
        </button>
      </div>
    );
  }

  return null; // Razorpay UI will open directly
};

export default PaymentPage;
