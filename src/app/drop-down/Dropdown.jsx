'use client';
import React, { useState, useEffect, useRef } from 'react';
import './Dropdown.css'; // 引入一些基础样式

/* 
1. 沟通需求 (Clarifying Requirements)
"Before I start coding, I'd like to clarify the requirements for this dropdown component. My plan is to build a reusable component with the following features:

It will accept an array of options as a prop.

It will display a placeholder or the currently selected option.

Clicking the component will toggle the visibility of the options list.

When an option is selected, it will call an onChange callback function passed through props.

Crucially, clicking outside of the dropdown should close the options list. This is important for a good user experience.

Does that sound like a good starting point?"


3. 讲解思路 (Explaining the Logic)
"Okay, I've written the code. Let me walk you through my thought process.

Component Signature: My Dropdown component is designed to be reusable. It takes options for the list items, a placeholder, and an onChange callback to communicate the selected value back to the parent.

State Management (useState): I'm using two state variables:

isOpen is a boolean that controls the visibility of the dropdown list. It's toggled by the handleToggle function.

selectedLabel stores the text to be displayed in the header. It's initialized with the placeholder and updated when an option is clicked.

Handling Clicks Outside (useEffect and useRef): This is a key feature for good UX.

I attach a ref to the main container div of the dropdown. This gives me a persistent reference to its DOM node.

In a useEffect hook with an empty dependency array (so it only runs on mount and unmount), I add a mousedown event listener to the document.

The event handler, handleClickOutside, checks if the clicked element (event.target) is contained within the dropdown's DOM node (dropdownRef.current).

If the click is outside, I set isOpen to false.

Crucially, the useEffect returns a cleanup function that removes the event listener when the component unmounts. This is vital to prevent memory leaks.

Event Handling:

handleToggle simply flips the isOpen state.

handleOptionClick is called when a list item is clicked. It updates the selected label, calls the parent's onChange function with the entire option object, and closes the dropdown.

Rendering: The options list (<ul className="dropdown-list">) is conditionally rendered based on the isOpen state using the isOpen && ... pattern. I map over the options array to render each list item, making sure to provide a stable and unique key for each one."


4. 探讨扩展点 (Discussing Follow-ups)
"This is a solid foundation, but in a real-world application, we could enhance it further:

Accessibility (a11y): This is very important. I would improve accessibility by:

Using a <button> element for the header to make it focusable and announce its function to screen readers.

Adding ARIA attributes, such as aria-haspopup="listbox" on the button and aria-expanded={isOpen} to indicate the state.

Implementing keyboard navigation, allowing users to open the dropdown with Enter/Space, navigate options with arrow keys, and close it with the Escape key.

Controlled Component: Right now, the component manages its own selectedLabel state. We could make it a fully controlled component by accepting a value prop from the parent and lifting all selection state up. This gives the parent full control over the dropdown's state.

Advanced Features: We could add features like a search filter for long lists, animations for opening/closing, or support for multi-select."
*/

const Dropdown = ({ options, placeholder, onChange }) => {
  // State for controlling the dropdown's visibility
  const [isOpen, setIsOpen] = useState(false);
  // State for the currently selected option's label
  const [selectedLabel, setSelectedLabel] = useState(placeholder);

  // useRef to get a reference to the dropdown's container element
  const dropdownRef = useRef(null);

  // This useEffect handles the logic for closing the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the ref is attached and the click is outside the component, close it
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Empty dependency array means this effect runs only once on mount

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedLabel(option.label);
    onChange(option); // Notify the parent component of the change
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <div className="dropdown-header" onClick={handleToggle}>
        {selectedLabel}
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>&#9660;</span>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option) => (
            <li
              key={option.value}
              className="dropdown-item"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;