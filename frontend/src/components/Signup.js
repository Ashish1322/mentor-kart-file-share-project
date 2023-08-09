import React, {useContext,useState} from 'react'
import AppContext from '../AppContext'
import { Link } from 'react-router-dom'

export default function Signup() {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [name,setName] = useState("")

    const {signup,loading} = useContext(AppContext)

  return (
    <section  >
    <div className="container-fluid h-custom">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-md-9 col-lg-6 col-xl-5">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Sample image"
          />
        </div>
        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">

            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start mb-3">
              <p className="lead fw-normal mb-0 me-3">Create Account</p>
            
            </div>
           
        
            <div className="form-outline mb-3">
            <input
                onChange={e => setName(e.currentTarget.value) }
              type="text"
              id="form3Example4"
              className="form-control form-control-lg"
              placeholder="Enter Name"
            />
          </div>

            <div className="form-outline mb-4">
              <input
              onChange={e => setEmail(e.currentTarget.value) }
                type="email"
                id="form3Example3"
                className="form-control form-control-lg"
                placeholder="Enter a valid email address"
              />
            
            </div>
 
            <div className="form-outline mb-3">
              <input
              onChange={e => setPassword(e.currentTarget.value) }
                type="password"
                id="form3Example4"
                className="form-control form-control-lg"
                placeholder="Enter password"
              />
            </div>



            <div className="text-center text-lg-start mt-4 pt-2">
              <button
                onClick={() => {
                        signup(email,password,name)
                }}
                disabled={loading}
                type="button"
                className="btn btn-primary btn-lg"
                style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
              >
              {
                loading ? "Please Wait..." : " Create Account"
              }
               
              </button>
              <p className="small fw-bold mt-2 pt-1 mb-0">
                Already  have an account?{" "}
                <Link to="/" className="link-danger">
                  Login
                </Link>
              </p>
            </div>

  
        </div>
      </div>
    </div>
  
  </section>
  )
}
