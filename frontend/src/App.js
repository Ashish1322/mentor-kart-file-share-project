
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import AppContext from './AppContext';
import { useState } from 'react';
import ProtectedRoute from './ProtectedRoute';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


function App() {

  const [user,setUser] = useState(null)
  const [loading,setLoading] = useState(false)

  const [sentFiles,setSentFiles ] = useState([])
  const [receivedFiles,setReceivedFiles] = useState([])

  const baseUrl = "http://localhost:3001"
  const navigate = useNavigate();

  const showAlert  = (message, error = true) =>
  {
    if(error)
    {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    else
    {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }


  const login = (email,password) => {
    setLoading(true)

   fetch(baseUrl + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email,password})
   })
   .then(res => res.json())
   .then(data => {
      // once loggin is successfull then move to dashboared
      if(data.success)
      {
        setUser(data)
        showAlert("Login Success",false)
        navigate("/dashboard",{replace:true})
      }
      else
      {
        showAlert(data.message)
      }

      setLoading(false)
     
      
   })
   .catch(err => 
    {
      alert(err.message)
      setLoading(false)
    }
  
    )

  }

  const signup = (email,password,name) => {
    setLoading(true)
    fetch(baseUrl + "/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email,password,name})
     })
     .then(res => res.json())
     .then(data => {
        // once loggin is successfull then move to dashboared
        if(data.success)
        {
          setUser(data)
          showAlert(data.message,false)
          navigate("/",{replace:true})
        }
        else
        {
          showAlert(data.message)
        }

        setLoading(false)
       
        
     })
     .catch(err => {
      setLoading(false)
      alert(err.message)})
  }

  const shareFile = (description,file,email) => {
    const formData = new FormData();
    formData.append("receiverEmail",email)
    formData.append("description",description)
    formData.append("file",file)

    fetch(baseUrl+"/files/upload-file", {
        method: 'POST',
        body: formData,
        headers: {
          "Authorization": user.token
        }
    })
    .then((res) => res.json())
    .then(data => {
      if(data.success)
      {
        showAlert("File Shared",false)
        fetchSentFiles()
      }
      else
      {
        showAlert(data.message)
      }
    })
    .catch((err) =>  showAlert(err.message));
  }

  const fetchSentFiles = () => {
    fetch(baseUrl + "/files/get-sent-files", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": user.token
      }
     })
     .then(res => res.json())
     .then(data => {
      if(data.success)
      {
        setSentFiles(data.files)
      }
      else
      {
        showAlert(data.message)
      }
     })
     .catch(err => showAlert("Issues while fetching data "))
  }

  const fetchReceivedFiles = () => {
    fetch(baseUrl + "/files/get-received-files", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": user.token
      }
     })
     .then(res => res.json())
     .then(data => {
      if(data.success)
      {
        setReceivedFiles(data.files)
      }
      else
      {
        showAlert(data.message)
      }
     })
     .catch(err => showAlert("Issues while fetching data "))
  }



  return (
    <AppContext.Provider value={{user,login,signup,loading,shareFile,fetchSentFiles,fetchReceivedFiles,sentFiles,receivedFiles}}>
      <ToastContainer />
      <div className="center-main">
        <Routes>
          <Route path='/' element={ <Login />} />
          <Route path='/signup' element={ <Signup />} />
          <Route path='/dashboard' element={ <ProtectedRoute> <Home /> </ProtectedRoute>} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
