import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// ⚠️ REEMPLAZA con tu config real de Firebase (Firebase Console > Configuración del proyecto)
const firebaseConfig = {
  apiKey: "AIzaSyBFCsQVbhXBRkwNMopWmzC0KytQkulhR7Q",
  authDomain: "marcaciones-346ac.firebaseapp.com",
  projectId: "marcaciones-346ac",
  storageBucket: "marcaciones-346ac.firebasestorage.app",
  messagingSenderId: "183915573375",
  appId: "1:183915573375:web:59fcded4e863e8802b8f4a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ⚠️ REEMPLAZA con la URL de tu Apps Script (termina en /exec)
const SHEETS_URL = "https://script.google.com/macros/s/AKfycbzqL_PJZyw1JhwOYyRO46NADdGvnBzNNM3kfDk1Nh0KYNw0IQbRNhj0bd26vqTeCV7N/exec";

window.enviarFormulario = async function () {
  const nombre = document.getElementById('nombre').value.trim();
  const cedula = document.getElementById('cedula').value.trim();
  const agencia = document.getElementById('agencia').value.trim();
  const horaEntrada = document.getElementById('horaEntrada').value;
  const horaSalida = document.getElementById('horaSalida').value;
  const observaciones = document.getElementById('observaciones').value.trim();

  if (!nombre || !cedula || !agencia) {
    alert("Por favor, completa los campos obligatorios (Nombre, Cédula y Agencia).");
    return;
  }

  const btn = document.getElementById('btnEnviar');
  btn.disabled = true;
  btn.textContent = 'Enviando...';

  try {
    await addDoc(collection(db, "marcaciones"), {
      nombre,
      cedula,
      agencia,
      horaEntrada,
      horaSalida,
      observaciones,
      creado: serverTimestamp()
    });

    fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify({ nombre, cedula, agencia, horaEntrada, horaSalida, observaciones })
    }).catch(err => console.error('Error Sheets:', err));

    alert("Registro guardado exitosamente.");
    document.getElementById('formularioAseo').reset();
  } catch (error) {
    console.error('Error:', error);
    alert("Error al enviar los datos: " + error.message);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Enviar';
  }
};