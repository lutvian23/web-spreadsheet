'use client'
import { useState } from "react";



export default function Home() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [load, setLoad] = useState(false)

  const clearForm = () => {
    setName("")
    setMessage("")
  }

  const formSubmit = async (e) => {
    e.preventDefault()
    setLoad(true)

    try {
      const res = await fetch('http://localhost:3000/api/submits', {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name,message})
      })
  
      if(!res.ok) {
        console.log('gagal respon')
        clearForm()
        setLoad(false)
        return
      }

      clearForm()
      setLoad(false)
      return
    } catch (error) {
      console.log(error.message)
      return
    }
  }
  return (
    <>
      <main className="bg-gray-100 min-h-screen">
        <div className="max-w-5xl mx-auto py-16">
          <h1 className="text-center font-bold">Pesan</h1>
          <form onSubmit={formSubmit} className="flex items-center flex-col gap-2 justify-center">
            <input value={name} onChange={e => setName(e.target.value)} type="text" name="name" id="name" className="shadow-md p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-64 sm:text-md border-gray-300 rounded-md" placeholder="sapa lu ?" />
            <input value={message} onChange={e => setMessage(e.target.value)} type="text" name="message" id="message" className="shadow-md p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-64 sm:text-md border-gray-300 rounded-md" placeholder="pesan apa nih" />
            {load ? (<button type="submit" className="w-64 rounded-md py-2 bg-gray-500 text-white cursor-not-allowed" disabled>loading...</button>):(<button type="submit" className="w-64 rounded-md py-2 bg-blue-500 text-white transition ease-in-out duration-300 hover:bg-blue-700 hover:scale-95">Kirim</button>)}
          </form>
        </div>
      </main>
    </>
  );
}
