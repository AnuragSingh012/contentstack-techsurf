import React, { useState } from 'react';
import LeftSidebar from './LeftSidebar';
import Canvas from './Canvas';
import RightSidebar from './RightSidebar';

const UiBuilder = () => {
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const importComponents = (data) => {
    const sections = Object.keys(data.content.sections).map((key) => ({
      id: key,
      type: key,
      title: data.content.sections[key].title || '',
      description: data.content.sections[key].description || '',
      styles: data.visuals.sections[key]?.styles || {},
    }));

    setComponents(sections);
  };

  const updateComponent = (updatedComponent) => {
    setComponents((prevComponents) =>
      prevComponents.map((component) =>
        component.id === updatedComponent.id ? updatedComponent : component
      )
    );
    setSelectedComponent(updatedComponent);
  };

  return (
    <div className="flex h-screen">
      <LeftSidebar />
      <Canvas
        components={components}
        setComponents={setComponents}
        selectComponent={setSelectedComponent}
      />
      <RightSidebar 
        selectedComponent={selectedComponent} 
        importComponents={importComponents} 
        updateComponent={updateComponent} 
      />
    </div>
  );
};

export default UiBuilder;
