// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const Conversations = () => {
// //   const { userId } = useParams();
// //   const [conversation, setConversation] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // Fetch conversation data based on the userId
//   useEffect(() => {
// //     const fetchConversationData = async () => {
// //       try {
// //         //const response = await fetch(`YOUR_API_ENDPOINT/${userId}`);
// //         if (!response.ok) {
// //           throw new Error("Failed to fetch conversation data");
// //         }
// //         const data = await response.json();
// //         setConversation(data);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error("Error fetching conversation data:", error);
// //         setLoading(false);
//       }
    // };

// //     fetchConversationData();
// //   }, [userId]);

// //   if (loading) {
// //     return <div>Loading...</div>;
// //   }

// //   return (
//     <div>
//       <Navbar />
//       <h1>Conversation with User {userId}</h1>
//       <div>
//         {conversation.map((message) => (
//           <div key={message.id}>
//             <p>{message.sender}: {message.content}</p>
//           </div>
//         ))}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Conversations;