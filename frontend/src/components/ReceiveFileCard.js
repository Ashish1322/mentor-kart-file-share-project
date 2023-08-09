import React from 'react'
export default function ReceiveFileCard({email,name,desc,filedetails,id}) {

 

  return (
    <div className="card mt-2" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{filedetails && filedetails.filename}</h5>
        <p className="card-text">
          <b> File Size </b>: {filedetails && filedetails.size} Bytes
          <br />
          <b> From  Email</b>: {email}
          <br />
          <b> From  Name</b>: {name}
          <br />
          <b> Desc </b>: {desc}
        </p>
        <a href={`http://localhost:3001/files/download/${id}`} className="btn btn-primary">
          Download
        </a>
      </div>
    </div>
  )
}
