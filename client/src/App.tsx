import { useDispatch } from 'react-redux';
import AlertElement from './Components/Alerts';
import Canvas from './Components/Canvas';
import CreditsDialogue from './Components/Dialogues/CreditsDialogue';
import EpilepsyWarning from './Components/Dialogues/EpilepsyWarning';
import PaletteDialogue from './Components/Dialogues/PaletteDialogue';
import SavePatternDialogue from './Components/Dialogues/SavePatternDialogue';
import ToolbarContainer from './Components/ToolbarContainer';
import Tooltip from './Components/Tooltip';
import Updater from './Components/Updater';

function App() {
  const dispatch = useDispatch();
  return (
    <div className="App">
      <Canvas />
      <ToolbarContainer />
      <Updater />
      <Tooltip />
      <AlertElement />
      {/* Dialogues */}
      <EpilepsyWarning />
      <PaletteDialogue />
      <SavePatternDialogue />
      <CreditsDialogue />
    </div>
  );
}

export default App;
