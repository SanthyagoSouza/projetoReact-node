import Menu from "../components/Menu";
 

function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <Menu />

      <div className="content">
        <h1>Dashboard 🚀</h1>
      </div>
    </div>
  );
}

export default Dashboard;
