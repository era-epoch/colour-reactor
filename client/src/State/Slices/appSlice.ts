import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AllColorSchemes, pastelRainbow } from '../../ColorSchemes';
import {
  BoardObjectSpawnOptions,
  ColorScheme,
  CompassDirection,
  CursorMode,
  Dialogue,
  Direction,
  SpawnWidget,
  Toolbar,
  TooltipDirection,
  TooltipState,
} from '../../types';

export interface AppState {
  // Stamps
  bigHLineOps: BoardObjectSpawnOptions;
  bigVLineOps: BoardObjectSpawnOptions;
  waveOps: BoardObjectSpawnOptions;
  swarmOps: BoardObjectSpawnOptions;

  // Brushes
  paintOps: BoardObjectSpawnOptions;
  morphPaintOps: BoardObjectSpawnOptions;
  cursorColor: string;
  leftClickColor: string;
  rightClickColor: string;
  middleClickColor: string;

  // Objects
  moverOps: BoardObjectSpawnOptions;
  fireflyOps: BoardObjectSpawnOptions;

  // Other
  colorScheme: ColorScheme;
  availableColorSchemes: ColorScheme[];
  defaultColor: string;
  timeDelta: number; // # of miliseconds between updates
  animations: string[];
  directions: Direction[];
  verticalDirections: Direction[];
  horizontalDirections: Direction[];
  paused: boolean;
  cursorMode: CursorMode;
  activeObject: SpawnWidget;
  fillColor: string;
  tooltipState: TooltipState;
  activeDialogue: Dialogue;
  activeToolbar: Toolbar;
}

export const fallbackColor = 'black';

const initialAppState: AppState = {
  // Stamps
  bigHLineOps: { primary: fallbackColor, touchdownAnimation: 'no-animation', direction: Direction.down },
  bigVLineOps: { primary: fallbackColor, touchdownAnimation: 'no-animation', direction: Direction.right },
  waveOps: { primary: fallbackColor, touchdownAnimation: 'no-animation', direction: Direction.pingpong_v },
  swarmOps: { primary: fallbackColor, touchdownAnimation: 'no-animation', compassDirection: CompassDirection.none },

  // Brushes
  paintOps: { primary: fallbackColor },
  morphPaintOps: {},
  cursorColor: fallbackColor,
  leftClickColor: fallbackColor,
  rightClickColor: fallbackColor,
  middleClickColor: fallbackColor,

  // Objects
  moverOps: { primary: fallbackColor, touchdownAnimation: 'no-animation', direction: Direction.down },
  fireflyOps: { primary: fallbackColor, touchdownAnimation: 'no-animation', compassDirection: CompassDirection.none },

  // Other
  colorScheme: pastelRainbow,
  availableColorSchemes: AllColorSchemes,
  defaultColor: 'white',
  timeDelta: 250,
  animations: ['no-animation', 'rotate3d-y', 'rotate3d-x', 'tremble', 'scale-down', 'scale-up', 'spin', 'circularize'],
  directions: [
    Direction.down,
    Direction.up,
    Direction.pingpong_v,
    Direction.left,
    Direction.right,
    Direction.pingpong_h,
  ],
  verticalDirections: [Direction.down, Direction.up, Direction.pingpong_v],
  horizontalDirections: [Direction.left, Direction.right, Direction.pingpong_h],
  paused: false,
  cursorMode: CursorMode.default,
  activeObject: SpawnWidget.none,
  fillColor: fallbackColor,
  tooltipState: { active: false, text: '', direction: TooltipDirection.above, targetID: '' },
  activeDialogue: Dialogue.epilepsyWarning,
  activeToolbar: Toolbar.none,
};

const GetWidgetOptions = (state: AppState, widget: SpawnWidget): BoardObjectSpawnOptions => {
  switch (widget) {
    case SpawnWidget.bigHLine:
      return state.bigHLineOps;
    case SpawnWidget.bigVLine:
      return state.bigVLineOps;
    case SpawnWidget.firefly:
      return state.fireflyOps;
    case SpawnWidget.morphPaint:
      return state.morphPaintOps;
    case SpawnWidget.mover:
      return state.moverOps;
    case SpawnWidget.paint:
      return state.paintOps;
    case SpawnWidget.swarm:
      return state.swarmOps;
    case SpawnWidget.wave:
      return state.waveOps;
    default:
      return state.bigHLineOps;
  }
};

const ChooseRandomColorInScheme = (colorScheme: string[]): string => {
  return colorScheme[Math.floor(Math.random() * colorScheme.length)];
};

// Stamps
initialAppState.bigHLineOps.primary = ChooseRandomColorInScheme(initialAppState.colorScheme.colors);
initialAppState.bigVLineOps.primary = ChooseRandomColorInScheme(initialAppState.colorScheme.colors);
initialAppState.waveOps.primary = ChooseRandomColorInScheme(initialAppState.colorScheme.colors);
initialAppState.swarmOps.primary = ChooseRandomColorInScheme(initialAppState.colorScheme.colors);

// Brushes
initialAppState.paintOps.primary = ChooseRandomColorInScheme(initialAppState.colorScheme.colors);
initialAppState.cursorColor = ChooseRandomColorInScheme(initialAppState.colorScheme.colors);

