import { useState } from 'react';
import { X, Plus, Edit2, Trash2, Search, Mail, Phone, BookOpen, Calendar } from 'lucide-react';

const Profesores = () => {
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: 'Elon Mosk',
      email: 'elon.mosk@example.com',
      phone: '+51 987 654 321',
      specialty: 'Inteligencia Artificial',
      courses: 12,
      students: 245,
      rating: 5,
      joinDate: '2023-01-15',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw8UfxvpY3ZNV_TTYb0pFMpb05L45B2XnLKA&s'
    },
    {
      id: 2,
      name: 'Bill Gates',
      email: 'bill.gates@example.com',
      phone: '+51 976 543 210',
      specialty: 'Ciencia de datos',
      courses: 8,
      students: 180,
      rating: 4.9,
      joinDate: '2023-03-20',
      image: 'https://imageio.forbes.com/specials-images/imageserve/62d599ede3ff49f348f9b9b4/0x0.jpg?format=jpg&crop=821,821,x155,y340,safe&height=416&width=416&fit=bounds'
    },
    {
      id: 3,
      name: 'Mark Zuckerberg',
      email: 'Mark.zuckerberg@example.com',
      phone: '+51 965 432 109',
      specialty: 'Diseño UX/UI',
      courses: 15,
      students: 320,
      rating: 4.7,
      joinDate: '2022-11-10',
      image: 'https://lookaside.fbsbx.com/elementpath/media/?media_id=323764547398564&version=1760013275'
    },
    {
      id: 4,
      name: 'Jensen Huang',
      email: 'jensen.huang@example.com',
      phone: '+51 967 542 812',
      specialty: 'DevOps',
      courses: 20,
      students: 420,
      rating: 4.8,
      joinDate: '2023-11-10',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS613ajmLyU8tN1S3HKYoI-qcYUavZOo-6GA&s'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [teacherToDelete, setTeacherToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    courses: 0,
    students: 0,
    rating: 5.0,
    joinDate: '',
    image: ''
  });

  const specialties = [
    'Desarrollo Web',
    'Ciencia de Datos',
    'Diseño UX/UI',
    'Marketing Digital',
    'Inteligencia Artificial',
    'Ciberseguridad',
    'Mobile Development',
    'DevOps'
  ];

  const handleOpenModal = (teacher = null) => {
    if (teacher) {
      setCurrentTeacher(teacher);
      setFormData(teacher);
    } else {
      setCurrentTeacher(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        specialty: '',
        courses: 0,
        students: 0,
        rating: 5.0,
        joinDate: new Date().toISOString().split('T')[0],
        image: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTeacher(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentTeacher) {
      setTeachers(teachers.map(t => 
        t.id === currentTeacher.id ? { ...formData, id: currentTeacher.id } : t
      ));
    } else {
      const newTeacher = {
        ...formData,
        id: Math.max(...teachers.map(t => t.id)) + 1
      };
      setTeachers([...teachers, newTeacher]);
    }
    
    handleCloseModal();
  };

  const handleDeleteClick = (teacher) => {
    setTeacherToDelete(teacher);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setTeachers(teachers.filter(t => t.id !== teacherToDelete.id));
    setIsDeleteModalOpen(false);
    setTeacherToDelete(null);
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-linear-to-br
                  from-emerald-500 via-emerald-800
                  to-emerald-500 p-6">

      <div className="max-w-7xl mx-auto">
        {/* encabezado */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-white
                        mb-3 tracking-tight">
              Panel de Profesores
          </h1>
          <p className="text-blue-200 text-lg">
            Gestion de docentes, en el panel de administrador.
          </p>
        </div>

        {/* tarjetas de calificaciones y activos de os porfesores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          <div className="bg-linear-to-br from-cyan-500
                        to-cyan-600 rounded-bl-md shadow-cyan-700 shadow-lg
                        p-8 text-white">

            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium
                              uppercase tracking-wide mb-2">
                    Total Profesores
                </p>
                <p className="text-5xl font-bold">{teachers.length}</p>
                <p className="text-blue-100 text-sm mt-2">
                  Profesores activos en la plataforma
                </p>

              </div>
              <div className="bg-white bg-opacity-20 p-4
                              rounded-b-full backdrop-blur-sm">
                <BookOpen className="w-10 h-10 text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-neutral-500 to-neutral-600
                          rounded-bl-md shadow-neutral-700 shadow-lg p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm font-medium
                              uppercase tracking-wide mb-2">
                  Rating Promedio
                </p>
                <p className="text-5xl font-bold">
                  4.9
                </p>
                <p className="text-amber-100 text-sm mt-2">Calificación general del equipo</p>
              </div>
              <div className="bg-white bg-opacity-20 p-4 rounded-b-full backdrop-blur-sm">
                <span className="text-4xl">⭐</span>
              </div>
            </div>
          </div>
        </div>

        {/* acciones de la barra de busqueda */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl
                        shadow-xl p-6 mb-8 border border-white/20">

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full md:w-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nombre, email o especialidad..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2
                          border-slate-300 rounded-xl focus:outline-none
                          focus:ring-2 focus:ring-blue-500
                          focus:border-blue-500 transition-all"
              />
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 bg-linear-to-r
                      from-blue-600 to-blue-700
                      hover:from-blue-700 hover:to-blue-800
                      text-white px-8 py-3.5 rounded-bl-full rounded-tr-full font-semibold
                      transition-all shadow-lg hover:shadow-xl transform
                      hover:scale-105 w-full md:w-auto justify-center"
            >
              <Plus className="w-5 h-5" />
              Agregar Profesor
            </button>
          </div>
        </div>

        {/* tabla de profesores */}
        <div className="bg-white/95 backdrop-blur-sm
                        rounded-2xl shadow-xl border
                        border-white/20 overflow-hidden">

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-linear-to-r from-neutral-700 to-neutral-800">
                <tr>
                  <th className="px-6 py-5 text-left text-xs font-bold
                                text-white uppercase tracking-wider">
                    Profesor
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-bold
                                text-white uppercase tracking-wider">
                    Contacto
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-bold
                                text-white uppercase tracking-wider">
                    Especialidad
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-bold
                                text-white uppercase tracking-wider">
                    Estadísticas
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-bold
                                text-white uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-5 text-right text-xs font-bold
                                text-white uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900">
                {filteredTeachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-blue-50/50 transition-all
                                                  duration-200">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={teacher.image}
                            alt={teacher.name}
                            className="w-14 h-14 rounded-xl border-3
                                      border-blue-600 shadow-md"
                          />
                          <div className="absolute -bottom-1 -right-1
                                          w-4 h-4 bg-green-500 rounded-full
                                          border-2 border-white">
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900
                                        text-base">
                            {teacher.name}
                          </p>
                          <p className="text-sm text-slate-500 mt-0.5">
                            Desde ene 2024
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                          <div className="bg-blue-100 p-1.5 rounded-lg">
                            <Mail className="w-3.5 h-3.5 text-blue-600" />
                          </div>
                          <span className="font-medium">{teacher.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                          <div className="bg-green-100 p-1.5 rounded-lg">
                            <Phone className="w-3.5 h-3.5 text-green-600" />
                          </div>
                          <span className="font-medium">{teacher.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center px-4
                                      py-2 rounded-br-full rounded-t-full text-sm font-bold
                                      bg-linear-to-r from-blue-500
                                      to-blue-600 text-white shadow-md">
                        {teacher.specialty}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="bg-purple-100 p-1.5 rounded-lg">
                            <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                          </div>
                          <span className="text-sm font-semibold text-slate-700">
                            {teacher.courses} cursos
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="bg-orange-100 p-1.5 rounded-lg">
                            <Calendar className="w-3.5 h-3.5 text-orange-600" />
                          </div>
                          <span className="text-sm font-semibold text-slate-700">
                            {teacher.students} estudiantes
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2
                                    bg-amber-100 px-3 py-2
                                      rounded-xl w-fit">
                        <span className="text-xl">⭐</span>
                        <span className="font-bold text-slate-900 text-lg">{teacher.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(teacher)}
                          className="p-2.5 text-blue-600
                                    hover:bg-blue-100 rounded-xl
                                    transition-all duration-200
                                    hover:scale-110 cursor-pointer"
                          title="Editar"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(teacher)}
                          className="p-2.5 text-red-600
                                    hover:bg-red-100 rounded-xl
                                      transition-all duration-200
                                      hover:scale-110 cursor-pointer"
                          title="Eliminar"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTeachers.length === 0 && (
            <div className="text-center py-16 bg-slate-50">
              <div className="inline-flex items-center
                              justify-center w-20 h-20
                              bg-slate-200 rounded-full mb-4">
                <Search className="w-10 h-10 text-slate-400" />
              </div>
              <p className="text-slate-600 text-lg font-medium">
                No se encontraron profesores
              </p>
              <p className="text-slate-500 text-sm mt-2">
                Intenta con otros términos de búsqueda
              </p>
            </div>
          )}
        </div>
      </div>

      {/* edicion del modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm
                        flex items-center justify-center p-4 z-50
                        animate-fade-in">

          <div className="bg-white rounded-3xl shadow-2xl
                          max-w-3xl w-full max-h-[90vh]
                          overflow-y-auto transform
                          animate-scale-in">
            <div className="sticky top-0 bg-linear-to-r
                          from-blue-600 to-blue-700
                            px-8 py-6 flex items-center
                            justify-between rounded-t-3xl z-10">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  {currentTeacher ? 'Editar Profesor' : 'Nuevo Profesor'}
                </h2>
                <p className="text-blue-100 text-sm mt-1">
                  {currentTeacher ? 'Actualiza la información del profesor' : 'Completa los datos del nuevo profesor'}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-white/20 rounded-xl
                          transition-all duration-200 hover:rotate-90"
              >
                <X className="w-7 h-7 text-white" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold
                                  text-slate-700 mb-3 uppercase
                                  tracking-wide">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 bg-slate-50 border-2
                              border-slate-200 rounded-xl
                                focus:outline-none focus:ring-2
                              focus:ring-blue-500
                              focus:border-blue-500 transition-all
                              font-medium"
                    placeholder="Ej: Miguel Aliaga"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700
                                    mb-3 uppercase tracking-wide">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 bg-slate-50 border-2
                              border-slate-200 rounded-xl
                                focus:outline-none focus:ring-2
                              focus:ring-blue-500
                              focus:border-blue-500
                                transition-all font-medium"
                    placeholder="profesor@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold
                                  text-slate-700 mb-3 uppercase
                                  tracking-wide">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 bg-slate-50 border-2
                              border-slate-200 rounded-xl
                                focus:outline-none
                                focus:ring-2 
                              focus:ring-blue-500
                              focus:border-blue-500
                                transition-all font-medium"
                    placeholder="+51 987 654 321"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold
                                  text-slate-700 mb-3 uppercase
                                    tracking-wide">
                    Especialidad *
                  </label>
                  <select
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 bg-slate-50 border-2
                            border-slate-200 rounded-xl
                              focus:outline-none focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                              transition-all font-medium"
                  >
                    <option value="">Seleccionar...</option>
                    {specialties.map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold
                                  text-slate-700 mb-3 uppercase
                                    tracking-wide">
                    Número de Cursos
                  </label>
                  <input
                    type="number"
                    name="courses"
                    value={formData.courses}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-5 py-4 bg-slate-50 border-2
                              border-slate-200 rounded-xl
                                focus:outline-none focus:ring-2 
                              focus:ring-blue-500 
                              focus:border-blue-500
                                transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700
                                    mb-3 uppercase tracking-wide">
                    Número de Estudiantes
                  </label>
                  <input
                    type="number"
                    name="students"
                    value={formData.students}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-5 py-4 bg-slate-50 border-2
                              border-slate-200 rounded-xl focus:outline-none
                                focus:ring-2 
                              focus:ring-blue-500
                              focus:border-blue-500
                                transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700
                                    mb-3 uppercase tracking-wide">
                    Rating (1-5)
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    min="1"
                    max="5"
                    step="0.1"
                    className="w-full px-5 py-4 bg-slate-50 border-2
                              border-slate-200 rounded-xl focus:outline-none
                                focus:ring-2 
                              focus:ring-blue-500 
                              focus:border-blue-500
                                transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700
                                    mb-3 uppercase tracking-wide">
                    Fecha de Ingreso *
                  </label>
                  <input
                    type="date"
                    name="joinDate"
                    value={formData.joinDate}
                    onChange={handleInputChange}
                    required
                    className="w-85 px-5 py-4 bg-slate-50 border-2
                              border-slate-200 rounded-xl focus:outline-none
                                focus:ring-2 
                              focus:ring-blue-500 
                              focus:border-blue-500 
                                transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold
                                text-slate-700 mb-3 uppercase tracking-wide">
                  URL de Imagen (opcional)
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-slate-50 border-2
                            border-slate-200 rounded-xl focus:outline-none
                              focus:ring-2 
                            focus:ring-blue-500 
                            focus:border-blue-500
                              transition-all font-medium"

                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-8 py-4 border-2
                            border-slate-300 text-slate-700
                              rounded-xl font-bold hover:bg-slate-50
                              transition-all text-lg cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-8 py-4 bg-linear-to-r from-blue-600
                            to-blue-700 text-white rounded-xl
                              font-bold hover:from-blue-700 
                            hover:to-blue-800 transition-all shadow-lg
                              hover:shadow-xl transform
                              hover:scale-105 text-lg cursor-pointer"
                >
                  {currentTeacher ? '✓ Actualizar' : '+ Crear'} Profesor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* modal para confirmar si se elimina un integrante */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm
                        flex items-center justify-center
                        p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md
                            w-full transform animate-scale-in">
            <div className="p-8">
              <div className="flex items-center justify-center
                              w-20 h-20 bg-linear-to-br from-red-500
                            to-red-600 rounded-2xl mx-auto
                              mb-6 shadow-lg">
                <Trash2 className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-slate-800 text-center mb-3">
                ¿Eliminar Profesor?
              </h3>
              
              <p className="text-slate-600 text-center mb-2 text-lg">
                ¿Estás seguro de que deseas eliminar a
              </p>
              <p className="text-center mb-8">
                <span className="font-bold text-xl text-slate-900">{teacherToDelete?.name}</span>
              </p>
              <p className="text-slate-500 text-center text-sm mb-8">
                Esta acción no se puede deshacer y se perderán todos los datos asociados.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 px-6 py-4 border-2 border-slate-300
                          text-slate-700 rounded-xl font-bold
                          hover:bg-slate-50 transition-all text-lg cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 px-6 py-4 bg-linear-to-r
                            from-red-600 to-red-700 
                            text-white rounded-xl font-bold
                            hover:from-red-700
                            hover:to-red-800 transition-all
                              shadow-lg hover:shadow-xl transform
                              hover:scale-105 text-lg cursor-pointer"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { Profesores };