// tokenController.js
// import { StreamClient } from '@stream-io/node-sdk';
// import dotenv from 'dotenv';
// dotenv.config();

// const streamClient = new StreamClient(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET);

// export const getToken = (req, res) => {
//   const { userId } = req.body;
//   console.log("aasqw",userId)
//   const token = streamClient.createToken({ user_id: userId });

//   res.json({ token, apiKey: process.env.STREAM_API_KEY });
// };