// Objects
initialAppState.moverOps.primary = ChooseRandomColorInScheme(initialAppState.colorScheme.colors);
initialAppState.fireflyOps.primary = ChooseRandomColorInScheme(initialAppState.colorScheme.colors);

initialAppState.morphPaintOps.morphColors = [
  ChooseRandomColorInScheme(initialAppState.colorScheme.colors),
  ChooseRandomColorInScheme(initialAppState.colorScheme.colors),
];

initialAppState.fillColor = ChooseRandomColorInScheme(initialAppState.colorScheme.colors);

const appSlice = createSlice({
  name: 'app',
  initialState: initialAppState,
  reducers: {
    setActiveToolbar: (state: AppState, action: PayloadAction<Toolbar>) => {
      state.activeToolbar = action.payload;
    },
    setSpawnOps: (state: AppState, action: PayloadAction<{ ops: BoardObjectSpawnOptions; target: SpawnWidget }>) => {
      const ops = action.payload.ops;
      let target: BoardObjectSpawnOptions = GetWidgetOptions(state, action.payload.target);
      if (ops.touchdownAnimation !== undefined) {
        target.touchdownAnimation = ops.touchdownAnimation;
      }
      if (ops.liftoffAnimation !== undefined) {
        target.liftoffAnimation = ops.liftoffAnimation;
      }
      if (ops.ghostAnimation !== undefined) {
        target.ghostAnimation = ops.ghostAnimation;
      }
      if (ops.primary !== undefined) {
        target.primary = ops.primary;
      }
      if (ops.secondary !== undefined) {
        target.secondary = ops.secondary;
      }
      if (ops.tertiary !== undefined) {
        target.tertiary = ops.tertiary;
      }
      if (ops.direction !== undefined) {
        target.direction = ops.direction;
      }
      if (ops.compassDirection !== undefined) {
        target.compassDirection = ops.compassDirection;
      }
      if (ops.morphColors !== undefined) {
        target.morphColors = ops.morphColors;
      }
    },
    setCursorColor: (state: AppState, action: PayloadAction<string>) => {
      state.cursorColor = action.payload;
    },
    setLeftClickColor: (state: AppState, action: PayloadAction<string>) => {
      state.leftClickColor = action.payload;
    },
    setRightClickColor: (state: AppState, action: PayloadAction<string>) => {
      state.rightClickColor = action.payload;
    },
    setMiddleClickColor: (state: AppState, action: PayloadAction<string>) => {
      state.middleClickColor = action.payload;
    },
    setPause: (state: AppState, action: PayloadAction<boolean>) => {
      state.paused = action.payload;
    },
    setTimeDelta: (state: AppState, action: PayloadAction<number>) => {
      state.timeDelta = action.payload;
    },
    setCursorMode: (state: AppState, action: PayloadAction<CursorMode>) => {
      state.cursorMode = action.payload;
    },
    setActiveObject: (state: AppState, action: PayloadAction<SpawnWidget>) => {
      state.activeObject = action.payload;
    },
    setMorphPaintColorAtIndex: (state: AppState, action: PayloadAction<{ index: number; color: string }>) => {
      if (state.morphPaintOps.morphColors) state.morphPaintOps.morphColors[action.payload.index] = action.payload.color;
    },
    setFillColor: (state: AppState, action: PayloadAction<string>) => {
      state.fillColor = action.payload;
    },
    setTooltipState: (state: AppState, action: PayloadAction<TooltipState>) => {
      state.tooltipState = action.payload;
    },
    unsetTooltip: (state: AppState) => {
      state.tooltipState = {
        active: false,
        text: '',
        direction: TooltipDirection.above,
        targetID: '',
      };
    },
    setActiveDialogue: (state: AppState, action: PayloadAction<Dialogue>) => {
      state.activeDialogue = action.payload;
    },
    setColorScheme: (state: AppState, action: PayloadAction<ColorScheme>) => {
      state.colorScheme = action.payload;

      const colors = action.payload.colors;
      state.bigHLineOps.primary = ChooseRandomColorInScheme(colors);
      state.bigVLineOps.primary = ChooseRandomColorInScheme(colors);
      state.waveOps.primary = ChooseRandomColorInScheme(colors);
      state.swarmOps.primary = ChooseRandomColorInScheme(colors);

      state.paintOps.primary = ChooseRandomColorInScheme(colors);
      state.fillColor = ChooseRandomColorInScheme(colors);

      state.cursorColor = ChooseRandomColorInScheme(colors);
      state.morphPaintOps.morphColors = [ChooseRandomColorInScheme(colors), ChooseRandomColorInScheme(colors)];

      state.moverOps.primary = ChooseRandomColorInScheme(colors);
      state.fireflyOps.primary = ChooseRandomColorInScheme(colors);
    },
  },
});

export default appSlice.reducer;
export const {
  setActiveToolbar,
  setCursorColor,
  setLeftClickColor,
  setMiddleClickColor,
  setRightClickColor,
  setPause,
  setTimeDelta,
  setCursorMode,
  setMorphPaintColorAtIndex,
  setFillColor,
  setTooltipState,
  unsetTooltip,
  setActiveDialogue,
  setColorScheme,
  setSpawnOps,
  setActiveObject,
} = appSlice.actions;
