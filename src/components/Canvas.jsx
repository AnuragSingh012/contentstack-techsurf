import React from 'react';

const Canvas = ({ components, setComponents, selectComponent }) => {
  return (
    <div className="flex-1 p-6 overflow-auto bg-gray-50">
      {components.map((component) => (
        <div 
          key={component.id} 
          onClick={() => selectComponent(component)} 
          className={`my-4 p-4 transition-all duration-200 cursor-pointer ${component.styles.textColor} 
            border border-transparent ${component.selected ? 'border-2 border-blue-500' : ''} 
            hover:border-2 hover:border-blue-500 ${component.styles.background}`} // Keep the default background class
          style={{ 
            fontSize: component.fontSize ? `${component.fontSize}px` : '16px', 
            color: component.fontColor || 'black', 
            fontWeight: component.fontWeight || 'normal', 
            textDecoration: component.textDecoration || 'none',
            backgroundColor: component.backgroundColor || undefined // Use custom background color if provided
          }}
        >
          <h2 className={`${component.styles.titleStyle} font-semibold`}>{component.title}</h2>
          {component.description && <p className={`${component.styles.descriptionStyle} mt-2`}>{component.description}</p>}
        </div>
      ))}
    </div>
  );
};

export default Canvas;
