"use client";
import styles from "./page.module.css";
import Panel from "@/components/panel";
import Window from "@/components/window";
import { useEffect, useState } from "react";
import { addContact } from "@/components/addContact";
import axios from "axios";
import useWebSocket from 'react-use-websocket'

export default function Home() {
  
  const [chatHistory,setChatHistory] =useState([''])
  const [mobileNumberList, setMobileNumberList] = useState(['']);
  const numSetter = (num:string) => {
    setChatHistory(["loading"])
    setActiveNum(num)
  }
  const [activeNum, setActiveNum] = useState('0');
  const [newNum,setNewNum] = useState('')
  const [authKey,setAuthKey] = useState('')

  // from this on I am going to update nemList list and convList from MongoDB.
  const fetchMessages = async () => {
    try {
      const response = await axios.get('https://staging-ng.smartzi.com/leap-node-twilio/messages/api');
      setMobileNumberList(response.data.map((msg:any) => msg.number))
      setChatHistory(response.data.find((msg: { number: string; }) => msg.number === activeNum))
    } catch (error) {
      console.error("error in Fetching from DB to messages/api:",error);
    }
  };

  const {lastJsonMessage} = useWebSocket('wss://staging-ng.smartzi.com/leap-node-twilio/')

  useEffect(() => {
    fetchMessages(); 
  },[activeNum, lastJsonMessage]); 

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className="mainContainer">
          <input
            style={{ position: "fixed" }}
            type="text"
            value={newNum}
            onChange={(e) => {setNewNum(e.target.value)}}
            onKeyDown={(e) => {
              if (e.key == "Enter"  ) 
              {
                setMobileNumberList([...mobileNumberList, newNum]);
                addContact(newNum,authKey)
                setNewNum('')
              }
            }}
          />
          <input className="keyField" type="text" value={authKey} onChange={(e) => setAuthKey(e.target.value)} />
          <div className="Panel">
            <Panel numberList={mobileNumberList} numSetter={numSetter} num={activeNum}/>
          </div>
          <div className="chatWindow">
            <Window
              chatHistory={chatHistory}
              mobNumber={activeNum}
              authKey={"Bearer "+authKey}
            />

          </div>
        </div>
      </div>
    </main>
  );
}
