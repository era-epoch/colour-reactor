import Canvas from './Components/Canvas';
import EpilepsyWarning from './Components/EpilepsyWarning';
import MainMenu from './Components/MainMenu';
import ToolbarContainer from './Components/ToolbarContainer';
import Tooltip from './Components/Tooltip';
import Updater from './Components/Updater';

function App() {
  return (
    <div className="App">
      <Canvas />
      <ToolbarContainer />
      <Updater />
      <MainMenu />
      <EpilepsyWarning />
      <Tooltip />
    </div>
  );
}

export default App;
