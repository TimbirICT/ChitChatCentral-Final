// import React, { useState, useEffect } from 'react';
// import { useQuery, useMutation } from '@apollo/client';
// import { GET_MESSAGES, SEND_MESSAGE } from '../graphql/messages'; // Import GraphQL queries and mutations

// const Messages = () => {
//   // State for storing messages and current message input
//   const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // GraphQL query to fetch messages
//   const { data } = useQuery(GET_MESSAGES, {
//     onError: error => setError(error),
//     onCompleted: () => setLoading(false),
//     fetchPolicy: 'cache-and-network',
//   });

//   // GraphQL mutation to send a message
//   const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
//     onError: error => setError(error),
//     onCompleted: () => setLoading(false),
//   });

//   // Function to handle sending a message
//   const handleSendMessage = async () => {
//     if (messageInput.trim() !== '') {
//       setLoading(true);
//       setError(null);
//       try {
//         await sendMessageMutation({ variables: { content: messageInput } });
//         setMessageInput(''); // Clear message input after sending
//       } catch (error) {
//         setError(error);
//         setLoading(false);
//         console.error('Error sending message:', error);
//       }
//     }
//   };

//   // Effect to update messages when data changes
//   useEffect(() => {
//     if (data && data.messages) {
//       setMessages(data.messages);
//     }
//   }, [data]);

//   return (
//     <div>
//       {/* Render conversation UI with messages */}
//       <div className="conversation">
//         {loading ? (
//           <p>Loading messages...</p>
//         ) : error ? (
//           <p>Error fetching messages: {error.message}</p>
//         ) : (
//           messages.map(message => (
//             <div key={message.id} className="message">
//               <p>{message.content}</p>
//               {/* Render sender, timestamp, etc. */}
//             </div>
//           ))
//         )}
//       </div>

//       {/* Message input field and send button */}
//       <div className="message-input">
//         <input
//           type="text"
//           value={messageInput}
//           onChange={e => setMessageInput(e.target.value)}
//           placeholder="Type your message..."
//         />
//         <button onClick={handleSendMessage} disabled={loading}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Messages;