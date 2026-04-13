import { useState, useEffect } from "react";
import { login } from "../services/api";
import Alert from "../components/alert";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  const navigate = useNavigate();

  const fazerLogin = async () => {
    try {
      const dados = await login(email, senha); // 🔥 CORREÇÃO PRINCIPAL

      console.log("LOGIN RESPONSE:", dados); // debug (pode remover depois)

      // 🔒 proteção básica
      if (!dados.usuario) {
        throw new Error("Usuário inválido");
      }

      // 💾 salva usuário
      localStorage.setItem("usuario", JSON.stringify(dados.usuario));

      setMensagem(dados.mensagem || "Login realizado com sucesso");
      setTipoMensagem("success");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (erro) {
      setMensagem(erro.message || "Erro ao fazer login");
      setTipoMensagem("error");
    }
  };

  useEffect(() => {
    document.body.classList.add("auth-page");

    return () => {
      document.body.classList.remove("auth-page");
    };
  }, []);

  return (
    <div className="auth-container">
      <Alert mensagem={mensagem} tipo={tipoMensagem} />

      <div className="auth-card">
        <section className="auth-hero">
          <span className="auth-badge">Painel Administrativo</span>
          <h1>Organize sua operação em um só lugar.</h1>
          <p>
            Acompanhe clientes, veículos, financeiro e contratos com uma visão
            clara e atualizada.
          </p>

          <div className="auth-highlight-grid">
            <div className="auth-highlight">
              <i className="fa fa-bar-chart"></i>
              <div>
                <strong>Indicadores</strong>
                <span>Resumo diário do negócio</span>
              </div>
            </div>

            <div className="auth-highlight">
              <i className="fa fa-calendar-check-o"></i>
              <div>
                <strong>Planejamento</strong>
                <span>Alertas e tarefas rápidas</span>
              </div>
            </div>

            <div className="auth-highlight">
              <i className="fa fa-users"></i>
              <div>
                <strong>Equipe</strong>
                <span>Permissões centralizadas</span>
              </div>
            </div>
          </div>
        </section>

        <section className="auth-form">
          <div className="auth-form-header">
            <h2>Entrar no painel</h2>
            <p>Digite seus dados para continuar com segurança.</p>
          </div>

          <form
            className="auth-form-body"
            onSubmit={(e) => {
              e.preventDefault();
              fazerLogin();
            }}
          >
            <label htmlFor="login-user">Login</label>
            <div className="auth-input">
              <i className="fa fa-user"></i>
              <input
                id="login-user"
                type="email"
                placeholder="Digite seu email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <label htmlFor="login-password">Senha</label>
            <div className="auth-input">
              <i className="fa fa-lock"></i>
              <input
                id="login-password"
                type="password"
                placeholder="Digite sua senha"
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <button className="auth-submit" type="submit">
              Entrar
            </button>

            <div className="auth-footer">
              <span>Precisa de ajuda?</span>
              <a href="#">Recuperar acesso</a>
              <hr />
              <a href="#">Cadastre-se</a>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Login;
