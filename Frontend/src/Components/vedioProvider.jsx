// import { StreamVideoClient, StreamVideoProvider } from '@stream-io/video-react-sdk';
// import axios from 'axios';
// import { useState, useEffect } from 'react';

// function VideoProvider({ userId, children }) {
//     console.log(userId)
//   const [client, setClient] = useState(null);

//   useEffect(() => {
//     async function fetchToken() {
//      const res = await axios.post('http://localhost:3009/api/video/token', { userId });
//       console.log(res)
//       const client = new StreamVideoClient({
//         apiKey: res.data.apiKey,
//         token: res.data.token,
//         user: { id: userId }
//       });
//       setClient(client);
//     }
//     fetchToken();
//   }, [userId]);

//   if (!client) return <div>Loading...</div>;
//   return <StreamVideoProvider client={client}>{children}</StreamVideoProvider>;
// }
// export default VideoProvider;



import React from 'react'

const vedioProvider = () => {
  return (
    <div>
      
    </div>
  )
}

export default vedioProvider
