import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useState } from 'react';

interface Props {
  widgetWrapperStyle: CSS.Properties;
}

const FullscreenWidget = (props: Props): JSX.Element => {
  const widgetWrapperStyle = { ...props.widgetWrapperStyle };
  const [FS, setFS] = useState(false);

  const widgetStyle: CSS.Properties = {
    backgroundColor: widgetWrapperStyle.backgroundColor,
    borderRadius: widgetWrapperStyle.borderRadius,
  };

  const handleClick = () => {
    if (FS) {
      document.exitFullscreen();
      setFS(false);
    } else {
      document.documentElement.requestFullscreen();
      setFS(true);
    }
  };

  return (
    <div className="widget-wrapper" style={widgetWrapperStyle}>
      <div className="relative-parent">
        <div className="toolbar-widget" style={widgetStyle} onClick={handleClick}>
          <FontAwesomeIcon icon={faExpand} />
        </div>
      </div>
    </div>
  );
};

export default FullscreenWidget;
