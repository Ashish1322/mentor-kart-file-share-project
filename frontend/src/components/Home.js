import React, {useContext, useEffect, useState} from 'react'
import AppContext from '../AppContext'
import SentFileCard from './SentFileCard'
import ReceiveFileCard from './ReceiveFileCard'

export default function Home() {
    const {shareFile,fetchSentFiles,fetchReceivedFiles,user,sentFiles,receivedFiles} = useContext(AppContext)

    useEffect(() => {
      fetchSentFiles();
      fetchReceivedFiles();
    },[user])

 

  

    const [email,setEmail] = useState("")
    const [description,setDesc] = useState("")
    const [file,setFile] = useState(null)

  return (
    <div>
    <h2>Welcome Ashish</h2>

    <div className="card" style={{ width: "28rem" }}>
        <div className="card-body">
          <h5 className="card-title">Choose File to Upload</h5>
          <p className="card-text">We ensure fast, safe Share !</p>

          <div className="mb-3">
            <input
              onChange={e => setEmail(e.currentTarget.value)}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Email of Receiver"
            />
            <div className="mt-3">
            <input
            onChange={e => setDesc(e.currentTarget.value)}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Description"
            />
          </div>
            
            <div className="mt-3">
              <input
                onChange={e => setFile(e.currentTarget.files[0]) }
                type="file"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
          </div>

          <button
          onClick={() => {
            shareFile(description,file,email)
          }}
           className="btn btn-primary">
            Share
          </button>
        </div>
      </div>
      <hr />


      <div className="row mt-3">

      <div className="col col-md-6">
        <p className="text-center">Received Files <button onClick={() => fetchReceivedFiles()}>Refresh</button></p>
        {
          receivedFiles.map( file => <ReceiveFileCard id={file._id} filedetails={file.filedetails} name={file.owner.name}  email={file.owner.email} desc={file.description}/>)
        }
      </div>

      <div className="col col-md-6">
      <p className="text-center">Sent Files</p>
      {
        sentFiles.map( file => <SentFileCard filedetails={file.filedetails} description={file.description} name={file.to.name} email={file.to.email} />)
      }
      </div>

      </div>
    </div>
  )
}
