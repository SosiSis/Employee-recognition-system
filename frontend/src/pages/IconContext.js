import React, { createContext, useState } from 'react';

const IconContext = createContext();

function IconProvider({ children }) {
  const [clickedIcon, setClickedIcon] = useState(false);

  // Accept an optional boolean to explicitly set state, otherwise toggle
  const handleIconClick = (value) => {
    if (typeof value === 'boolean') setClickedIcon(value);
    else setClickedIcon((prev) => !prev);
  };

  return (
    <IconContext.Provider value={{ clickedIcon, handleIconClick }}>
      {children}
    </IconContext.Provider>
  );
}

export { IconContext, IconProvider };