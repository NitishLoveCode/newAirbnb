import React, { useState } from 'react'
import "../css/createplace.css"
import axios from "axios";


export default function Createplace() {

    const[title,settitle]=useState('')
    const[address,setaddress]=useState('')
    const[urlphoto, seturlphoto]=useState('')
    const[allimages,setallimages]=useState([])
    const[description, setdescription]=useState('')
    const[allperks,setallperks]=useState([])
    const[extrainfo,setextrainfo]=useState('')
    const[checktime,setchecktime]=useState({
        in_time:"", out_time:"", max_guest:""
    })


    const perks=(e)=>{
        const name=e.target.name
        if(allperks && allperks.includes(name)){
            setallperks([...allperks.filter(allname=>allname !==name)])
        }else(
            setallperks([...allperks,name])
            
        )
        // console.log(allperks && allperks.includes(name))
    }

    const cheack_in_out=(e)=>{
        const name=e.target.name
        const value=e.target.value
        setchecktime({...checktime,[name]:value})
    }

    // -------------------image upload by url--------------------
    
    const by_url_upload=async(e)=>{
        e.preventDefault()
        if(urlphoto){
            try{
                const res=await fetch("http://localhost:8000/upload-by-url",{
                    credentials:'include',
                    method:"POST",
                    headers:{
                        "content-type":"application/json"
                    },
                    body:JSON.stringify({
                        urlphoto
                    })
                })
                const res_data=await res.json()
                setallimages([...allimages,res_data])
            }catch{
                
            }
        }else{
            alert("No url found.")
        }
    }
    // ---------------------------------------remove_img------------------------------------

    const remove_img=(e)=>{
        setallimages(allimages.filter(remove_img=>remove_img !==e))
    }
    // ---------------------------------------upload_local-------------------------

    

    const upload_local=async(ev)=>{
        const files=ev.target.files
        const data= new FormData()
        for(let i=0;i<files.length;i++){
            data.append('photos',files[i])
        }
        try{
            axios.post("http://localhost:8000/local-img-upload",
            data,{
                headers:{
                    "Content-type":"mulitpart/form-data"
                }
            }).then(res=>{
                setallimages([...allimages,...res.data])
            })
        }catch(err){
            console.log(err)
        }
    }


    // const[title,settitle]=useState('')
    // const[address,setaddress]=useState('')
    // const[urlphoto, seturlphoto]=useState('')
    // const[allimages,setallimages]=useState([])
    // const[description, setdescription]=useState('')
    // const[allperks,setallperks]=useState([])
    // const[extrainfo,setextrainfo]=useState('')
    // const[checktime,setchecktime]=useState({
    //     in_time:"", out_time:"", max_guest:""
    // })
    // ---------------------------------create_new_post-------------------

    const create_new_post=async(e)=>{
        e.preventDefault()
        if(title,address,allimages,description,allperks,extrainfo,checktime){
            try{
                const res=await fetch("http://localhost:8000/new-post",{
                    credentials:'include',
                    method:"POST",
                    headers:{
                        "content-type":"application/json"
                    },
                    body:JSON.stringify({
                        title,
                        address,
                        allimages,
                        description,
                        allperks,
                        extrainfo,
                        checktime
                    })
                })
            }catch(err){
                console.log(err)
            }

        }else(
            alert('Fill all require form.')
        )
    }
    

  return (
        <div className="main_place">
            <form action="">
                <div className="fields">
                    <h2>Title</h2>
                    <p>Title for your place is short and catchy like in advertisement.</p>
                    <input id='input' type="text" placeholder='Title for example, My Lovely apart'
                    value={title} onChange={e=>settitle(e.target.value)} />
                </div>
                <div className="fields">
                    <h2>Address</h2>
                    <input id='input' type="text" placeholder='Address' 
                        value={address} onChange={e=>setaddress(e.target.value)}
                    />
                </div>
                <div className="fields">
                    <p>more=better</p>
                    <h2>Photos</h2>
                    <div className="add_by_url">
                        <input id='input' type="text" placeholder='Add using a link .jpg' 
                            value={urlphoto} onChange={e=>seturlphoto(e.target.value)}
                        />
                        <button onClick={by_url_upload}>Add Photos</button>
                    </div>
                    <div className="local_upload">
                        <input type="file" id="file-upload" onChange={upload_local} multiple/>
                        <label for="file-upload">
                            <div className="button">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                </svg>
                                <p>Upload</p>
                            </div>
                        </label>
                            
                    </div>
                    
                </div>
                <div className="uploaded_images">

                    {
                        allimages && allimages.map((img)=>{
                            return (<>
                                <div className="all_img">
                                    <img src={`http://localhost:8000/uploads/${img}`} alt={img} />

                                    <div className="img_action">
                                        <svg onClick={e=>remove_img(img)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-2 h-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                        </svg>
                                    </div>
                                </div>
                                </>
                            )
                        })
                    }
                
                </div>
                <div className="fields">
                    <h2>Description</h2>
                    <p>Dectiption of the place</p>
                    <textarea name="description" id="description"
                        value={description} onChange={e=>setdescription(e.target.value)}
                    />
                </div>

                <div className="fields">
                    <h2>Perks</h2>
                    <p>Select all the perks of your place</p>
                    <div className="main_perks">
                        <div className="all_perks">
                            <input type="checkbox" name='wifi' onChange={perks}/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                            </svg>
                            <span>Wifi</span>
                        </div>

                        <div className="all_perks">
                            <input type="checkbox" name='parking' onChange={perks}/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>

                            <span>Free parking spot</span>
                        </div>


                        <div className="all_perks">
                            <input type="checkbox" name='tv' onChange={perks}/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                            </svg>

                            <span>TV</span>
                        </div>



                        <div className="all_perks">
                            <input type="checkbox" name='radio' onChange={perks}/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0012 6.75zm-1.683 6.443l-.005.005-.006-.005.006-.005.005.005zm-.005 2.127l-.005-.006.005-.005.005.005-.005.005zm-2.116-.006l-.005.006-.006-.006.005-.005.006.005zm-.005-2.116l-.006-.005.006-.005.005.005-.005.005zM9.255 10.5v.008h-.008V10.5h.008zm3.249 1.88l-.007.004-.003-.007.006-.003.004.006zm-1.38 5.126l-.003-.006.006-.004.004.007-.006.003zm.007-6.501l-.003.006-.007-.003.004-.007.006.004zm1.37 5.129l-.007-.004.004-.006.006.003-.004.007zm.504-1.877h-.008v-.007h.008v.007zM9.255 18v.008h-.008V18h.008zm-3.246-1.87l-.007.004L6 16.127l.006-.003.004.006zm1.366-5.119l-.004-.006.006-.004.004.007-.006.003zM7.38 17.5l-.003.006-.007-.003.004-.007.006.004zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007zm-.5 1.873h-.008v-.007h.008v.007zM17.25 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 4.5a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                            </svg>

                            <span>Radio</span>
                        </div>

                        <div className="all_perks">
                            <input type="checkbox" name='pets' onChange={perks}/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                            </svg>

                            <span>Pets</span>
                        </div>

                        <div className="all_perks">
                            <input type="checkbox" name='private entrence' onChange={perks} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
                            </svg>

                            <span>Private Enterance</span>
                        </div>
                    </div>
                </div>


                <div className="fields">
                    <h2>Extra Info</h2>
                    <p>House rule, etc</p>
                    <textarea name="extra info" id="description"
                        value={extrainfo} onChange={e=>setextrainfo(e.target.value)}
                    />
                </div>


                <div className="fields">
                    <h2>Cheack in & out Times</h2>
                    <p>You can add hous in and out time here</p>
                    <div className="main_perks">
                        
                        <div className="all_perks">
                        
                            <input id='inandout' placeholder='14:00 cheack in time' type="text" 
                                name='in_time' onChange={cheack_in_out}
                            />
                        </div>

                        <div className="all_perks">
                        
                            <input id='inandout' placeholder='14:00 cheack out time' type="text" 
                                name='out_time' onChange={cheack_in_out}
                            />
                        </div>


                        <div className="all_perks">
                        
                            <input id='inandout' placeholder='Max number of Guest' type="text" 
                                name='max_guest' onChange={cheack_in_out}
                            />
                        </div>
                        </div>
                        </div>

                       <div className="final_save">
                        <button onClick={create_new_post}>Create Place</button>
                       </div>
            </form>
        </div>
  )
}
