'use client'
import React, { useState } from 'react'
import './panel.css'
function Panel({numberList,numSetter,num}:{numberList:Array<string>,numSetter:Function,num:string}) {
    
  return (
    <div style={{height:"100%"}}>
        <div className='nav'>
            
        </div>
        <div className='contactList'>
            {numberList.map((number) => (
                <div className={number !== num ? 'contactCard' : 'contactCardSelected'} key={number} onClick={() => {numSetter(number)}}>{number}</div>
            ))}
        </div>
    </div>
  )
}

export default Panel