import React, { useRef, useEffect } from "react";

function Sidebar({ isOpen, onClose, children }) {
  const sidebarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: isOpen ? 0 : "-400px",
        width: 400,
        height: "100%",
        background: "#fff",
        boxShadow: isOpen ? "-2px 0 8px rgba(0,0,0,0.2)" : "none",
        transition: "right 0.3s",
        zIndex: 1000,
        overflowY: "auto"
      }}
      ref={sidebarRef}
    >
      <button style={{float: 'right', margin: 10}} onClick={onClose}>Zamknij</button>
      <div style={{padding: 20}}>
        {children}
      </div>
    </div>
  );
}

export default Sidebar; 