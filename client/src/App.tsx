import './App.css';
import Canvas from './Components/Canvas';
import ToolbarContainer from './Components/Toolbar/ToolbarContainer';
import Updater from './Components/Updater';

function App() {
  return (
    <div className="App">
      <Canvas />
      <ToolbarContainer />
      <Updater />
    </div>
  );
}

export default App;
