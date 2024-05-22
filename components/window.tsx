/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react'
import './window.css'
import Image from 'next/image'
import send from '/public/send.svg'
import {sendMessage} from './sendMessage'
import SmartziSpinner from './smartziSpinner'

function Window({chatHistory,mobNumber,sendWatcher,setSendWatcher}:{chatHistory:any,mobNumber:string,sendWatcher:boolean,setSendWatcher:any }) {
    const [msg,setMsg] = useState('')
    const sender = () => {
        if (!(msg.split(' ').join('') == '')){
            sendMessage(msg,mobNumber,setSendWatcher,sendWatcher)
            setMsg('')
            setSendWatcher(!sendWatcher)
            console.log("window",sendWatcher)
        }

    }

   useEffect(() => {
    setMsg('')
   },[chatHistory])

    return (
        <div style={{height:"100%"}}>
            <div className='nav'>
                {mobNumber}
            </div>
            <div className='chatBody' style={{position:"relative"}}>
                    {(chatHistory == "loading")? 
                            <SmartziSpinner/>
                        : 
                        <div className='convArea'>
                                {chatHistory && chatHistory.messageList && chatHistory.messageList.map((txt:any,index:any) => (
                                <div key={index} className={`${(txt.type == "send")? "sendBoxContainer" : "recieveBoxContainer"}`}>
                                    <div className={`${(txt.type == "send")? "sendBox" : "recieveBox"}`}>
                                        {txt.text}
                                    </div>
                                </div>
                                ) )}
                        </div>
                    }
                <div className='senderBox'>
                    <div className='emoji'><img src='/emoji.png' alt='face' height="25px"/></div>
                    <div className='input'>
                        <input className='inputText' type='text' value={msg} onChange={(e) => {setMsg(e.target.value);}} onKeyDown={(e) => {(e.key=='Enter')? sender():null}}/>
                    </div>
                    <div className='sendButton' onClick={() => sender()}><Image className='sendImg' src={send} alt='send' height={30}/></div>
                </div>
            </div>
        </div>
    )
}

export default Window