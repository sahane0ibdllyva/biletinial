// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const SignIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loggedInUser = localStorage.getItem('loggedInUser');
//     if (loggedInUser) {
//       alert('YOU HAVE ALREADY SIGNED IN'); // Display message
//       navigate('/profile'); // Redirect to Profile Page if already signed in
//     }
//   }, [navigate]);

//   const handleSignIn = () => {
//     const users = JSON.parse(localStorage.getItem('users')) || [];
//     const user = users.find((user) => user.email === email && user.password === password);

//     if (user) {
//       localStorage.setItem('loggedInUser', JSON.stringify(user));
//       navigate('/profile'); // Redirect to Profile Page after login
//     } else {
//       setErrorMessage('Invalid email or password. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h2>Sign In</h2>
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleSignIn}>Sign In</button>
//       <p>Don't have an account? <button onClick={() => navigate('/signup')}>Sign Up</button></p> {/* SignUp always visible */}
//     </div>
//   );
// };

// export default SignIn;












import React, { useState } from 'react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = () => {
    // Check if the email and password are correct
    fetch('http://localhost:3000/sign_up')
      .then(response => response.json())
      .then(data => {
        const user = data.find(user => user.email === email && user.password === password);
        if (user) {
          localStorage.setItem('userLoggedIn', JSON.stringify(user));
          alert('Signed in successfully!');
          window.location.href = '/profile'; // Redirect to profile page
        } else {
          setErrorMessage('Invalid email or password.');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h2>Sign In</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignIn}>Sign In</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default SignIn;
