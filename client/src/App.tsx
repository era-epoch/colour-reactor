import Canvas from './Components/Canvas';
import MainMenu from './Components/MainMenu';
import ToolbarContainer from './Components/ToolbarContainer';
import Updater from './Components/Updater';

function App() {
  return (
    <div className="App">
      <Canvas />
      <ToolbarContainer />
      <Updater />
      <MainMenu />
    </div>
  );
}

export default App;
