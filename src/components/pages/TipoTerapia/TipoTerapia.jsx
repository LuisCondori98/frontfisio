import { useParams } from "react-router-dom"

const TipoTerapia = () => {

    const {terapia} = useParams()

    console.log(terapia)

    return (
        <>{terapia}</>
    )
}

export default TipoTerapia