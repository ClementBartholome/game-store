import React, { useState } from "react";

function Collapse({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="collapse">
      <div className="collapse-header" onClick={handleToggle}>
        <h3>{title}</h3>
        <span className={`arrow ${isOpen ? "open" : "closed"}`}></span>
      </div>
      {isOpen && (
        <div className="collapse-content">
          <div className="specs">{content}</div>
        </div>
      )}
    </div>
  );
}

export default Collapse;
