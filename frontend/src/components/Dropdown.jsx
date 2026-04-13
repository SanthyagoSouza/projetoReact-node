import { useState } from "react";

function Dropdown({ titulo, children }) {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="dropdown">
      <button className="dropdown-btn" onClick={() => setAberto(!aberto)}>
        {titulo}
      </button>

      {aberto && <div className="dropdown-content">{children}</div>}
    </div>
  );
}

export default Dropdown;
