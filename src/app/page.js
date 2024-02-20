'use client'
import React from 'react'
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Home() {

  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [load, setLoad] = useState(false)
  const [notif, setNotif] = useState("")
  const router = useRouter()

  const clearForm = () => {
    setName("")
    setMessage("")
  }

  const formSubmit = async (e) => {
    e.preventDefault()
    setLoad(true)

    try {

      if(!name && !message) {
        setNotif(<div className='bg-red-500 text-white p-2'>isi yang bener dong</div>)
        setLoad(false)
        return
      }

      const kataToxic = ["tai","anjing","bangsat","kontol","memek","jancok","asu","kntl","ajg","benget sia","babi","ibab","mmk"]
      // callback
      const ceckName = kataToxic.some(cekname => name.includes(cekname))
      const ceckMessage = kataToxic.some(cekmessage => message.includes(cekmessage))
      if(ceckMessage || ceckName) {
        setNotif(<div className='bg-red-500 text-white p-2'>banyak istighfar deh jari lu, jangan ngarep ke kirim ye tunggu aja ampe botak</div>)
        return
      }

      if(name.length>7) {
        setNotif(<div className='bg-blue-500 text-white p-2'>panjang amat nama lu {name} ini bukan formulir daftar bikin ktp</div>)
      }

      const res = await fetch('/api/submits', {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name,message})
      })
      
      router.refresh()
      const named = name
      clearForm()
      setNotif(<div className='bg-blue-500 text-white p-2'>ThankYou pesan nya udah gua terima nih {named}</div>)
      setLoad(false)

      
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <>
      <main className="bg-gray-100 min-h-screen">
        <div className="fixed w-full">
          {notif}
        </div>
        <div className=" max-w-5xl mx-auto">
          <form onSubmit={formSubmit} className="flex flex-col items-center justify-center h-[80vh]">
          <h1 className="text-center font-bold">Pesan</h1>
            <div className='flex flex-col gap-[15px]'>
              <input autoComplete='false' value={name} onChange={e => setName(e.target.value)} type="text" name="name" id="name" className="shadow-md p-2 block w-[340px] sm:text-md border-gray-300 rounded-md" placeholder="siapa lu ?" />
              <input autoComplete='false' value={message} onChange={e => setMessage(e.target.value)} type="text" name="message" id="message" className="shadow-md p-2 block w-[340px] sm:text-md border-gray-300 rounded-md" placeholder="pesan apa nih" />
              {load ? (<button type="button" className="w-[340px] rounded-md py-2 bg-gray-500 text-white cursor-not-allowed" disabled>sebentar ye....</button>):(<button type="submit" className="w-[340px] rounded-md py-2 bg-blue-500 text-white transition ease-in-out duration-300 hover:bg-blue-700 hover:scale-95">Kirim</button>)}
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
