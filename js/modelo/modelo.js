/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntaEditada= new Evento(this);
  this.todoBorrado = new Evento(this);
  this.votoAgregado = new Evento(this);

  this.cargar();
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    var cantPreguntas = this.preguntas.length;
    var ultimoId;
    if (cantPreguntas == 0){
      ultimoId = 0;
    } else {
      ultimoId = this.preguntas[cantPreguntas-1].id
    }
    return ultimoId;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  //Se obtiene obtiene una pregunta por su id y se la elimina del array de preguntas
  borrarPregunta: function(id) {
    var arrayPreguntas = this.preguntas;
    var arrayFiltrado = arrayPreguntas.filter(arrayPreguntas => arrayPreguntas.id != id);
    this.preguntas = arrayFiltrado;
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  //Se obtiene por parametro una pregunta y el texto con el que se modificara la misma
  editarPregunta: function(id, nuevoTexto) {
    var preguntaAEditar = this.preguntas[id-1];
    preguntaAEditar.textoPregunta = nuevoTexto;
    this.preguntas.splice([id-1], 1, preguntaAEditar);
    this.guardar();
    this.preguntaEditada.notificar();
  },

  //Se borran todas las preguntas de su array
  borrarTodasLasPreguntas: function() {
    this.preguntas = [];
    this.guardar();
    this.todoBorrado.notificar();
  },

  //Se resiven el la pregunta y el voto, para agregarlo de forma correcta 
  sumarVotoRespuesta: function(nombrePregunta,respuestaSeleccionada){
    this.preguntas.forEach(function(pregunta){      
      if(pregunta.textoPregunta === nombrePregunta){

        //se recorren las preguntas
        pregunta.cantidadPorRespuesta.forEach(function(respuesta){
          if(respuesta.textoRespuesta == respuestaSeleccionada){
            respuesta.cantidad++;    
          }

        });
      }
    });
    this.guardar();
    this.votoAgregado.notificar();
  },

  //se guardan las preguntas en Local Storage
  guardar: function(){
    localStorage.setItem('encuestas', JSON.stringify(this.preguntas));
  },

  //Si hay informacion en Local Storage, se carga en la vistas, de lo contrario se muestra vacia
  cargar: function(){
    var datosLocalStorage = JSON.parse(localStorage.getItem('encuestas'));
    if (datosLocalStorage == null){
      this.preguntas = [];
    } else {
      this.preguntas = datosLocalStorage;
    }
  }
};
