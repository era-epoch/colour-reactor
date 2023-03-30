import { faBomb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useSelector } from 'react-redux';
import { RootState } from '../../State/rootReducer';

const Toolbar = (): JSX.Element => {
  const open = useSelector((state: RootState) => state.app.toolbarOpen);
  const toolbarStyle: CSS.Properties = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '1000px',
    height: '4rem',
    transition: 'all 300ms ease',
  };
  const toolbarWidgetStyle: CSS.Properties = {
    position: 'absolute',
    bottom: '0',
    width: '4rem',
    height: '4rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '50% 50%',
    transition: 'all 300ms ease',
    border: '2px solid rgb(235, 235, 235)',
  };
  open ? (toolbarWidgetStyle.right = '5rem') : (toolbarWidgetStyle.right = '0');
  return (
    <div className="toolbar" style={toolbarStyle}>
      <div className="toolbar-widget" style={toolbarWidgetStyle}>
        <FontAwesomeIcon icon={faBomb} />
      </div>
    </div>
  );
};

export default Toolbar;
