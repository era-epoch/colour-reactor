import CSS from 'csstype';

export const toolbarStyle: CSS.Properties = {
  zIndex: '1',
};

export const defaultWidgetStyle: CSS.Properties = {
  position: 'absolute',
  bottom: '0',
  width: '4rem',
  height: '4rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1.5rem',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  borderRadius: '50% 50%',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease',
  transitionDuration: '300ms',
  border: '2px solid rgb(235, 235, 235)',
  cursor: 'pointer',
  zIndex: '2',
};
