import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


const Contacto = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

const onSubmit = (data) => {
Swal.fire({
  title: "¡Consulta enviada con éxito!",
  text: "Gracias por escribirnos.",
  icon: "success",
  confirmButtonText: "Aceptar",
  confirmButtonColor: "#1bc1dfff"
});

  reset()
}

  return (
    <section className="py-3">
      <h1 className="py-2 text-center base-footer text-light">Contacto</h1>
      <article className="container  mt-3  border p-3 rounded shadow mb-5">
        <h5 className="text-center fw-bold">Envianos tu consulta</h5>
        <div className="row row-cols-1 row-cols-md-2 g-4">
        <div className="col">
            <Form className="py-2" onSubmit={handleSubmit(onSubmit)}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Nombre y apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ej: juan perez"
                  {...register("nombreCompleto", {
                    required: "El nombre completo es obligatorio.",
                    minLength: { value: 5, message: "Mínimo 5 caracteres" },
                    maxLength: { value: 50, message: "Máximo 50 caracteres" },
                  })}
                />
                {errors.nombreCompleto && (
                  <span className="text-danger">
                    {errors.nombreCompleto.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ej: juan_perez@gmail.com"
                  {...register("email", {
                    required: "El email es obligatorio",
                    pattern: {
                      value:
                        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                      message: "Email inválido",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-danger">{errors.email.message}</span>
                )}
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Télefono</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="ej: 381-1115469"
                  {...register("telefono", {
                    required: "El numero de telefono es obligatorio",
                    pattern: {
                      value: /^[0-9]{2,4}\s?[0-9]{4}-?[0-9]{4}$/,
                      message: "Teléfono inválido",
                    },
                  })}
                />
                {errors.telefono && (
                  <span className="text-danger">{errors.telefono.message}</span>
                )}
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Consulta</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Escriba su consulta"
                  {...register("consulta", {
                    required: "Este campo es obligatorio",
                    minLength: {
                      value: 10,
                      message: "La consulta debe tener al menos 10 caracteres",
                    },
                  })}
                />
                {errors.consulta && (
                  <Form.Text className="text-danger">
                    {errors.consulta.message}
                  </Form.Text>
                )}
              </Form.Group>
              <Button variant="info" type="submit" className="float-end">
                Enviar
              </Button>
            </Form>
          </div>
          <div className="col-12 col-md-6 col-lg-6 ">
            <iframe
              className="w-100 rounded-3 py-2 border border-success"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.1059174722677!2d-65.20974192459575!3d-26.83658327669253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses-419!2sar!4v1745540374558!5m2!1ses-419!2sar"
              height="350"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div>
              <p className="text-secondary lead fs-6 m-3">
                <i className="bi bi-geo-fill pe-2 fs-4"></i>Gral. Jose Maria Paz
                576
              </p>
            </div>
            <div className="border-top">
              <p className="text-secondary lead fs-6 m-3">
                <i className="bi bi-envelope-at-fill pe-2 fs-4"></i>
                vici_AR@gmail.com
              </p>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Contacto;