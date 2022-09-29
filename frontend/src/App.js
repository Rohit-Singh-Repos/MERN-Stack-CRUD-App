import { useState, useEffect } from "react"
import axios from "axios"
import { config } from "./config/config"

const App  = () => {
  const [inputVal, setInputVal] = useState({
    name:"",
    email:""
  })
  const [updatedInputValue, setUpdatedInputValue] = useState({
    name:"",
    email:""
  })
  const [userId, setUserId] = useState("")
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    getUserData()
  },[])

  const getUserData = async() => {
    try {
      setLoading(true)
      const getDataFromApi = await axios.get(`${config.dev_BaseUrl}/api/getuserdata`)
      setUserData(getDataFromApi.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleInputs = (e) => {
    const {name,value} = e.target
    setInputVal({
      ...inputVal,
      [name]:value
    })
  }

  const handleUpdatedInputs = (e) => {
    const {name,value} = e.target
    setUpdatedInputValue({
      ...updatedInputValue,
      [name]:value
    })
  }

  const sendData = async() => {
    try {
      const getDataFromApi = await axios(`${config.dev_BaseUrl}/api/saveuserdata`,{
        method:"post",
        data:{
          name:inputVal.name,
          email:inputVal.email
        }
      })
      getUserData()
      setInputVal({
        name:"",
        email:""
      })
    } catch (error) {
      console.log(error)
    }
  }

  const getUserById = async(itemId) => {
    setUserId(itemId)
    try {
      const getUserId = await axios(`${config.dev_BaseUrl}/api/getuserdatabyid/${itemId}`)
      if(Object.keys(getUserId.data).length !== 0){
        setUpdatedInputValue({
          name:getUserId.data.username,
          email:getUserId.data.useremail
        })
      }else{
        alert("Invalid Id")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updatedData = async () => {
    try {
      const updateUser = await axios(`${config.dev_BaseUrl}/api/updateuser`,{
        method:"put",
        data:{
          id:userId,
          name:updatedInputValue.name,
          email:updatedInputValue.email
        }
      })
      getUserData()
      setUpdatedInputValue({
        name:"",
        email:""
      })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteData = async(itemId) => {
    try {
      const deleteData = await axios(`${config.dev_BaseUrl}/api/deleteuserdata/${itemId}`,{
        method:"delete"
      })
      getUserData()
    } catch (error) {
      console.log(error)
    }
  }

  if(loading){
    return(
      <div className="container mt-5">
        <h4 className="text-center">Loading ... </h4>
      </div>
    )
  }

  return (
    <div className="container pt-5">
      <h3 className="text-center">Mern Stack Application</h3>
      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th scope="col">S.no.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {userData && userData.length !== 0 ? (
            userData.map((item, index) => (
              <tr key={item._id}>
                <th scope="row">{index + 1}</th>
                <td>{item.username}</td>
                <td>{item.useremail}</td>
                <td>
                  <button type="button" class="btn btn-primary" onClick={() => getUserById(item._id)}>Updated</button>
                  <button type="button" class="btn btn-danger ms-2" onClick={() => deleteData(item._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="p-5"><p className="text-center">No Data Found</p></td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="row">
      <div className="col-lg-6 col-sm-12">
      <h3 className="text-center mt-5 mb-5">Insert Data</h3>
      <div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" value={inputVal.name} onChange={handleInputs} name="name" placeholder="Enter name ..." />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="text" className="form-control" value={inputVal.email} name="email" onChange={handleInputs} placeholder="Enter email ..." />
        </div>
        </div>
        <button className="btn btn-primary" onClick={sendData}>Submit</button>
      </div>

      <div className="col-lg-6 col-sm-12">
      <h3 className="text-center mt-5 mb-5">Update Data</h3>
      <div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" disabled={updatedInputValue.name ? "" : "disabled"} value={updatedInputValue.name} onChange={handleUpdatedInputs} name="name" placeholder="Enter name ..." />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="text" className="form-control" disabled={updatedInputValue.email ? "" : "disabled"} value={updatedInputValue.email} name="email" onChange={handleUpdatedInputs} placeholder="Enter email ..." />
        </div>
        </div>
        <button className="btn btn-primary" disabled={updatedInputValue.name && updatedInputValue.email ? "" : "disabled"} onClick={updatedData}>Update</button>
      </div>
      </div>
    </div>
  );
}

export default App
