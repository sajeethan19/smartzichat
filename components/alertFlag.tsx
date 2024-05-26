import React from 'react'
import './alertFlag.css'
function AlertFlag({alert}:{alert:string}) {
    
  return (
    <div className='alertContainer'>
        <div className='flag'>
            {alert}      
        </div>
    </div>
  )
}

export default AlertFlag