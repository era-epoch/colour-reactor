import ColorSelector from './SubtoolbarOptions/ColorSelector';

interface Props {
  setColorCallback?: Function;
  initColor?: string;
}

const Subtoolbar = (props: Props): JSX.Element => {
  return (
    <div className="subtoolbar-wrapper">
      <div className="subtoolbar-container">
        {props.setColorCallback && props.initColor ? (
          <ColorSelector setColorCallback={props.setColorCallback} initColor={props.initColor} />
        ) : null}
      </div>
    </div>
  );
};

export default Subtoolbar;
