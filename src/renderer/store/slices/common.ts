import { Chat } from './../../../../../crypto-sentinel-server/node_modules/openai/src/resources/beta/chat/chat';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CommonState {
  loading: boolean;
  canvas: {
    x: number;
    y: number;
    dragging: boolean;
  };
  selected: object;
}

const initialState: CommonState = {
  loading: false,
  canvas: {
    x: 0,
    y: 0,
    dragging: false,
  },
  selected: {
    nodeInfo: {},
    transactions: [],
    graphData: {
      nodes: [],
      links: [],
    },
  },
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setPosition: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.canvas.x = action.payload.x;
      state.canvas.y = action.payload.y;
    },
    setDragging: (state, action: PayloadAction<boolean>) => {
      state.canvas.dragging = action.payload;
    },
    setSelected: (state, action: PayloadAction<object>) => {
      return {
        ...state,
        selected: {
          ...state.selected,
          nodeInfo: action.payload,
        },
      };
    },
    setTransactions: (state, action: PayloadAction<Array<object>>) => {
      return {
        ...state,
        selected: {
          ...state.selected,
          transactions: action.payload,
        },
      };
    },
    setSelectedGraph: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        selected: {
          ...state.selected,
          graphData: {
            nodes: action.payload.nodes,
            links: action.payload.links,
          },
        },
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLoading,
  setPosition,
  setDragging,
  setTransactions,
  setSelected,
  setSelectedGraph,
} = commonSlice.actions;

export default commonSlice.reducer;
