import './App.css';
import MinecraftLauncher from './components/minecraft/MinecraftLauncher';
import MinecraftLogin from './components/minecraft/MinecraftLogin';

function App() {
  
  return (
    <div className="vh-100 w-100 container-md d-flex flex-column justify-content-center align-items-center">
        <h1>Forestblock Launcher</h1>
      <div className="d-flex gap-3">
        <MinecraftLauncher/>
        <MinecraftLogin/>
      </div>
    </div>
  );
}

export default App;
