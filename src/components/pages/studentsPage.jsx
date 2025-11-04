import { useState } from "react";
import { FaEdit, FaTrash, FaEye, FaCheckCircle } from "react-icons/fa";

function StudentPage() {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const buttonsLinst = [
    { 
      icon: <FaEdit className="text-blue-600 hover:text-blue-800" />, 
      action: "edit" 
    },
    { 
      icon: <FaTrash className="text-red-500 hover:text-red-700" />, 
      action: "delete" 
    },
    { 
      icon: <FaEye className="text-gray-600 hover:text-gray-800" />, 
      action: "view" 
    },
  ];

  const handleAction = (action) => {
    if (action === "delete") {
      setShowModal(true);
    } 
  };

  const closeModal = () => {
    setShowModal(false);
    setShowSuccess(false);
  };

  const confirmDelete = () => {
    // Cambiar a vista de éxito
    setShowSuccess(true);
    
    // Cerrar automáticamente después de 2 segundos
    setTimeout(() => {
      setShowModal(false);
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <section className="w-screen flex flex-col items-center justify-center mt-8 px-10 gap-10">
      <div className="relative w-full flex items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-800 drop-shadow-md">
          Registro de Estudiantes
        </h2>
        <button
          type="button"
          className="absolute right-10 bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-blue-300 transition-all duration-400 cursor-pointer"
        >
          Agregar Estudiante
        </button>
      </div>

      {/* Tabla */}
      <table className="w-full border border-gray-300 border-collapse shadow-xl overflow-hidden text-center bg-white">
        <thead className="bg-blue-200">
          <tr className="h-12">
            <th className="border border-gray-300 px-4">ID</th>
            <th className="border border-gray-300 px-4">CÓDIGO</th>
            <th className="border border-gray-300 px-4">NOMBRES</th>
            <th className="border border-gray-300 px-4">CRÉDITOS</th>
            <th className="border border-gray-300 px-4">CURSO</th>
            <th className="border border-gray-300 px-4">OPCIONES</th>
          </tr>
        </thead>

        <tbody className="bg-cyan-50">
          <tr>
            <td className="border border-gray-300 py-2">1</td>
            <td className="border border-gray-300 py-2">87532</td>
            <td className="border border-gray-300 py-2">Dolores Fuertes de Barriga</td>
            <td className="border border-gray-300 py-2">3</td>
            <td className="border border-gray-300 py-2">Taller de Programación Concurrente</td>
            <td className="border border-gray-300 py-2">
              <ul className="flex justify-center items-center gap-3">
                {buttonsLinst.map((item, i) => (
                  <li
                    key={i}
                    className="transition-transform hover:scale-110 cursor-pointer"
                    onClick={() => handleAction(item.action)}
                  >
                    {item.icon}
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white p-6 rounded-xl shadow-2xl text-center w-96 animate-slideUp pointer-events-auto border-2 border-gray-200">
            {!showSuccess ? (
              // Vista de confirmación
              <>
                <div className="mb-4">
                  <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <FaTrash className="text-red-500 text-2xl" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  ¿Estás seguro?
                </h3>
                <p className="text-gray-600 mb-6">
                  Esta acción no se puede deshacer
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={closeModal}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition font-medium"
                  >
                    Eliminar
                  </button>
                </div>
              </>
            ) : (
              // Vista de éxito
              <div className="animate-scaleIn">
                <div className="mb-4">
                  <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                    <FaCheckCircle className="text-green-500 text-4xl" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-green-600">
                  ¡Éxito!
                </h3>
                <p className="text-gray-700 text-lg">
                  Estudiante eliminado correctamente
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }
      `}</style>
    </section>
  );
}

export { StudentPage };