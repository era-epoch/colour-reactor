import CSS from 'csstype';

interface Props {
  widgetStyle: CSS.Properties;
  color: string;
  clickCallback: Function;
}

const ColorWidget = (props: Props): JSX.Element => {
  const widgetStyle = { ...props.widgetStyle };
  widgetStyle.backgroundColor = props.color;
  widgetStyle.width = '4rem';
  widgetStyle.height = '4rem';

  const handleMouseOver = () => {};

  const handleMouseOut = () => {};

  return (
    <div
      className="toolbar-widget"
      onClick={() => props.clickCallback}
      style={widgetStyle}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    ></div>
  );
};

export default ColorWidget;
