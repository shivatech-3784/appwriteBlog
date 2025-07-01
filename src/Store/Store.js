// Store.js
import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice' // ✅ Make sure the path and export are correct

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
})

export default store
