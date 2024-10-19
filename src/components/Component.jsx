// Component.jsx
import React from 'react';

const Component = ({ component, selectComponent }) => {
  const handleClick = () => {
    selectComponent(component);
  };

  const style = {
    fontSize: component.fontSize ? `${component.fontSize}px` : '16px',
    color: component.fontColor || 'black',
    fontWeight: component.fontWeight || 'normal',
    textDecoration: component.textDecoration || 'none',
  };

  switch (component.type) {
    case 'header':
      return <h1 style={style} className="cursor-pointer" onClick={handleClick}>{component.text}</h1>;
    case 'paragraph':
      return <p style={style} className="cursor-pointer" onClick={handleClick}>{component.text}</p>;
    case 'image':
      return <img src="path/to/image.jpg" alt="Example" className="cursor-pointer" onClick={handleClick} />;
    case 'button':
      return <button style={style} className="cursor-pointer" onClick={handleClick}>{component.text}</button>;
    default:
      return null;
  }
};

export default Component;
