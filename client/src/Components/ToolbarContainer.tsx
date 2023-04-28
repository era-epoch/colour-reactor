import { faPaintBrush, faStamp, faToolbox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch } from 'react-redux';
import { toggleBrushToolbar, toggleOpsToolbar, toggleStampToolbar } from '../State/Slices/appSlices';
import BrushToolbar from './Toolbars/BrushToolbar';
import OpsToolbar from './Toolbars/OpsToolbar';
import StampToolbar from './Toolbars/StampToolbar';

const toolbarWrapperStyle: CSS.Properties = {
  position: 'relative',
  zIndex: '1',
};

const ToolbarContainer = (): JSX.Element => {
  const dispatch = useDispatch();

  const style: CSS.Properties = {
    position: 'absolute',
    right: '2rem',
    top: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
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
    position: 'relative',
    zIndex: '2',
  };

  const handleToggleOpsToolbar = () => {
    dispatch(toggleOpsToolbar());
  };
  const handleToggleBrushToolbar = () => {
    dispatch(toggleBrushToolbar());
  };
  const handleToggleStampToolbar = () => {
    dispatch(toggleStampToolbar());
  };
  return (
    <div className="toolbar-container" style={style}>
      <div className="toolbar-wrapper" style={toolbarWrapperStyle}>
        <StampToolbar />
        <div className="toolbar-icon" style={iconStyle} onClick={handleToggleStampToolbar}>
          <FontAwesomeIcon icon={faStamp} />
        </div>
      </div>
      <div className="toolbar-wrapper" style={toolbarWrapperStyle}>
        <BrushToolbar />
        <div className="toolbar-icon" style={iconStyle} onClick={handleToggleBrushToolbar}>
          <FontAwesomeIcon icon={faPaintBrush} />
        </div>
      </div>
      <div className="toolbar-wrapper" style={toolbarWrapperStyle}>
        <OpsToolbar />
        <div className="toolbar-icon" style={iconStyle} onClick={handleToggleOpsToolbar}>
          <FontAwesomeIcon icon={faToolbox} />
        </div>
      </div>
    </div>
  );
};

export default ToolbarContainer;
