import { faPatreon } from '@fortawesome/free-brands-svg-icons';
import {
  faCircleInfo,
  faFile,
  faMousePointer,
  faObjectGroup,
  faToolbox,
  faVectorSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveToolbar, setTooltipState, unsetTooltip } from '../State/Slices/appSlice';
import { RootState } from '../State/rootReducer';
import { Toolbar, TooltipDirection } from '../types';
import AboutToolbar from './Toolbars/AboutToolbar';
import BrushToolbar from './Toolbars/BrushToolbar';
import FileToolbar from './Toolbars/FileToolbar';
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
  const fileIconStyle = { ...iconStyle };
  const aboutIconStyle = { ...iconStyle };
  const supportIconStyle = { ...iconStyle };

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
    case Toolbar.file:
      fileIconStyle.borderColor = 'var(--contrast)';
      break;
    case Toolbar.about:
      aboutIconStyle.borderColor = 'var(--contrast)';
      break;
  }

  const handleToggleOpsToolbar = () => {
    handleToggleToolbar(Toolbar.options);
  };
  const handleToggleBrushToolbar = () => {
    handleToggleToolbar(Toolbar.brushes);
  };
  const handleToggleStampToolbar = () => {
    handleToggleToolbar(Toolbar.stamps);
  };
  const handleToggleObjectsToolbar = () => {
    handleToggleToolbar(Toolbar.objects);
  };
  const handleToggleFileToolbar = () => {
    handleToggleToolbar(Toolbar.file);
  };
  const handleToggleAboutToolbar = () => {
    handleToggleToolbar(Toolbar.about);
  };
  const handleToggleToolbar = (toolbar: Toolbar) => {
    if (activeToolbar === toolbar) {
      dispatch(setActiveToolbar(Toolbar.none));
    } else {
      dispatch(setActiveToolbar(toolbar));
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
        text: 'Object Groups',
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
  const OnFileMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(
      setTooltipState({
        active: true,
        text: 'File',
        direction: TooltipDirection.right,
        targetID: 'file-toolbar-icon',
      }),
    );
  };
  const OnAboutMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(
      setTooltipState({
        active: true,
        text: 'Info',
        direction: TooltipDirection.right,
        targetID: 'about-toolbar-icon',
      }),
    );
  };
  const OnSupportMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(
      setTooltipState({
        active: true,
        text: 'Support the Developer',
        direction: TooltipDirection.right,
        targetID: 'support-toolbar-icon',
      }),
    );
  };

  const OnMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(unsetTooltip());
  };

  const handleSupportClick = () => {
    window.open('https://www.patreon.com/eracodes', '_blank');
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
          <FontAwesomeIcon icon={faObjectGroup} />
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
      <div className="toolbar-wrapper" style={toolbarWrapperStyle}>
        <FileToolbar />
        <div
          className="toolbar-icon"
          style={fileIconStyle}
          onClick={handleToggleFileToolbar}
          onMouseEnter={OnFileMouseEnter}
          onMouseLeave={OnMouseLeave}
          id="file-toolbar-icon"
        >
          <FontAwesomeIcon icon={faFile} />
        </div>
      </div>
      <div className="toolbar-wrapper" style={toolbarWrapperStyle}>
        <AboutToolbar />
        <div
          className="toolbar-icon"
          style={aboutIconStyle}
          onClick={handleToggleAboutToolbar}
          onMouseEnter={OnAboutMouseEnter}
          onMouseLeave={OnMouseLeave}
          id="about-toolbar-icon"
        >
          <FontAwesomeIcon icon={faCircleInfo} />
        </div>
      </div>
      <div className="toolbar-wrapper" style={toolbarWrapperStyle}>
        <div
          className="toolbar-icon"
          style={supportIconStyle}
          onClick={handleSupportClick}
          onMouseEnter={OnSupportMouseEnter}
          onMouseLeave={OnMouseLeave}
          id="support-toolbar-icon"
        >
          <FontAwesomeIcon icon={faPatreon} />
        </div>
      </div>
    </div>
  );
};

export default ToolbarContainer;
