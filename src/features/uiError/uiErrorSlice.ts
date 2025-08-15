import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'uiError',
  initialState: { message: '', code: '' },
  reducers: {
    setGlobalApiError(state, action: PayloadAction<{ message: string; code?: string }>) {
      state.message = action.payload.message
      state.code = action.payload.code || ''
    },
    clearGlobalApiError(state) {
      state.message = ''
      state.code = ''
    },
  },
})

export const { setGlobalApiError, clearGlobalApiError } = slice.actions
export default slice.reducer