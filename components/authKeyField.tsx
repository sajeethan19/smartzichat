"use client"
import React, { useState } from 'react'
import './authKeyField.css'
import { keyTest } from './keyTester'

function AuthKeyField({authKey}:{authKey:Function}) {
    const [key,setKey] = useState('')
    const keyAdder = () => {
        authKey(key)
        console.log("test",keyTest(key))
    }
    return (
        <div className='fillContainer'>
            <div className='inputAuth'>
                <div>Enter Cloud API Auth key to continue.</div>
                <input type="text" value={key} onChange={(e) => {setKey(e.target.value)}} onKeyDown={(e) => {if(e.key == 'Enter'){keyAdder()}}}/>
                <div className='button' onClick={() => {keyAdder()}}>Enter Key</div>
            </div>
        </div>
    )
}

export default AuthKeyField