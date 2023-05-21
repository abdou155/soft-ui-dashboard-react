import React from 'react';

const SelectDropdown = () => {
  const selectStyles = {
    position: 'relative',
    display: 'inline-block',
    width: '460px',
    height: '40px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    overflow: 'hidden',
    border: '1px solid #ccc',
  };

  const dropdownStyles = {
    width: '100%',
    height: '100%',
    padding: '10px',
    border: 'none',
    background: 'transparent',
    fontSize: '16px',
    color: '#333',
    cursor: 'pointer',
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    console.log('Selected value:', selectedValue);
  };

  return (
    <div style={selectStyles}>
      <select style={dropdownStyles} onChange={handleSelectChange}>
        <option value="" selected disabled>Select an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>
  );
};

export default SelectDropdown;
