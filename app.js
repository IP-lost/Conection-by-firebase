//configuración personal de Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCbDQy8eKS_tnrncsDYc_vzbGopWSCBY9A",
  authDomain: "outside-e9c9e.firebaseapp.com",
  projectId: "outside-e9c9e"
});
  
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

//Agregar documentos
function guardar(){
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var fecha = document.getElementById('fecha').value;

    db.collection("users").add({
        first: nombre,
        last: apellido,
        born: fecha
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('fecha').value = '';
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

//Leer documentos
var tabla = document.getElementById('tabla');
db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
        tabla.innerHTML += `
        <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().first}</td>
        <td>${doc.data().last}</td>
        <td>${doc.data().born}</td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')">Editar</button></td>
        </tr>
        `
    });
});

//borrar documentos
function eliminar(id){
    db.collection("users").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

// editar documentos
function editar(id, nombre, apellido, fecha) {
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('fecha').value = fecha;
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';

    // Cambia el evento de clic para llamar a la función editarUsuario
    boton.onclick = function () {
        editarUsuario(id);
    };
}

// Función para manejar la edición de un usuario
function editarUsuario(id) {
    var washingtonRef = db.collection("users").doc(id);

    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var fecha = document.getElementById('fecha').value;

    return washingtonRef.update({
        first: nombre,
        last: apellido,
        born: fecha
    })
        .then(function () {
            console.log("Documento actualizado exitosamente");
            // Restablece el texto del botón y los campos de entrada
            boton.innerHTML = 'Guardar';
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('fecha').value = '';

            // Restablece la función original de guardar para el evento de clic
            boton.onclick = guardar;
        })
        .catch(function (error) {
            // El documento probablemente no existe.
            console.error("Error al actualizar el documento: ", error);
        });
}





