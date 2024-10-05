
// import React from 'react';
// import { Link } from 'react-router-dom';
// import HomeIcon from '@mui/icons-material/Home';
// import TheatersIcon from '@mui/icons-material/Theaters';
// import MusicNoteIcon from '@mui/icons-material/MusicNote';
// import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
// import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
// import FilterDramaIcon from '@mui/icons-material/FilterDrama';
// import './Navbar.css';
// import data from '../data/bilet.json'; // Assuming categories come from this data

// // Object mapping categories to MUI icons
// const iconMap = {
//   movies: <TheatersIcon />,
//   concerts: <MusicNoteIcon />,
//   theater: <FilterDramaIcon />,
//   sports: <SportsSoccerIcon />,
//   standup: <EmojiEmotionsIcon />,
//   operabale: <FilterDramaIcon />,
 
// };

// const Navbar = () => {
//   const digerPages = Object.keys(data.diger);

//   return (
//     <nav className="navbar">
//       <ul>
//         {Object.keys(data).map((category) => (
//           <li key={category}>
//             <Link to={`/${category}`}>
//               {/* {iconMap[category] || <HomeIcon />} Dynamically show icon */}
//               {category.charAt(0).toUpperCase() + category.slice(1)}
//             </Link>
//           </li>
//         ))}
//         <li className="dropdown">
//           <span> <HomeIcon /> Diger</span>
//           <ul className="dropdown-content">
//             {digerPages.length > 0 && digerPages.map(page => (
//               <li key={page}>
//                 <Link to={`/diger/${page}`}>
//                   {page.charAt(0).toUpperCase() + page.slice(1)}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </li>
//       </ul>
//       <div className="auth-buttons">
//         <Link to="/signin">Sign In</Link>
//         <Link to="/signup">Sign Up</Link>
//         <Link to="/profile">Profile</Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;










import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import TheatersIcon from '@mui/icons-material/Theaters';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import './Navbar.css';
import data from '../data/bilet.json';

// Object mapping categories to MUI icons
const iconMap = {
  movies: <TheatersIcon />,
  concerts: <MusicNoteIcon />,
  theater: <FilterDramaIcon />,
  sports: <SportsSoccerIcon />,
  standup: <EmojiEmotionsIcon />,
  operabale: <FilterDramaIcon />,
};

const Navbar = () => {
  const digerPages = Object.keys(data.diger);

  return (
    <nav className="navbar">
      <ul>
        {Object.keys(data).map((category) => (
          category !== 'diger' && (
            <li key={category}>
              <Link to={`/${category}`}>
                {iconMap[category] || <HomeIcon />}
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Link>
            </li>
          )
        ))}
        <li className="dropdown">
          <span>
            <HomeIcon /> Diger
          </span>
          <ul className="dropdown-content">
            {digerPages.length > 0 && digerPages.map((page) => (
              <li key={page}>
                <Link to={`/diger/${page}`}>
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <div className="auth-buttons">
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
