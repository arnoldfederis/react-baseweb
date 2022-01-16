export const THEME = {
  light: 'light',
  dark: 'dark'
}

export const getAccentColor = (theme) => {
  return theme === THEME.dark ? '#212121' : 'whitesmoke'
}
