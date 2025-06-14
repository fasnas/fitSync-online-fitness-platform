import React from "react";
import {  Routes, Route } from "react-router-dom";
import Navbar from "./Components/LandingPage/Navbar"
import Home from "./Components/LandingPage/Home";
import Services from "./Components/LandingPage/Service"
import Trainers from "./Components/LandingPage/Trainers";
import Blog from "./Components/LandingPage/Blog";
import Contact from "./Components/LandingPage/Contact"
import Signup from "./Register/Singup";
import Login from "./Register/Login";
import UserLayout from "./Components/User/Home/Layout";
import UserHome from "./Components/User/Home/Home";
import Notifications from "./Components/User/Home/Notification";
import UserTrainers from "./Components/User/Trainers/Trainers";
import MyPlan from "./Components/User/Plan/Myplan";
import Profile from "./Components/User/Home/Profile";
import UserChatSection from "./Components/User/Home/Chat";
import TrainerDetails from "./Components/User/Trainers/TrainerDetiles";
import BookingPage from "./Components/User/Booking/Booking";
import ProtectedRoute from "./Components/ProtectedRoute"
import CoachLayout from "./Components/Coach/Layout/Layout";
import CoachDashboard from "./Components/Coach/Home/CoachHome";
import SessionsPage from "./Components/Coach/Session/Session";
import ClientManagement from "./Components/Coach/ClientMananage/Client";
import PaymentManagement from "./Components/Coach/Payment/Payment";
import NotificationPage from "./Components/Coach/Notification/Notification";
// import CoachSchedulePage from "./Components/Coach/Shedue/Shedule";
import PlanDetiles from "./Components/User/Plan/PlanDetiles";
import AdminSessionPage from "./Components/Coach/Session/SpecifiedPerson";
import Settings from "./Components/Coach/Settings/Settings";
import PaymentPage from "./Components/User/Payment/Payment";
// import VideoElement from "./vedioRoute";




const LandingPage = () => (
  <>
    <Navbar />
    <main className="pt-24 scroll-smooth">
      <section id="home">
        <Home />
      </section>
      <section id="service">
        <Services />
      </section>
      <section id="trainers">
        <Trainers />
      </section>
      <section id="blog">
        <Blog />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  </>
);

const App = () => {

  return (
    
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user" element={<ProtectedRoute><UserLayout /></ProtectedRoute>}>
        <Route index element={<UserHome />} />
        <Route path="/user/notification" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/user/trainers" element={<ProtectedRoute><UserTrainers /></ProtectedRoute>} />
        <Route path="/user/trainers/detiles/:id" element={<ProtectedRoute><TrainerDetails /></ProtectedRoute>} />
        <Route path="/user/payment/:bookingId" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
        <Route path="/user/myplan" element={<ProtectedRoute><MyPlan /></ProtectedRoute>} />
        <Route path="/user/myplan/:id" element={<ProtectedRoute><PlanDetiles /></ProtectedRoute>} />
        <Route path="/user/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/user/chat" element={<UserChatSection />} />
        <Route path="/user/trainers/booking/:id" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
        {/* <Route path="/user/trainers/checkout/:id/" element={<CheckoutPage />} /> */}
      </Route>
      
      <Route path="/coach" element={<ProtectedRoute><CoachLayout /></ProtectedRoute>}>
        <Route index element={<CoachDashboard />} />
        <Route path="/coach/sessions" element={<ProtectedRoute><SessionsPage /></ProtectedRoute>} />
        <Route path="/coach/sessions/:id" element={<ProtectedRoute><AdminSessionPage /></ProtectedRoute>} />
        <Route path="/coach/clients" element={<ProtectedRoute><ClientManagement /></ProtectedRoute>} />
        <Route path="/coach/payment" element={<ProtectedRoute><PaymentManagement /></ProtectedRoute>} />
        <Route path="/coach/notification" element={<ProtectedRoute><NotificationPage/></ProtectedRoute>} />
        <Route path="/coach/settings" element={<ProtectedRoute><Settings/></ProtectedRoute>} />

      </Route>
       {/* <Route
        path="/user/videocall/:roomId"
        element={
          <ProtectedRoute>
            <VideoElement />
          </ProtectedRoute>
        }
      /> */}
    </Routes>
    
  );
};

export default App;
