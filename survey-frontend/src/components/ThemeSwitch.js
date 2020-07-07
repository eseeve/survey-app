import React, { useState, useEffect } from 'react'
import { Button } from 'semantic-ui-react'

import storage from '../utils/storage'

const ThemeSwitch = () => {
  const [ theme, setTheme ] = useState('light')

  useEffect(() => {
    if (storage.loadTheme() === 'dark') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [])

  const handleClick = (event) => {
    event.preventDefault()
    if (theme === 'light') {
      setTheme('dark')
      storage.saveTheme('dark')
    } else {
      setTheme('light')
      storage.saveTheme('light')
    }
  }
  const css =  `  
  html { background-color: #eee;
  filter: invert(95%); }
  body { background-color: #eee;}  
  * { background-color: inherit }
  img:not([src*=".svg"]),
  video { filter: invert(95%) }
  .red-button { filter: invert(100%) }
  .teal-button { filter: invert(100%) }
  .green-button { filter: invert(100%) }
  .link { filter: invert(100%) }
  .notification { filter: invert(100%) `
  return (
  <div>  
   <Button onClick={handleClick}>
      Dark mode: 
      <span aria-hidden="true">{theme === 'dark' ? ' on' : ' off'}</span>
   </Button>
   <style media={theme === 'dark' ? 'screen' : 'none'}>
      {theme === 'dark' ? css.trim() : css}
   </style>
  </div> 
  ) 
}

export default ThemeSwitch