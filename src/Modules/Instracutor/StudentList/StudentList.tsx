import { useEffect, useState, Fragment } from 'react';
import { axiosInstance, Student_URLS, STUDENTS_URLS } from '../../../Server/baseUrl';
import { IoCheckmarkCircle } from 'react-icons/io5';
import './StudentList.css';
import { IoIosArrowForward } from 'react-icons/io';
import { FaRegEye } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Dialog, Transition } from '@headlessui/react';
import { HiOutlineUser, HiOutlineShieldCheck, HiOutlineUsers } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../Redux/store';
import { useNavigate } from 'react-router-dom';

interface Student {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  avg_score: number;
  role?: string;
  group?: {
    name: string;
  };
}

function StudentDetailsModal({ isOpen, onClose, student }: { isOpen: boolean; onClose: () => void; student: Student | null }) {
  if (!student) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title className="text-lg font-bold">Student Details</Dialog.Title>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl font-bold">×</button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="flex items-center text-gray-700 font-semibold mb-2">
                  <HiOutlineUser className="mr-2" /> Personal Information
                </h3>
                <p><strong>Full Name:</strong> {student.first_name} {student.last_name}</p>
                <p className="flex items-center gap-2"> <strong>Email:</strong>{student.email}</p>
                <p><strong>Student ID:</strong> {student._id}</p>
                <p className="flex items-center gap-1"><HiOutlineShieldCheck className="text-sm" /> {student.role || 'student'}</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="flex items-center text-gray-700 font-semibold mb-2">
                  <HiOutlineUsers className="mr-2" /> Group Information
                </h3>
                <p><strong>Group Name:</strong> {student.group?.name || "No Group"}</p>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default function StudentList() {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [students, setStudents] = useState<Student[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showModal, setShowModal] = useState(false);

  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };
  const user = useSelector((state: RootState) => state.auth.LogData);

  let navigate = useNavigate()
  if (user?.role === "Student") {
    navigate('/dashboard')
  }
  async function fetchStudents() {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Student_URLS.getStudents);
      setStudents(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch students");
    } finally {
      setLoading(false);
    }
  }

  async function deleteStudent(id: string) {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(STUDENTS_URLS.DELETE_STUDENT(id));
      toast.success(response.data.message);
      fetchStudents();
      setOpenMenuId(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete student");
    } finally {
      setLoading(false);
    }
  }

  async function viewStudent(id: string) {
    setLoading(true);
    try {
      const response = await axiosInstance.get(STUDENTS_URLS.GET_STUDENT_BY_ID(id));
      setSelectedStudent(response.data);
      setShowModal(true);
      setOpenMenuId(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to view student");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) =>
    `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}

      <div className="listStudent px-4 py-6">
        <form className="max-w-md mx-5 mb-5">
          <input
            type="search"
            placeholder="Search by student name..."
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
        </form>

        <div className="flex justify-center flex-wrap gap-4">
          {paginatedStudents.map((user) => (
            <div key={user._id} className="relative flex items-center justify-between p-4 gap-4 bg-white rounded-lg shadow-md w-full md:w-[48%] lg:w-[31%]">
              <div className="flex items-center gap-4">
                <img
                  src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.first_name}`}
                  alt="avatar"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-lg">{user.first_name} {user.last_name}</h4>
                  <span className="block text-sm text-gray-600">Group: {user.group?.name || "No Group"}</span>
                  <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
                    <span>{user.status}</span>
                    <IoCheckmarkCircle />
                  </div>
                </div>
              </div>
              <div onClick={() => toggleMenu(user._id)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer">
                <IoIosArrowForward className="text-black text-lg" />
              </div>

              {openMenuId === user._id && (
                <div className="absolute right-4 top-16 bg-white shadow-lg rounded-md z-20 text-sm w-48">
                  <button onClick={() => viewStudent(user._id)} className="w-full px-4 py-2 hover:bg-gray-100 text-left flex items-center">
                    <FaRegEye className="mr-2 text-green-600 text-lg" /> View
                  </button>
                  <button onClick={() => deleteStudent(user._id)} className="w-full px-4 py-2 hover:bg-gray-100 text-left flex items-center">
                    <MdDelete className="mr-2 text-red-600 text-lg" /> Delete student
                  </button>

                </div>
              )}
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <ul className="inline-flex -space-x-px text-sm">
              <li
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                className={`cursor-pointer px-3 py-2 ml-0 leading-tight border rounded-l-lg 
          ${page === 1 ? 'text-gray-400 border-gray-300 bg-white cursor-not-allowed' : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-900'}`}
              >
                Previous
              </li>

              <li
                onClick={() => setPage(1)}
                className={`cursor-pointer px-3 py-2 leading-tight border 
          ${page === 1 ? 'text-white bg-blue-600 border-blue-600' : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-900'}`}
              >
                1
              </li>

              {page > 3 && totalPages > 5 && (
                <li
                  className="cursor-pointer px-3 py-2 border border-gray-300 bg-white"
                  onClick={() => setPage(Math.max(1, page - 2))}
                >
                  ...
                </li>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(i => i !== 1 && i !== totalPages)
                .filter(i => i >= page - 1 && i <= page + 1)
                .map(i => (
                  <li
                    key={i}
                    onClick={() => setPage(i)}
                    className={`cursor-pointer px-3 py-2 leading-tight border 
              ${page === i ? 'text-white bg-blue-600 border-blue-600' : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-900'}`}
                  >
                    {i}
                  </li>
                ))}

              {page < totalPages - 2 && totalPages > 5 && (
                <li
                  className="cursor-pointer px-3 py-2 border border-gray-300 bg-white"
                  onClick={() => setPage(Math.min(totalPages, page + 2))}
                >
                  ...
                </li>
              )}

              {/* Always show last page if it's not already shown */}
              {totalPages > 1 && (
                <li
                  onClick={() => setPage(totalPages)}
                  className={`cursor-pointer px-3 py-2 leading-tight border  
            ${page === totalPages ? 'text-white bg-blue-600 border-blue-600' : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-900'}`}
                >
                  {totalPages}
                </li>
              )}

              <li
                onClick={() => setPage((old) => Math.min(old + 1, totalPages))}
                className={`cursor-pointer px-3 py-2 leading-tight border rounded-r-lg
          ${page === totalPages ? 'text-gray-400 border-gray-300 bg-white cursor-not-allowed' : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-900'}`}
              >
                Next
              </li>
            </ul>
          </div>
        )}

      </div>

      <StudentDetailsModal isOpen={showModal} onClose={() => setShowModal(false)} student={selectedStudent} />
    </>
  );
}
