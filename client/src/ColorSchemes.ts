import uuid from 'react-uuid';
import { ColorScheme } from './types';

export const basicRainbow: ColorScheme = {
  name: 'Basic Rainbow',
  colors: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'],
  id: uuid(),
};

export const pastelRainbow: ColorScheme = {
  name: 'Pastel Rainbow',
  colors: ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'],
  id: uuid(),
};

export const cyberpunk: ColorScheme = {
  name: 'Cyberpunk Neon',
  colors: ['#00ff9f', '#00b8ff', '#001eff', '#bd00ff', '#d600ff'],
  id: uuid(),
};

export const sunset_1: ColorScheme = {
  name: '80s Sunset',
  colors: ['#003049', '#D62828', '#F77F00', '#FCBF49', '#EAE2B7'],
  id: uuid(),
};

export const sunset_2: ColorScheme = {
  name: 'California Sunset',
  colors: ['#1d2c65', '#6b5b9a', '#b088ad', '#eb998b', '#feb873'],
  id: uuid(),
};

export const cozy_dragon: ColorScheme = {
  name: 'Cozy Dragon',
  colors: ['#581845', '#900C3F', '#c70039', '#ff5733', '#FFc300'],
  id: uuid(),
};

export const AllColorSchemes = [pastelRainbow, basicRainbow, cyberpunk, sunset_1, sunset_2, cozy_dragon];
