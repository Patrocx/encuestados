/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },
  borrarPregunta: function(id){
    this.modelo.borrarPregunta(id);
  },
  editarPregunta: function(id, nuevoTexto){
    this.modelo.editarPregunta(id, nuevoTexto);
  },
  borrarTodasPreguntas: function() {
    this.modelo.borrarTodasLasPreguntas();
  },
  agregarVoto: function(nombrePregunta, respuestaSeleccionada) {
    this.modelo.sumarVotoRespuesta(nombrePregunta, respuestaSeleccionada);
  }
};
