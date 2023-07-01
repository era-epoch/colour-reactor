import { faMousePointer, faStamp, faToolbox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch } from 'react-redux';
import {
  setTooltipState,
  toggleBrushToolbar,
  toggleOpsToolbar,
  toggleStampToolbar,
  unsetTooltip,
} from '../State/Slices/appSlice';
import { TooltipDirection } from '../types';
import BrushToolbar from './Toolbars/BrushToolbar';
import OpsToolbar from './Toolbars/OpsToolbar';
import StampToolbar from './Toolbars/StampToolbar';

const toolbarWrapperStyle: CSS.Properties = {
  position: 'relative',
  zIndex: '3',
};

const ToolbarContainer = (): JSX.Element => {
  const dispatch = useDispatch();

  const style: CSS.Properties = {
    position: 'absolute',
    left: '2rem',
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
    color: 'var(--contrast)',
    cursor: 'pointer',
    transition: 'all 350ms ease',
    position: 'relative',
    zIndex: '2',
  };

  const handleToggleOpsToolbar = () => {
    dispatch(toggleOpsToolbar());
    dispatch(unsetTooltip());
  };
  const handleToggleBrushToolbar = () => {
    dispatch(toggleBrushToolbar());
    dispatch(unsetTooltip());
  };
  const handleToggleStampToolbar = () => {
    dispatch(toggleStampToolbar());
    dispatch(unsetTooltip());
  };
  const OnOpsMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(
      setTooltipState({
        active: true,
        text: 'Miscellaneous',
        direction: TooltipDirection.right,
        targetID: 'ops-toolbar-icon',
      }),
    );
  };
  const OnBrushMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(
      setTooltipState({
        active: true,
        text: 'Brushes/Cursors',
        direction: TooltipDirection.right,
        targetID: 'brush-toolbar-icon',
      }),
    );
  };
  const OnStampMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(
      setTooltipState({
        active: true,
        text: 'Stamps',
        direction: TooltipDirection.right,
        targetID: 'stamp-toolbar-icon',
      }),
    );
  };

  const OnMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(unsetTooltip());
  };
  return (
    <div className="toolbar-container" style={style}>
      <div className="toolbar-wrapper" style={toolbarWrapperStyle}>
        <StampToolbar />
        <div
          className="toolbar-icon"
          style={iconStyle}
          onClick={handleToggleStampToolbar}
          onMouseEnter={OnStampMouseEnter}
          onMouseLeave={OnMouseLeave}
          id="stamp-toolbar-icon"
        >
          <FontAwesomeIcon icon={faStamp} />
        </div>
      </div>
      <div className="toolbar-wrapper" style={toolbarWrapperStyle}>
        <BrushToolbar />
        <div
          className="toolbar-icon"
          style={iconStyle}
          onClick={handleToggleBrushToolbar}
          onMouseEnter={OnBrushMouseEnter}
          onMouseLeave={OnMouseLeave}
          id="brush-toolbar-icon"
        >
          <FontAwesomeIcon icon={faMousePointer} />
        </div>
      </div>
      <div className="toolbar-wrapper" style={toolbarWrapperStyle}>
        <OpsToolbar />
        <div
          className="toolbar-icon"
          style={iconStyle}
          onClick={handleToggleOpsToolbar}
          onMouseEnter={OnOpsMouseEnter}
          onMouseLeave={OnMouseLeave}
          id="ops-toolbar-icon"
        >
          <FontAwesomeIcon icon={faToolbox} />
        </div>
      </div>
    </div>
  );
};

export default ToolbarContainer;
