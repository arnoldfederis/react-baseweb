import { INIT_THEME, TOGGLE_THEME } from '../types/app'
import { get, set } from '../../utils/localStorage'
import { getAccentColor, THEME } from '../../utils/theme'

const initialState = {
  theme: get('theme') || THEME.light
}

const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case INIT_THEME:
      document.body.style.backgroundColor = getAccentColor(state.theme)

      if (get('theme')) {
        set('theme', get('theme'))
        return { ...state, theme: get('theme') }
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        set('theme', THEME.dark)
        return { ...state, theme: THEME.dark }
      }

      break;

    case TOGGLE_THEME:
      let newTheme = state.theme === THEME.light ? THEME.dark : THEME.light
      document.body.style.backgroundColor = getAccentColor(newTheme)
      set('theme', newTheme)
      return { ...state, theme: newTheme }

    default:
      return state
  }
}

export default appReducer
