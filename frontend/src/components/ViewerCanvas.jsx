import React from 'react';
import AnatomyCanvas from './AnatomyCanvas';

export default function ViewerCanvas() {
  return (
    <div className="w-full h-full relative canvas-container">
      <AnatomyCanvas />
    </div>
  );
}
