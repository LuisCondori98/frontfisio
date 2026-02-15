import { useParams } from "react-router-dom"

const TipoTerapia = () => {

    const {terapia} = useParams()

    console.log(terapia)

    return (
        <main>
            {
                terapia === "terapia-ortopedica" ?
                (
                <section class="py-5 bg-light">
                    <div class="container">
                        <div class="row align-items-center">
                        
                        <div class="col-md-6">
                            <img src="img/ortopedica.jpg" class="img-fluid rounded shadow" alt="Fisioterapia Ortopédica" />
                        </div>

                        <div class="col-md-6">
                            <h2 class="fw-bold mb-3 text-primary">Fisioterapia Ortopédica</h2>
                            <p class="text-muted">
                            Tratamiento especializado en lesiones musculares, articulares y óseas.
                            Ideal para pacientes con fracturas, esguinces, tendinitis y recuperación post-quirúrgica.
                            </p>

                            <ul class="list-group list-group-flush mb-4">
                            <li class="list-group-item">✔ Rehabilitación post-operatoria</li>
                            <li class="list-group-item">✔ Tratamiento de lesiones deportivas</li>
                            <li class="list-group-item">✔ Terapia manual avanzada</li>
                            <li class="list-group-item">✔ Fortalecimiento muscular</li>
                            </ul>

                            <a href="#" class="btn btn-primary px-4">Agendar Cita</a>
                        </div>

                        </div>
                    </div>
                </section>
                )
                :
                terapia === "terapia-geriatrica" ? 
                (
                <section class="py-5">
                    <div class="container">
                        <div class="row align-items-center">

                        <div class="col-md-6 order-md-2">
                            <img src="img/geriatrica.jpg" class="img-fluid rounded shadow" alt="Fisioterapia Geriátrica" />
                        </div>

                        <div class="col-md-6 order-md-1">
                            <h2 class="fw-bold mb-3 text-success">Fisioterapia Geriátrica</h2>
                            <p class="text-muted">
                            Enfocada en mejorar la movilidad, equilibrio y calidad de vida en adultos mayores.
                            Prevención de caídas y tratamiento de enfermedades degenerativas.
                            </p>

                            <ul class="list-group list-group-flush mb-4">
                            <li class="list-group-item">✔ Rehabilitación post-ACV</li>
                            <li class="list-group-item">✔ Prevención de caídas</li>
                            <li class="list-group-item">✔ Terapia para artrosis</li>
                            <li class="list-group-item">✔ Mejora del equilibrio</li>
                            </ul>

                            <a href="#" class="btn btn-success px-4">Solicitar Evaluación</a>
                        </div>

                        </div>
                    </div>
                    </section>
                )
                :
                terapia === "terapia-pediatrica" ?
                (
                <section class="py-5 bg-light">
                    <div class="container">
                        <div class="row align-items-center">
                        
                        <div class="col-md-6">
                            <img src="img/pediatrica.jpg" class="img-fluid rounded shadow" alt="Fisioterapia Pediátrica" />
                        </div>

                        <div class="col-md-6">
                            <h2 class="fw-bold mb-3 text-warning">Fisioterapia Pediátrica</h2>
                            <p class="text-muted">
                            Atención especializada para bebés y niños con alteraciones del desarrollo motor,
                            parálisis cerebral, problemas posturales o retrasos psicomotores.
                            </p>

                            <ul class="list-group list-group-flush mb-4">
                            <li class="list-group-item">✔ Estimulación temprana</li>
                            <li class="list-group-item">✔ Terapia para escoliosis</li>
                            <li class="list-group-item">✔ Reeducación postural</li>
                            <li class="list-group-item">✔ Seguimiento del desarrollo</li>
                            </ul>

                            <a href="#" class="btn btn-warning text-white px-4">Agendar Consulta</a>
                        </div>

                        </div>
                    </div>
                    </section>
                )
                :
                terapia === "terapia-reumatologica" ?
                (
                <section class="py-5">
                    <div class="container">
                        <div class="row align-items-center">

                        <div class="col-md-6 order-md-2">
                            <img src="img/reumatologica.jpg" class="img-fluid rounded shadow" alt="Fisioterapia Reumatológica" />
                        </div>

                        <div class="col-md-6 order-md-1">
                            <h2 class="fw-bold mb-3 text-danger">Fisioterapia Reumatológica</h2>
                            <p class="text-muted">
                            Tratamiento integral para enfermedades reumáticas como artritis,
                            lupus y fibromialgia. Mejora la movilidad y reduce el dolor crónico.
                            </p>

                            <ul class="list-group list-group-flush mb-4">
                            <li class="list-group-item">✔ Terapia para artritis</li>
                            <li class="list-group-item">✔ Reducción del dolor crónico</li>
                            <li class="list-group-item">✔ Movilización articular</li>
                            <li class="list-group-item">✔ Ejercicios terapéuticos personalizados</li>
                            </ul>

                            <a href="#" class="btn btn-danger px-4">Reservar Cita</a>
                        </div>

                        </div>
                    </div>
                    </section>
                )
                :
                <>Terapia no encontrada</>
            }
        </main>
    )
}

export default TipoTerapia