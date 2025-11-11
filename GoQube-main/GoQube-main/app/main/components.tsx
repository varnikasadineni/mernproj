import React from 'react'
import './style.css'

interface SearchProps {
  area: string
  setArea: (value: string) => void
  setSubmitN: (value: boolean) => void
  setSubmit: (value: boolean) => void
  handleSubmit: () => void
  setNav: (value: number) => void
}

export const Search = ({
  area,
  setArea,
  setSubmitN,
  setSubmit,
  handleSubmit,
  setNav
}: SearchProps) => {
  return (
    <div className="inputBar" style={{zIndex: 10}}>
      <input 
        type="text" 
        placeholder='Enter the area...' 
        className="areaName" 
        value={area} 
        onChange={(e) => {
          setArea(e.target.value)
          setSubmitN(true)
        }} 
      />
      
      <button 
        className="submit"  
        onClick={() => {
          setSubmit(true)
          handleSubmit()
          setNav(0)
        }}
      >      
        Submit
      </button>
    </div>
  )
}

interface NavProps {
  area: string
  nav: number
  setNav: (value: number) => void
  submitN: boolean
  SearchComponent: React.ComponentType<SearchProps>
  searchProps: SearchProps
}

export const Nav = ({
  area,
  nav,
  setNav,
  submitN,
  SearchComponent,
  searchProps
}: NavProps) => {
  if (nav === 0 && submitN === true) {
    return (
      <div className="head">
        <h1 style={{ paddingRight: 3 }}>
          Events in {area}
        </h1>
        <button 
          className=""
          onClick={() => setNav(1)}
        >
          <img src="/search-icon.png" alt="" id="search" />
        </button>
      </div>
    )
  } else {
    return <SearchComponent {...searchProps} />
  }
}