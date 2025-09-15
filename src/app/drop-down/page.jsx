'use client'
import React, { useState } from 'react';
import Dropdown from './writing';

const App = () => {
  const [selectedFruit, setSelectedFruit] = useState(null);

  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'mango', label: 'Mango' },
  ];

  const handleFruitChange = (option) => {
    setSelectedFruit(option);
    console.log('Selected fruit:', option);
  };

  return (
    <div style={{ padding: '50px' }}>
      <h1>Select a Fruit</h1>
      <Dropdown
        options={options}
        placeholder="Choose your favorite fruit..."
        onChange={handleFruitChange}
      />
      {selectedFruit && (
        <p style={{ marginTop: '20px' }}>
          Your choice: <strong>{selectedFruit.label}</strong>
        </p>
      )}
    </div>
  );
};

export default App;