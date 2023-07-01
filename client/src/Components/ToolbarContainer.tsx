import { faMousePointer, faStamp, faToolbox, faVectorSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveToolbar, setTooltipState, unsetTooltip } from '../State/Slices/appSlice';
import { RootState } from '../State/rootReducer';
import { Toolbar, TooltipDirection } from '../types';
import BrushToolbar from './Toolbars/BrushToolbar';
import ObjectsToolbar from './Toolbars/ObjectsToolbar';
import OpsToolbar from './Toolbars/OpsToolbar';
import StampToolbar from './Toolbars/StampToolbar';

const toolbarWrapperStyle: CSS.Properties = {
  position: 'relative',
  zIndex: '3',
};

const ToolbarContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const activeToolbar = useSelector((state: RootState) => state.app.activeToolbar);

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
    borderWidth: `2px`,
    borderStyle: 'solid',
    borderColor: 'rgb(235, 235, 235)',
    color: 'var(--contrast)',
    cursor: 'pointer',
    transition: 'all 350ms ease',
    position: 'relative',
    zIndex: '2',
  };

  const brushIconStyle = { ...iconStyle };
  const objectsIconStyle = { ...iconStyle };
  const stampIconStyle = { ...iconStyle };
  const opsIconStyle = { ...iconStyle };

  switch (activeToolbar) {
    case Toolbar.brushes:
      brushIconStyle.borderColor = 'var(--contrast)';
      break;
    case Toolbar.objects:
      objectsIconStyle.borderColor = 'var(--contrast)';
      break;
    case Toolbar.stamps:
      stampIconStyle.borderColor = 'var(--contrast)';
      break;
    case Toolbar.options:
      opsIconStyle.borderColor = 'var(--contrast)';
      break;
  }

  const handleToggleOpsToolbar = () => {
    if (activeToolbar === Toolbar.options) {
      dispatch(setActiveToolbar(Toolbar.none));
    } else {
      dispatch(setActiveToolbar(Toolbar.options));
    }
    dispatch(unsetTooltip());
  };
  const handleToggleBrushToolbar = () => {
    if (activeToolbar === Toolbar.brushes) {
      dispatch(setActiveToolbar(Toolbar.none));
    } else {
      dispatch(setActiveToolbar(Toolbar.brushes));
    }
    dispatch(unsetTooltip());
  };
  const handleToggleStampToolbar = () => {
    if (activeToolbar === Toolbar.stamps) {
      dispatch(setActiveToolbar(Toolbar.none));
    } else {
      dispatch(setActiveToolbar(Toolbar.stamps));
    }
    dispatch(unsetTooltip());
  };
  const handleToggleObjectsToolbar = () => {
    if (activeToolbar === Toolbar.objects) {
      dispatch(setActiveToolbar(Toolbar.none));
    } else {
      dispatch(setActiveToolbar(Toolbar.objects));
    }
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
        text: 'Motion Stamps',
        direction: TooltipDirection.right,
        targetID: 'stamp-toolbar-icon',
      }),
    );
  };
  const OnObjectsMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(
      setTooltipState({
        active: true,
        text: 'Objects',
        direction: TooltipDirection.right,
        targetID: 'objects-toolbar-icon',
      }),
    );
  };

  const OnMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(unsetTooltip());
  };
  return (
    <div className="toolbar-container" style={style}>
      <div className="toolbar-wrapper" style={toolbarWrapperStyle}>
        <BrushToolbar />
        <div
          className="toolbar-icon"
          style={brushIconStyle}
          onClick={handleToggleBrushToolbar}
          onMouseEnter={OnBrushMouseEnter}
          onMouseLeave={OnMouseLeave}
          id="brush-toolbar-icon"
        >
          <FontAwesomeIcon icon={faMousePointer} />
        </div>
      </div>
      <div className="toolbar-wrapper" style={toolbarWrapperStyle}>
        <ObjectsToolbar />
        <div
          className="toolbar-icon"
          style={objectsIconStyle}
          onClick={handleToggleObjectsToolbar}
          onMouseEnter={OnObjectsMouseEnter}
          onMouseLeave={OnMouseLeave}
          id="objects-toolbar-icon"
        >
          <FontAwesomeIcon icon={faVectorSquare} />
        </div>
      </div>
      <div className="toolbar-wrapper" style={toolbarWrapperStyle}>
        <StampToolbar />
        <div
          className="toolbar-icon"
          style={stampIconStyle}
          onClick={handleToggleStampToolbar}
          onMouseEnter={OnStampMouseEnter}
          onMouseLeave={OnMouseLeave}
          id="stamp-toolbar-icon"
        >
          <FontAwesomeIcon icon={faStamp} />
        </div>
      </div>
      <div className="toolbar-wrapper" style={toolbarWrapperStyle}>
        <OpsToolbar />
        <div
          className="toolbar-icon"
          style={opsIconStyle}
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
