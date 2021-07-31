import React from "react";
import "./FAB.css";

function FAB({ addNew }) {
  return (
    <div className="position-fixed bottom-0 end-0 translate-middle me-lg-3 mb-lg-3 me-0 mb-0">
      <button
        className="btn btn-lg btn-primary rounded-circle"
        onClick={addNew}
      >
        <i className="bi bi-plus-lg"></i>
      </button>
    </div>
  );
}

export default FAB;
