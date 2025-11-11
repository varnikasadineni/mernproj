import {ReactNode} from 'react'


interface bg{
   children :ReactNode
}

const Bg = ({children}:bg) => {


  return (
     <div style={{ backgroundImage: "url('/home.png')",      backgroundSize: 'cover',           
        backgroundPosition: 'center',      
        backgroundRepeat: 'no-repeat', 
        minHeight: '100vh',            
        }} className=' top-3 right-4 relative'>

        {children}

     </div>

  )
}

export default Bg