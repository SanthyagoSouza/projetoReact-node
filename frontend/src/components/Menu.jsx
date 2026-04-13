import { menu } from "../data/menu";
import { Link, useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario")) || {};

  const permissoesPorRole = {
    USUARIO: ["carros"],
    GERENCIAL: ["carros", "financeiro"],
    MASTER: ["carros", "financeiro", "usuarios"],
  };

  const permissoes = permissoesPorRole[usuario.role] || [];

  const logout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <i className="fas fa-cogs"></i>
          <span>Admin Panel</span>
        </div>
      </div>

      <div className="user-profile">
        <div className="user-avatar">
          <i className="fas fa-user"></i>
        </div>
        <div className="user-info">
          <h3>{usuario.nome || "Usuário"}</h3>
          <p>{usuario.role || "Sem cargo"}</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menu.map((secao, index) => {
          if (secao.permissao && !permissoes.includes(secao.permissao)) {
            return null;
          }

          return (
            <div key={index} className="nav-section">
              <div className="nav-section-title">{secao.secao}</div>

              {secao.itens.map((item, i) => (
                <div key={i} className="nav-item">
                  <Link to={item.rota} className="nav-link">
                    <i className={item.icone}></i>
                    <span>{item.nome}</span>
                  </Link>
                </div>
              ))}
            </div>
          );
        })}

        <div className="nav-section">
          <div className="nav-item">
            <button onClick={logout} className="nav-button">
              <i className="fas fa-sign-out-alt"></i>
              <span>Sair</span>
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Menu;
