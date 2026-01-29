import axios from "axios";
import { useState } from "react"
import { useParams } from "react-router-dom"

const EditProfile = () => {

    const [user, setUser] = useState({})

    const {dni} = useParams()

    axios.get(`https://back-fisioterapia.onrender.com/api/user/getdni/${dni}`)
        .then(response => console.log(response.data))

    //console.log(user)

    return (
        <>
        </>
    )
}

export default EditProfile