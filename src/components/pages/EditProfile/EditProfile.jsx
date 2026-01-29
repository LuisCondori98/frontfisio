import { useParams } from "react-router-dom"

const EditProfile = () => {

    const {id} = useParams()

    return (
        <>
            Edit
            {
                id
            }
        </>
    )
}

export default EditProfile