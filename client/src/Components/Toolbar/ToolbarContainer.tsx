import { faToolbox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../State/rootReducer';
import { setToolBarOpen } from '../../State/Slices/appSlices';
import Toolbar from './Toolbar';

const ToolbarContainer = (): JSX.Element => {
  const open = useSelector((state: RootState) => state.app.toolbarOpen);
  const dispatch = useDispatch();

  const style: CSS.Properties = {
    position: 'absolute',
    right: '5rem',
    bottom: '5rem',
    display: 'flex',
  };

  const iconStyle: CSS.Properties = {
    width: '4rem',
    height: '4rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: '50% 50%',
    // boxShadow: '0px -5px black',
    border: '2px solid rgb(235, 235, 235)',
    cursor: 'pointer',
    transition: 'all 350ms ease',
    zIndex: '1',
  };

  const toggleToolbar = () => {
    dispatch(setToolBarOpen(!open));
  };
  return (
    <div className="toolbar-container" style={style}>
      <Toolbar />
      <div className="toolbar-icon" style={iconStyle} onClick={toggleToolbar}>
        <FontAwesomeIcon icon={faToolbox} />
      </div>
    </div>
  );
};

export default ToolbarContainer;
