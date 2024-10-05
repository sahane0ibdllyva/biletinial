
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import data from '../data/bilet.json';
// import SeanslarSection from '../components/SeanslarSection';
// import './Modal.css'; // Import modal CSS
// import './DetailPage.css'; // Import the new detail page styles
// import FilmYorum from './FilmYorum';

// const DetailPage = () => {
//   const { category, id } = useParams();
//   const [item, setItem] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const fetchData = () => {
//       const foundItem = data[category]?.find(item => item.id === parseInt(id));
//       setItem(foundItem);
//       setLoading(false);
//     };

//     fetchData();
//   }, [category, id]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!item) {
//     return <p>No item found!</p>;
//   }

//   return (
//     <div className="detail-page">
//       <h1>{item.title}</h1>
//       <img src={item.poster} alt={item.title} />
//       <p>{item.fullDescription}</p>

//       {item.trailerLink && (
//         <button onClick={() => setShowModal(true)}>Fragman</button>
//       )}

//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <button className="close-modal" onClick={() => setShowModal(false)}>
//               X
//             </button>
//             <iframe
//               width="100%"
//               height="400"
//               src={item.trailerLink.replace('watch?v=', 'embed/')}
//               title="Fragman"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           </div>
//         </div>
//       )}

//       <SeanslarSection item={item} />

//       <FilmYorum movieId={item.id} venueName={item.venue_name} />
//     </div>
//   );
// };

// export default DetailPage;








// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import data from '../data/bilet.json';
// import SeanslarSection from '../components/SeanslarSection';
// import './DetailPage.css'; 
// import FilmYorum from './FilmYorum';

// const DetailPage = ({match}) => {
//   const { category, id } = useParams();
//   const [item, setItem] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);


//   const filmTitle = match.params.title;  // assuming title comes from URL
//   const filmCategory = 'Some Category';  // Replace with actual category or fetch dynamically


//   useEffect(() => {
//     const fetchData = () => {
//       const foundItem = data[category]?.find(item => item.id === parseInt(id));
//       setItem(foundItem);
//       setLoading(false);
//     };

//     fetchData();
//   }, [category, id]);

//   const scrollToSection = (sectionId) => {
//     document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!item) {
//     return <p>No item found!</p>;
//   }

//   return (
//     <div className="detail-page">
//       <div className="tabs">
//         <button onClick={() => scrollToSection('fullDescription')}>Detay</button>
//         <button onClick={() => scrollToSection('seanslar')}>Biletler</button>
//         <button onClick={() => scrollToSection('yorumlar')}>Yorumlar</button>
//         <button onClick={() => scrollToSection('galeri')}>Galeri</button>
//       </div>

//       <h1>{item.title}</h1>
//       <img src={item.poster} alt={item.title} />
      
//       <section id="fullDescription">
//         <p>{item.fullDescription}</p>
//       </section>

//       {item.trailerLink && (
//         <button onClick={() => setShowModal(true)}>Fragman</button>
//       )}
//     <button onClick={() => scrollToSection('seanslar')}>BiletiniAl</button>
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <button className="close-modal" onClick={() => setShowModal(false)}>
//               X
//             </button>
//             <iframe
//               width="100%"
//               height="400"
//               src={item.trailerLink.replace('watch?v=', 'embed/')}
//               title="Fragman"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           </div>
//         </div>
//       )}

//       <section id="seanslar">
//         <SeanslarSection item={item} />
//       </section>

//       <section id="yorumlar">
       
//       <FilmYorum filmTitle={filmTitle} category={filmCategory} />
//       </section>

//       <section id="galeri">
//         <h3>Galeri</h3>
//         <div className="gallery">
//           {item.galeri && Array.isArray(item.galeri) && item.galeri.length > 0 ? (
//             item.galeri.map((image, index) => (
//               <img key={index} src={image} alt={`Gallery Image ${index + 1}`} />
//             ))
//           ) : (
//             <p>No images available.</p>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default DetailPage;









import React, { useState, useEffect } from 'react'; 
import { useParams } from 'react-router-dom';  // Import useParams to get dynamic route parameters
import data from '../data/bilet.json';  // Import your JSON data
import SeanslarSection from '../components/SeanslarSection';
import './DetailPage.css'; 
import FilmYorum from './FilmYorum';

const DetailPage = () => {
  const { category, id, title } = useParams();  // use useParams to get the params from the URL
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      // Dynamically find the item based on category and id from the JSON data
      const foundItem = data[category]?.find(item => item.id === parseInt(id));
      setItem(foundItem);
      setLoading(false);
    };

    fetchData();
  }, [category, id]);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!item) {
    return <p>No item found!</p>;
  }

  return (
    <div className="detail-page">
      <div className="tabs">
        <button onClick={() => scrollToSection('fullDescription')}>Detay</button>
        <button onClick={() => scrollToSection('seanslar')}>Biletler</button>
        <button onClick={() => scrollToSection('yorumlar')}>Yorumlar</button>
        <button onClick={() => scrollToSection('galeri')}>Galeri</button>
      </div>

      <h1>{item.title}</h1>
      <img src={item.poster} alt={item.title} />
      
      <section id="fullDescription">
        <p>{item.fullDescription}</p>
      </section>

      {item.trailerLink && (
        <button onClick={() => setShowModal(true)}>Fragman</button>
      )}
      <button onClick={() => scrollToSection('seanslar')}>BiletiniAl</button>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowModal(false)}>
              X
            </button>
            <iframe
              width="100%"
              height="400"
              src={item.trailerLink.replace('watch?v=', 'embed/')}
              title="Fragman"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <section id="seanslar">
        <SeanslarSection item={item} />
      </section>

      <section id="yorumlar">
        <FilmYorum filmTitle={title} category={category} /> {/* Pass the title and category */}
      </section>

      <section id="galeri">
        <h3>Galeri</h3>
        <div className="gallery">
          {item.galeri && Array.isArray(item.galeri) && item.galeri.length > 0 ? (
            item.galeri.map((image, index) => (
              <img key={index} src={image} alt={`Gallery Image ${index + 1}`} />
            ))
          ) : (
            <p>No images available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default DetailPage;
