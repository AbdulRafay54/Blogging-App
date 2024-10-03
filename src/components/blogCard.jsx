// import React, { useState } from "react";

// function BlogCard({ title, description, userName }) {
//   const [showFull, setShowFull] = useState(false);

//   const toggleFullText = () => {
//     setShowFull(!showFull);
//   };

//   const truncatedDescription =
//     description.length > 100 ? description.substring(0, 90) + "..." : description;

//   return (
//     <div className="bg-gray-800 shadow-lg rounded-lg p-6 transition-shadow duration-300 transform hover:scale-105 flex flex-col justify-between">
//       <h2 className="text-2xl font-bold text-center text-teal-400 mb-2">{title}</h2>
//       <p className="text-white font-semibold text-center mb-4">
//         {showFull ? description : truncatedDescription}
//       </p>
//       {!showFull && description.length > 90 && (
//         <button onClick={toggleFullText} className="text-sky-400 font-semibold">
//           Read More
//         </button>
//       )}
//       {showFull && (
//         <button onClick={toggleFullText} className="text-sky-400 font-semibold">
//           Show Less
//         </button>
//       )}
//       <p className="text-sm text-center font-medium text-sky-400">By {userName}</p>
//     </div>
//   );
// }

// export default BlogCard;
