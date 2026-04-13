function Alert({ mensagem, tipo }) {
  if (!mensagem) return null;

  return (
    <div className={`auth-alert ${tipo}`}>
      <span>{mensagem}</span>
    </div>
  );
}

export default Alert;
