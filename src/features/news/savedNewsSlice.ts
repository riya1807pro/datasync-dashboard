import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type State = { articles: any[] }

const initialState: State = { articles: [] }

const slice = createSlice({
  name: 'savedNews',
  initialState,
  reducers: {
    addSaved(state, action: PayloadAction<any>) {
      const a = action.payload
      if (!a) return
      if (!state.articles.find((x) => x.url === a.url)) state.articles.push(a)
    },
    removeSaved(state, action: PayloadAction<string>) {
      state.articles = state.articles.filter((x) => x.url !== action.payload)
    },
    setSaved(state, action: PayloadAction<any[]>) {
      state.articles = action.payload || []
    },
    clearSaved(state) {
      state.articles = []
    },
  },
})

export const { addSaved, removeSaved, setSaved, clearSaved } = slice.actions
export default slice.reducer