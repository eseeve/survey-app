import React, { useState, useEffect } from 'react'

import storage from '../utils/storage'

const ThemeSwitch = () => {
  const [ theme, setTheme ] = useState(false)

  useEffect(() => {
    setTheme(storage.loadTheme())
  }, [])

  const handleClick = (event) => {
    event.preventDefault()
    theme ? setTheme(false) : setTheme(true)
    storage.saveTheme(theme)
  }
  const css =  `  
  html { filter: invert(100%); background: #121212; }  
  * { background-color: inherit }
  img:not([src*=".svg"]), video { filter: invert(100%) }`
  return (
  <div>  
   <button aria-pressed={theme} onClick={handleClick}>
      dark theme:
      <span aria-hidden="true">{theme ? 'on' : 'off'}</span>
   </button>
   <style media={theme ? 'screen' : 'none'}>
      {theme ? css.trim() : css}
   </style>
  </div> 
  ) 
}

export default ThemeSwitch