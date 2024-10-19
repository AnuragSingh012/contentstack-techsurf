import React, { useEffect, useState } from 'react';

const RightSidebar = ({ selectedComponent, importComponents, updateComponent }) => {
  const [jsonOutput, setJsonOutput] = useState({});

  const handleImport = () => {
    const fetchedData = {
      content: {
        sections: {
          home: {
            title: "Welcome to Our Website",
            description: "Your go-to solution for all your needs",
          },
          about: {
            title: "About Us",
            description: "We are a passionate team dedicated to delivering top-notch services.",
          },
          services: {
            title: "Our Services",
            description: "Explore our wide range of services designed to meet your needs.",
          },
          blog: {
            title: "Latest Blog Posts",
            description: "Stay informed with our latest articles and insights.",
          },
        },
      },
      visuals: {
        sections: {
          home: { styles: { background: 'bg-blue-500', textColor: 'text-white', titleStyle: 'text-4xl', descriptionStyle: 'text-lg' } },
          about: { styles: { background: 'bg-gray-100', textColor: 'text-black', titleStyle: 'text-4xl', descriptionStyle: 'text-lg' } },
          services: { styles: { background: 'bg-gray-200', textColor: 'text-black', titleStyle: 'text-4xl', descriptionStyle: 'text-lg' } },
          blog: { styles: { background: 'bg-white', textColor: 'text-black', titleStyle: 'text-4xl', descriptionStyle: 'text-lg' } },
        },
      },
    };
    importComponents(fetchedData);
  };

  const handleFieldChange = (field, value) => {
    if (selectedComponent) {
      const updatedComponent = { ...selectedComponent, [field]: value };
      updateComponent(updatedComponent);
    }
  };

  // Update JSON output whenever selectedComponent changes
  useEffect(() => {
    if (selectedComponent) {
      setJsonOutput(selectedComponent);
    }
  }, [selectedComponent]);

  return (
    <div className="w-1/4 bg-white h-screen flex flex-col p-6 border-l border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Right Sidebar</h2>
      <button onClick={handleImport} className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors mb-4">
        Import Content
      </button>
      {selectedComponent && (
        <div className="mt-4 flex-grow overflow-y-auto">
          <h3 className="text-lg font-medium mb-2">Edit Component</h3>
          <input
            type="text"
            placeholder="Title"
            value={selectedComponent.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            className="border border-gray-300 rounded-lg p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Description"
            value={selectedComponent.description}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32" // Increased height for the textarea
          />
          <div className="mb-4">
            <label className="block text-sm font-medium">Font Size:</label>
            <input
              type="number"
              min="8"
              max="72"
              value={selectedComponent.fontSize || 16} // Default to 16px if not set
              onChange={(e) => handleFieldChange('fontSize', e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Font Color:</label>
            <input
              type="color"
              value={selectedComponent.fontColor || '#000000'} // Default to black if not set
              onChange={(e) => handleFieldChange('fontColor', e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Background Color:</label>
            <input
              type="color"
              value={selectedComponent.backgroundColor || '#ffffff'} // Default to white if not set
              onChange={(e) => handleFieldChange('backgroundColor', e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Font Weight:</label>
            <select
              value={selectedComponent.fontWeight || 'normal'}
              onChange={(e) => handleFieldChange('fontWeight', e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
              <option value="bolder">Bolder</option>
              <option value="lighter">Lighter</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Text Decoration:</label>
            <select
              value={selectedComponent.textDecoration || 'none'}
              onChange={(e) => handleFieldChange('textDecoration', e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="none">None</option>
              <option value="underline">Underline</option>
              <option value="line-through">Line Through</option>
            </select>
          </div>
        </div>
      )}
      {/* JSON Output Box */}
      <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50 flex-shrink-0 max-h-60 overflow-y-auto"> {/* Set a max height and make it scrollable */}
        <h3 className="text-lg font-medium mb-2">JSON Output</h3>
        <pre className="whitespace-pre-wrap">{JSON.stringify(jsonOutput, null, 2)}</pre>
      </div>
    </div>
  );
};

export default RightSidebar;
