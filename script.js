class Proceso {
  constructor(
    nombre,
    propietario,
    departamento,
    tiempoEjecucionEstimado,
    cantidadMateriales,
    localizacionOrigen,
    localizacionFinal
  ) {
    this.nombre = nombre;
    this.propietario = propietario;
    this.departamento = departamento;
    this.tiempoEjecucionEstimado = tiempoEjecucionEstimado;
    this.cantidadMateriales = cantidadMateriales;
    this.localizacionOrigen = localizacionOrigen;
    this.localizacionFinal = localizacionFinal;
  }

  setNombre(_nombre) {
    this.nombre = _nombre;
  }

  getNombre() {
    return this.nombre;
  }
}

let proceso;
proceso = Proceso(
  "Manufactura",
  "Jose",
  "Ventas",
  50,
  50,
  "Georgia",
  "Kentucky"
);

