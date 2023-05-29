import { useEffect, useState } from "react";
import "./ChatInterface.css";
import "./App.css";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000/");

function App() {
   const [nuevoMensaje, setNuevoMensaje] = useState("");
   const [mensajes, setMensajes] = useState([]);

   useEffect(() => {

      socket.on("cdataSend", (data) => {
         setMensajes((mensajes) => [...mensajes, data]);
      });

      return () => {
         socket.off("connect");
         socket.off("cdataSend");
      };
   }, []);

   const enviarMensaje = () => {
      socket.emit("cdataSend", {
         usuario: socket.id,
         mensaje: nuevoMensaje,
      });
   };

   return (
      <>
         <div className="chat-container">
            <div className="chat-history">
               {mensajes.map((mensaje, index) => (
                  <div
                     key={index}
                     className="chat-message"
                  >
                     {mensaje.mensaje}
                  </div>
               ))}
            </div>
            <div className="chat-input">
               <input
                  type="text"
                  value={nuevoMensaje}
                  onChange={(e) => setNuevoMensaje(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="input-field"
               />
               <button
                  onClick={enviarMensaje}
                  className="send-button"
               >
                  Enviar
               </button>
            </div>
         </div>
      </>
   );
}

export default App;
