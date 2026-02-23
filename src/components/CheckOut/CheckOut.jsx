import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";

const CheckOut = () => {
  const [metodo, setMetodo] = useState("");

  const {total, cita} = useContext(CartContext)

  console.log(total, cita)

  return (
    <div className="container py-5">
      <div className="row g-4">

        {/* COLUMNA IZQUIERDA - MÉTODOS DE PAGO */}
        <div className="col-md-7">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">

              <h5 className="mb-4 fw-semibold">Método de Pago</h5>

              {/* TARJETA */}
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="metodoPago"
                  onChange={() => setMetodo("tarjeta")}
                />
                <label className="form-check-label fw-medium">
                  Tarjeta de Crédito / Débito
                </label>
              </div>

              {metodo === "tarjeta" && (
                <div className="border rounded p-3 mb-3 bg-light">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Número de tarjeta"
                    />
                  </div>
                  <div className="row">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="MM/AA"
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="CVV"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* BILLETERAS */}
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="metodoPago"
                  onChange={() => setMetodo("billetera")}
                />
                <label className="form-check-label fw-medium">
                  Billeteras Digitales
                </label>
              </div>

              {metodo === "billetera" && (
                <div className="border rounded p-3 bg-light">
                  <div className="d-flex justify-content-between gap-3">

                    <button className="btn btn-light border w-100">
                      <img
                        src="/img/yape-logo.jpg"
                        alt="Yape"
                        width="60"
                      />
                    </button>

                    <button className="btn btn-light border w-100">
                      <img
                        src="/img/plin-logo.jpg"
                        alt="Plin"
                        width="60"
                      />
                    </button>

                    <button className="btn btn-light border w-100">
                      <img
                        src="/img/mercado-logo.png"
                        alt="MercadoPago"
                        width="60"
                      />
                    </button>

                  </div>
                </div>
              )}

              <div className="d-grid mt-4">
                <button className="btn btn-primary">
                  Confirmar Pago
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA - RESUMEN */}
        <div className="col-md-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">

              <h5 className="mb-4 fw-semibold">Resumen del Tratamiento</h5>

              <img
                src="https://via.placeholder.com/400x250"
                alt="Tratamiento"
                className="img-fluid rounded mb-3"
              />

              <h6 className="fw-medium">Tratamiento terapeutico</h6>
              {
                cita.map(c => (
                  <p className="text-muted small">{c.motivo}</p>
                ))
              }

              <hr />

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>S/. {total}</span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <h5>IGV</h5>
                <h5>S/ 18.00</h5>
              </div>

              <hr />

              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total</span>
                <span>S/. {total + 18}</span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckOut;
