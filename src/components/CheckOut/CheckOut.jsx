const CheckOut = () => {

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">

          <div className="card shadow-sm border-0">
            <div className="card-body p-4">

              <h4 className="mb-4 text-center fw-semibold">
                Realizar Pago
              </h4>

              {/* Monto */}
              <div className="mb-3">
                <label className="form-label">Monto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Ingrese el monto"
                />
              </div>

              {/* Método de pago */}
              <div className="mb-4">
                <label className="form-label">Método de Pago</label>

                <div className="d-flex justify-content-between gap-3">

                  <button className="btn btn-light border w-100 d-flex align-items-center justify-content-center">
                    <img
                      src="https://seeklogo.com/images/Y/yape-logo-3E473EEBA4-seeklogo.com.png"
                      alt="Yape"
                      width="60"
                    />
                  </button>

                  <button className="btn btn-light border w-100 d-flex align-items-center justify-content-center">
                    <img
                      src="https://seeklogo.com/images/P/plin-logo-2F8D1C91C6-seeklogo.com.png"
                      alt="Plin"
                      width="60"
                    />
                  </button>

                  <button className="btn btn-light border w-100 d-flex align-items-center justify-content-center">
                    💳
                  </button>

                </div>
              </div>

              {/* Botón pagar */}
              <div className="d-grid">
                <button className="btn btn-primary">
                  Confirmar Pago
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckOut;
