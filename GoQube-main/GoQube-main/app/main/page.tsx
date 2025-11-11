'use client'
import React from 'react'
import { useState } from 'react'
import Bg from './bg'
import './style.css'
import { Search, Nav } from './components'

interface Event{
  id?:number 
  name: string
  description: string
}

const Main = () => {
  const [area, setArea] = useState<string>('')
  const [submit, setSubmit] = useState<boolean>(false)
  const [nav, setNav] = useState<number>(0)
  const [submitN, setSubmitN] = useState<boolean>(true)
  const [events , setEvents]= useState<Event[]>([])
  const[error, setError]= useState<string|null>(null)
  const[loading,setLoading]= useState<boolean>(false)

  const handleSubmit = async () => {
    if (!area.trim()) {
      alert('Please enter an area name')
      setSubmitN(false)
      return
    }
  

  try {
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    
    const response = await fetch(`${API_URL}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        area: area.trim()
      })
    })
    const data = await response.json()
    if (Array.isArray(data)) {
      setEvents(data)
    } 
  }
  catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to fetch events')
    console.error('Error fetching events:', err)
    setEvents([])
  } finally {
    setLoading(false)
  }}


  const searchProps = {
    area,
    setArea,
    setSubmitN,
    setSubmit,
    handleSubmit,
    setNav
  }

  // not submitted 
  if(!submit){
    return (
      <>
        <Bg>
          <div className="primary">
            <p className="text-3xl pt-[3vh] pr-[30vh] pl-[3vh] mb-[2vh]">
              Enter a area to quickly discover events happening in it and their descriptions . 
              Simple and easy to use, this app helps you find relevant event information without any hassle.
            </p>

            <Search {...searchProps} />
          </div>
        </Bg>
      </>
    )
  }

  else {
    return (
      <>
        <Bg>
          <nav className="nav">
            <Nav 
              area={area}
              nav={nav}
              setNav={setNav}
              submitN={submitN}
              SearchComponent={Search}
              searchProps={searchProps}
            />
          </nav>
          <div className="">
                <div className="events-container">
                  {events.length > 0 ? (
                    events.map((event, index) => (
                      <div key={event.id || index} className="event-card">
                        <h2 className="event-name">{event.name}</h2>
                        <p className="event-description">{event.description}</p>
                      </div>
                    ))
                  ) : (
                    <div className="no-events">
                      <p>No events found for {area}</p>
                    </div>
                  )}
                </div>
          </div>
        </Bg>
      </>
    )
  }
}

export default Main