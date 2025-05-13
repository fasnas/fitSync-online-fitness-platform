// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import User from "../models/userSchema.js";
// import Coach from "../models/coachSchema.js";

// // Initialize Google authentication
// const setupGoogleAuth = () => {
//   // Set up passport serialization/deserialization
//   passport.serializeUser((user, done) => done(null, user));
//   passport.deserializeUser((user, done) => done(null, user));

//   // Set up Google strategy
//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "/auth/google/callback",
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         try {
//           // Check if user exists in your database
//           const email = profile.emails && profile.emails[0]?.value;
          
//           if (!email) {
//             return done(null, false, { message: "No email found in Google profile" });
//           }
          
//           // First check in users collection
//           let user = await User.findOne({ email });
//           let role = "user";
          
//           // If not found in users, check in coaches collection
//           if (!user) {
//             user = await Coach.findOne({ email });
//             if (user) role = "coach";
//           }
          
//           // If user doesn't exist, create a new one
//           if (!user) {
//             // You can create a new user here or redirect to registration
//             // For now, we'll return the profile and handle account creation elsewhere
//             return done(null, { 
//               profile, 
//               isNew: true 
//             });
//           }
          
//           // Add role to user object
//           user = user.toObject();
//           user.role = role;
          
//           return done(null, user);
//         } catch (error) {
//           return done(error);
//         }
//       }
//     )
//   );
// };

// // Auth routes setup
// const setupAuthRoutes = (app) => {
//   // Google Auth route
//   app.get(
//     "/auth/google",
//     passport.authenticate("google", { scope: ["profile", "email"] })
//   );

//   // Google Auth callback
//   app.get(
//     "/auth/google/callback",
//     passport.authenticate("google", { 
//       failureRedirect: "/login",
//       failureMessage: true
//     }),
//     (req, res) => {
//       // If new user, redirect to complete registration
//       if (req.user.isNew) {
//         return res.redirect("/complete-registration");
//       }
      
//       // Otherwise redirect to dashboard or profile
//       res.redirect("/dashboard");
//     }
//   );

//   // Logout route
//   app.get("/logout", (req, res) => {
//     req.logout((err) => {
//       if (err) {
//         console.error("Error during logout:", err);
//       }
//       res.redirect("/");
//     });
//   });
// };

// export { setupGoogleAuth, setupAuthRoutes };


// import express from "express";
// import session from "express-session";
// import passport from "passport";
// import dotenv from "dotenv";
// import { setupGoogleAuth, setupAuthRoutes } from "./config/googleAuth.js";

// // Initialize environment variables
// dotenv.config();

// // Create Express app
// const app = express();

// // Set up middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Set up session
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "your-secret-key",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: process.env.NODE_ENV === "production", // Use secure cookies in production
//       maxAge: 24 * 60 * 60 * 1000 // 1 day
//     }
//   })
// );

// // Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session());

// // Set up Google Authentication
// setupGoogleAuth();

// // Set up authentication routes
// setupAuthRoutes(app);

// // Import and use your other routes
// import userRoutes from "./routes/userRoutes.js";
// import coachRoutes from "./routes/coachRoutes.js";
// // ...any other routes

// app.use("/api/users", userRoutes);
// app.use("/api/coaches", coachRoutes);
// // ...any other routes

// // Home route
// app.get("/", (req, res) => {
//   res.send(`
//     <h1>Welcome to Coaching App</h1>
//     <p>Please <a href="/auth/google">Login with Google</a></p>
//   `);
// });

// // Protected route example
// app.get("/dashboard", (req, res) => {
//   if (!req.isAuthenticated()) {
//     return res.redirect("/");
//   }
  
//   res.send(`
//     <h1>Welcome ${req.user.name || req.user.profile?.displayName || 'User'}</h1>
//     <p>Your email: ${req.user.email || req.user.profile?.emails?.[0]?.value || 'N/A'}</p>
//     <p>Your role: ${req.user.role || 'N/A'}</p>
//     <p><a href="/logout">Logout</a></p>
//   `);
// });

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });





// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import User from "../models/userSchema.js";
// import Coach from "../models/coachSchema.js";

// const setupGoogleAuth = () => {
//   passport.serializeUser((user, done) => done(null, user));
//   passport.deserializeUser((user, done) => done(null, user));

//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "/auth/google/callback",
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         try {
//           const email = profile.emails && profile.emails[0]?.value;
//           if (!email) return done(null, false, { message: "No email found" });

//           let user = await User.findOne({ email });
//           let role = "user";

//           if (!user) {
//             user = await Coach.findOne({ email });
//             if (user) role = "coach";
//           }

//           if (!user) {
//             return done(null, { profile, isNew: true });
//           }

//           user = user.toObject();
//           user.role = role;

//           return done(null, user);
//         } catch (error) {
//           return done(error);
//         }
//       }
//     )
//   );
// };

// export default setupGoogleAuth;