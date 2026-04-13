import { Link } from "react-router-dom";

function MenuItem({ nome, rota }) {
  return (
    <Link to={rota} className="menu-item">
      {nome}
    </Link>
  );
}

export default MenuItem;
