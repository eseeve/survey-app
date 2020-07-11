const storageKey = 'loggedSurveyAppUser'
const themeKey = 'ThemeSwitch'

const saveTheme = (theme) => 
  localStorage.setItem(themeKey, theme)

const loadTheme = () =>
  localStorage.getItem(themeKey)

const saveUser = (user) =>
  localStorage.setItem(storageKey, JSON.stringify(user))

const loadUser = () =>
  JSON.parse(localStorage.getItem(storageKey))

const logoutUser = () =>
  localStorage.removeItem(storageKey)

export default {
  saveUser,
  loadUser,
  logoutUser,
  saveTheme,
  loadTheme
}