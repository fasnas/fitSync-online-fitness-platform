// import { useStreamVideoClient, StreamCall, CallControls } from '@stream-io/video-react-sdk';
// import { useEffect, useState } from 'react';

// function VideoRoom({ roomId }) {
//   const client = useStreamVideoClient();
//   const [call, setCall] = useState(null);

//   useEffect(() => {
//     if (!client) return;
//     const newCall = client.call('default', roomId);
//     newCall.join();
//     setCall(newCall);
//     return () => newCall.leave();
//   }, [client, roomId]);

//   if (!call) return <div>Joining...</div>;
//   return (
//     <StreamCall call={call}>
//       <CallControls />
//     </StreamCall>
//   );
// }
// export default VideoRoom;


import React from 'react'

const vedioRoom = () => {
  return (
    <div>
      
    </div>
  )
}

export default vedioRoom
