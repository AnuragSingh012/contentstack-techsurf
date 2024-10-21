import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import UiBuilder from './components/UiBuilder';

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <UiBuilder />
    </DndProvider>
  );
};

export default App;
