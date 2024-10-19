import React from 'react';

const LeftSidebar = () => {
  const components = [
    { id: 'header', title: 'Header' },
    { id: 'paragraph', title: 'Paragraph' },
    { id: 'image', title: 'Image' },
    { id: 'button', title: 'Button' },
  ];

  return (
    <div className="w-1/4 p-6 bg-gray-100 shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Available Components</h3>
      {components.map(component => (
        <div 
          key={component.id} 
          className="my-2 p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          draggable
        >
          <span className="font-medium text-gray-800">{component.title}</span>
        </div>
      ))}
    </div>
  );
};

export default LeftSidebar;
