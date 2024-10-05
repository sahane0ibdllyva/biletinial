// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const SignUp = () => {
//   const [name, setName] = useState('');
//   const [surname, setSurname] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const navigate = useNavigate();

//   const isFormComplete = name && surname && email && password && confirmPassword;

//   const handleSignUp = () => {
//     if (password !== confirmPassword) {
//       alert('Passwords do not match!');
//       return;
//     }

//     const newUser = { name, surname, email, password };

//     // Simulate saving user data in localStorage (instead of users.json)
//     let users = JSON.parse(localStorage.getItem('users')) || [];
//     users.push(newUser);
//     localStorage.setItem('users', JSON.stringify(users));

//     // Redirect to sign-in page after registration
//     navigate('/signin');
//   };

//   return (
//     <div>
//       <h2>Sign Up</h2>
//       <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
//       <input type="text" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
//       <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
//       <button disabled={!isFormComplete || password !== confirmPassword} onClick={handleSignUp}>Sign Up</button>
//     </div>
//   );
// };

// export default SignUp;





import React, { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    tel: '',
    country: '',
    city: '',
    gender: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = () => {
    // Validation checks
    if (Object.values(formData).some(field => field === '')) {
      setErrorMessage('All fields are required.');
      return;
    }

    // Submit form
    fetch('http://localhost:3000/sign_up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      alert('Successfully signed up!');
      window.location.href = '/signin';  // Redirect to sign-in page
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      <input type="text" placeholder="Surname" onChange={(e) => setFormData({ ...formData, surname: e.target.value })} />
      <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      <input type="tel" placeholder="Telephone" onChange={(e) => setFormData({ ...formData, tel: e.target.value })} />
      <input type="text" placeholder="Country" onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
      <input type="text" placeholder="City" onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
      <input type="text" placeholder="Gender" onChange={(e) => setFormData({ ...formData, gender: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
      <button onClick={handleSignUp}>Sign Up</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default SignUp;
