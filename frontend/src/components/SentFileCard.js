import React from 'react'

export default function SentFileCard({name,email,description,filedetails}) {
  return (
    <div className="card mt-2" style={{ width: "18rem" }}>
    <div className="card-body">
      <h5 className="card-title">{filedetails && filedetails.filename}</h5>
      <p>
          <b> File Size </b>: {filedetails && filedetails.size } Bytes
        <br />
        <b> Receiver Email </b>: {email}
        <br />
        <b> Receiver Name </b>: {name}
        <br />
        <b> Description </b>: {description}
      </p>
     
     
    </div>
  </div>
  )
}
