import { INIT_THEME, TOGGLE_THEME } from '../types/app'

export const initTheme = () => (dispatch) => {
  dispatch({ type: INIT_THEME })
}

export const toggleTheme = () => (dispatch) => {
  dispatch({ type: TOGGLE_THEME })
}
