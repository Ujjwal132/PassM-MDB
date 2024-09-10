import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    setPasswordArray(passwords)
  }


  useEffect(() => {
    getPasswords()
  }, [])

  const copyText = (text) => {
    toast('Copied to clipboard!', {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text)
  }


  const showPassword = () => {

    if (ref.current.src.includes("icons/eye.png")) {
      ref.current.src = "icons/eyecross.png"
      passwordRef.current.type = "password"
    }
    else {
      passwordRef.current.type = "text"
      ref.current.src = "icons/eye.png"
    }

  }

  const savePassword = async () => {


    if (form.site.length > 2) {

      const newPassword = { ...form, id: form.id || uuidv4() };

    // Check if it's an edit or new entry
    if (form.id) {
      // If it's an edit, make a PUT request
      await fetch(`http://localhost:3000/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPassword),
      });
    } else {
      // If it's a new password, make a POST request
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPassword),
      });
    }

      // Update password array and reset form
      setPasswordArray([...passwordArray.filter(item => item.id !== form.id), newPassword]);


      // Clear the form and show toast
      setform({ site: "", username: "", password: "" })
      toast.success('Password saved!', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    else {
      toast.error('Password not saved', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      toast.warning('Site name should be more than 2 characters', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  const deletePassword = async (id) => {
    let c = confirm("Do you want to delete this password?")
    if (c) {
      setPasswordArray(passwordArray.filter(item => item.id !== id))

      await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

      toast.error('Password deleted!', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  const editPassword = async (id) => {
    // Find the entry to edit and set it in the form
  const passwordToEdit = passwordArray.find(i => i.id === id);
  setform(passwordToEdit);
  
  // Remove the entry from the table so it doesn't show up during editing
  setPasswordArray(passwordArray.filter(item => item.id !== id));

  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }




  return (
    <>

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />



      <div className="p-8 md:mycontainer">
        <h1 className="text-4xl text-white font-bold text-center">
          <span className="text-blue-500">&lt;</span>
          Pass
          <span className="text-blue-500">M&gt;</span>
        </h1>
        <p className="text-lg text-blue-600 text-center">
          The Password Manager
        </p>
        <div className="text-black flex flex-col p-4 gap-6 items-center">
          <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className="rounded-full border-2 border-blue-400 w-full p-4 py-1" type="text" name="site" id="site" />
          <div className="flex flex-col md:flex-row w-full items-center gap-8">

            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className="rounded-full border-2 border-blue-400 w-full md:w-1/2 p-2 py-1" type="text" name="username" id="username" />
            <div className="w-full relative md:w-1/2">

              <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className="rounded-full border-2 border-blue-400 w-full p-2 py-1" type="password" name="password" id="password" />
              <span className="absolute right-[2px] top-[4.1px] cursor-pointer" onClick={showPassword}>
                <img ref={ref} className="p-1" width={30} src="icons/eyecross.png" alt="eye" />
              </span>
            </div>
          </div>

          <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-400 rounded-full px-6 py-1.5 w-fit'>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover" >
            </lord-icon>
            Save</button>
        </div>

        <div className="passwords text-white overflow-x-auto">
          <h2 className="font-bold text-2xl py-5">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords are there</div>}
          {passwordArray.length != 0 &&

            <table className="table-auto w-full rounded-lg overflow-hidden mb-10 text-xs sm:text-base">
              <thead className="bg-violet-900">
                <tr>
                  <th>Site</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white/10">
                {passwordArray.map((item, index) => {
                  return <tr key={index}>
                    <td className='py-1 text-center'>
                      <div className='flex items-center justify-center '>
                        <a href={item.site} target='_blank'>{item.site}</a>
                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px", "filter": "invert(1)" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover" >
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='py-1 text-center'>
                      <div className='flex items-center justify-center '>
                        <span>{item.username}</span>
                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px", "filter": "invert(1)" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover" >
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='py-1 text-center'>
                      <div className='flex items-center justify-center '>
                        <span>{"*".repeat(item.password.length)}</span>
                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px", "filter": "invert(1)" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover" >
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='text-center'>
                      <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/gwlusjdu.json"
                          trigger="hover"
                          style={{ "width": "25px", "height": "25px", "filter": "invert(1)" }}>
                        </lord-icon>
                      </span>
                      <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{ "width": "25px", "height": "25px", "filter": "invert(1)" }}>
                        </lord-icon>
                      </span>
                    </td>
                  </tr>
                })}


              </tbody>
            </table>}

        </div>
      </div>

    </>
  );
};

export default Manager;
