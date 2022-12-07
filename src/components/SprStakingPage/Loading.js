import React from 'react'
import MoonLoader from "react-spinners/BounceLoader";
import './Loading.css'


const Loading = () => {

  return (

    <div className='loadingContainer'>
        <MoonLoader
         color="#00557a"
        //  color="#1299FF"
        //  color="#39A2DB"
        //  color="#0A1126"
          size={108}
      />
    </div>
  )
}

export default Loading
