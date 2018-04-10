import React from 'react';

const MainFeature = () => {
  const numOfGridItems = [1,2,3,4,5,6,7,8,9,10];

  return (
    <section className="pictureGrid">
      {
        numOfGridItems.map((val, index) => (
          <img
            key={`grid${index}`}
            src={`https://source.unsplash.com/random/200x${200 + index}`}
          />
        ))
      }
    </section>
  )
};

export default MainFeature;