//PROYECTO TERMINADO
//Probando Git como control de versiones
//Proyecto que simula un carrito de compras desarrollado en JavaScript utilizando LocalStorage

//Variables------------------------------------------------

const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');


//Listeners------------------------------------------------
cargarEventListeners();

function cargarEventListeners(){

// dispara cuando se presiona "agregar al carrito"
cursos.addEventListener('click', comprarCurso);

//cuando se elimina un curso del carrito
carrito.addEventListener('click',eliminarCurso);

//Al vaciar el carrito
vaciarCarritoBtn.addEventListener('click',vaciarCarrito);

//Al cargar el documento, mostrar LocalStorage
document.addEventListener('DOMContentLoaded', leerLocalStorage)
}



//Functions--------------------------------------------------

//Funcion que añade el curso al carrito
function comprarCurso(e){//leemos la clase
     e.preventDefault();

     if(e.target.classList.contains('agregar-carrito')){
          const curso = e.target.parentElement.parentElement;
          
          //enviamos el curso seleccionado para tomar sus datos
          leerDatosCurso(curso);
     }
     
}


//Lee los datos del curso
function leerDatosCurso(curso){

     const infoCurso = {
          imagen : curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute ('data-id')
     }
     insertarCarrito(infoCurso);
}


//muestra el curso seleccionado en el carrito
function insertarCarrito(curso){
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>

                    <img src="${curso.imagen}">
               
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}"
                    ">x</a>
               </td>
          `;
          listaCursos.appendChild(row);
          guardarCursoLocalStorage(curso);
}

//Elimina el curso del carrito en el DOM
function eliminarCurso(e){
     e.preventDefault();

    let curso;
    let cursoId;
    if(e.target.classList.contains('borrar-curso')){
          e.target.parentElement.parentElement.remove();
          curso = e.target.parentElement.parentElement;
          cursoId = curso.querySelector('a').getAttribute('data-id');
          
    }

    eliminarCursoLocalStorage(cursoId);
}


//Elimina los cursos del carrito en el DOM
function vaciarCarrito(){
     //forma lenta no recomendada
     //listaCursos.innerHTML = "";

     //Forma rapida y recomendada
     while (listaCursos.firstChild) {
          listaCursos.removeChild(listaCursos.firstChild);
     }
     

     //Vaciar LocalStorage
     vaciarLocalStorage();
     return false;
}

//Almacena cursos en el carrito a local Storage

function guardarCursoLocalStorage(curso){
     let cursos;
     //Toma el valor de un arreglo con datos de LS o vacio
     cursos = obtenerCursosLocalStorage();

     //El curso seleccionado se agrega al Arreglo
     cursos.push(curso);

     localStorage.setItem('cursos',JSON.stringify(cursos));
}

//Comprueba que haya elementos en el Local Storage
function obtenerCursosLocalStorage(){
     let cursosLS;

     //Comprobamos si hay algo en el Local Storage
          if(localStorage.getItem('cursos') === null){
                    cursosLS = [];
                    console.log('Local storage is empty')
          }else{
               cursosLS = JSON.parse(localStorage.getItem('cursos'));
          }
               return cursosLS;
}

//Imprime los cursos del LS en el carrito

function leerLocalStorage(){
     let cursosLS;

     cursosLS = obtenerCursosLocalStorage();
     
     
     cursosLS.forEach(function(curso){
          //construir el template
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>

                    <img src="${curso.imagen}">
               
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}"
                    ">x</a>
               </td>
          `;
          listaCursos.appendChild(row);
     });
          
     
}
//Elimina el curso por el ID en el localStorage

function eliminarCursoLocalStorage(curso){
     let cursosLS;
     //Obtenemos el arreglo de cursos
     cursosLS = obtenerCursosLocalStorage();
     //Iteramos comparando el ID del curso borrado con los del LS
     cursosLS.forEach(function(cursoLS, index){
          if(cursoLS.id === curso){
               cursosLS.splice(index, 1);               
          }
     });
     //Añadimos el arreglo actual al LS
     localStorage.setItem('cursos', JSON.stringify(cursosLS) );
}

//Elimina todos los cursos del LS

function vaciarLocalStorage(){
     localStorage.clear();
}