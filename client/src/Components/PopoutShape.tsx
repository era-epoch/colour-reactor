import CSS from 'csstype';

interface Props {
  style: CSS.Properties;
}

const PopoutShape = (props: Props): JSX.Element => {
  return <div className="popout-shape" style={props.style}></div>;
};

export default PopoutShape;
