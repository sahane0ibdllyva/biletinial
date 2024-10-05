// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import filmyorumData from '../data/filmyorum.json';

// const FilmYorum = ({ movieId, venueName }) => {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [newRating, setNewRating] = useState(0);
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (filmyorumData?.comments?.movies) {
//       const movieComments = filmyorumData.comments.movies.filter(
//         (comment) => comment.movie_id === movieId && comment.venue_name === venueName
//       );
//       setComments(movieComments);
//     }
//   }, [movieId, venueName]);

//   const handleCommentSubmit = () => {
//     const loggedInUser = localStorage.getItem('loggedInUser');
//     if (!loggedInUser) {
//       navigate('/signin'); // Redirect to sign-in if not logged in
//       return;
//     }

//     if (newRating < 1 || newRating > 5) {
//       setErrorMessage('Please provide a rating between 1 and 5 stars.');
//       return;
//     }

//     if (newComment.trim() === '') {
//       setErrorMessage('Please provide a comment.');
//       return;
//     }

//     const newCommentObj = {
//       movie_id: movieId,
//       venue_name: venueName,
//       comment: newComment,
//       rating: newRating,
//     };

//     const updatedComments = [...comments, newCommentObj];
//     setComments(updatedComments);

//     setNewComment('');
//     setNewRating(0);
//     setErrorMessage('');
//   };

//   return (
//     <div>
//       <h3>Comments</h3>
//       <ul>
//         {comments.map((comment, index) => (
//           <li key={index}>
//             {comment.comment} - {comment.rating} stars at {comment.venue_name}
//           </li>
//         ))}
//       </ul>

//       <h4>Submit your comment and rating</h4>
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//       <div>
//         <textarea
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Write your comment"
//         />
//         <div>
//           <label>Rating: </label>
//           <select value={newRating} onChange={(e) => setNewRating(Number(e.target.value))}>
//             <option value={0}>Select rating</option>
//             {[1, 2, 3, 4, 5].map((num) => (
//               <option key={num} value={num}>
//                 {num} Stars
//               </option>
//             ))}
//           </select>
//         </div>
//         <button onClick={handleCommentSubmit}>Submit</button>
//       </div>
//     </div>
//   );
// };

// export default FilmYorum;











import React, { useState, useEffect } from 'react';

const FilmYorum = ({ movieTitle, venueName }) => {
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:7000/comments')
      .then(response => response.json())
      .then(data => setComments(data));
  }, []);

  const handleCommentSubmit = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('userLoggedIn'));
    if (!loggedInUser) {
      alert('Please sign in to submit a comment.');
      window.location.href = '/signin';
      return;
    }

    const commentData = {
      user_name: loggedInUser.name,
      title: movieTitle,
      venue_name: venueName,
      comment: newComment,
      rating: newRating,
    };

    fetch('http://localhost:7000/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    })
    .then(response => response.json())
    .then(data => {
      setComments([...comments, commentData]);  // Update the comments locally
      setNewComment('');
      setNewRating(0);
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h4>Submit a Comment</h4>
      <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
      <select value={newRating} onChange={(e) => setNewRating(Number(e.target.value))}>
        <option value={0}>Select Rating</option>
        {[1, 2, 3, 4, 5].map(star => (
          <option key={star} value={star}>{star} Stars</option>
        ))}
      </select>
      <button onClick={handleCommentSubmit}>Submit</button>

      <h4>Comments</h4>
      {comments.map((comment, index) => (
        <div key={index}>
          <p>{comment.user_name}: {comment.comment}</p>
          <p>Rating: {comment.rating}</p>
        </div>
      ))}
    </div>
  );
};

export default FilmYorum;
