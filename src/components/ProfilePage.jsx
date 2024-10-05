// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const ProfilePage = () => {
//   const navigate = useNavigate();

//   const handleSignOut = () => {
//     localStorage.removeItem('loggedInUser'); // Clear user session
//     navigate('/#'); // Redirect to home page after sign out
//   };

//   return (
//     <div>
//       <h2>Profile Page</h2>
//       <button onClick={handleSignOut}>Sign Out</button>
//     </div>
//   );
// };

// export default ProfilePage;




import React from 'react';

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem('userLoggedIn'));

  const handleSignOut = () => {
    localStorage.removeItem('userLoggedIn');
    alert('Signed out!');
    window.location.href = '/';
  };

  return (
    <div>
      <h2>Profile Page</h2>
      {user ? (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <p>Please sign in to view your profile.</p>
      )}
    </div>
  );
};

export default ProfilePage;
