import React from 'react'

const ThemeSwitch = () => {
  const css =  `  
  html { filter: invert(100%); background: #fefefe; }  
  * { background-color: inherit }
  img:not([src*=".svg"]), video { filter: invert(100%) }`
  return (
  <div>  
   <button aria-pressed="false">
      dark theme:
      <span aria-hidden="true">off</span>
   </button>
   <style media="none">
      {css}
   </style>
  </div> 
  ) 
}

export default ThemeSwitch