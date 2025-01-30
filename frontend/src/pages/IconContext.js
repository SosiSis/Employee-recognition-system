import React, { createContext, useState } from 'react';

const IconContext = createContext();

function IconProvider({ children }) {
  const [clickedIcon, setClickedIcon] = useState(false);

  const handleIconClick = () => {
    setClickedIcon(true);
  };

  return (
    <IconContext.Provider value={{ clickedIcon, handleIconClick }}>
      {children}
    </IconContext.Provider>
  );
}

export { IconContext, IconProvider };