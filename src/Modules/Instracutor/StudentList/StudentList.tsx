import React, { useEffect, useState } from 'react'
import { axiosInstance, Student_URLS } from '../../../Server/baseUrl';
import { IoCheckmarkCircle } from 'react-icons/io5';
import './StudentList.css'
import { IoIosArrowForward } from 'react-icons/io';
import { FaRegEye } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

export default function StudentList() {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [students, setStudents] = React.useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  async function fetchStudents() {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${Student_URLS.getStudents}`);
      setStudents(response.data);
    } catch (error: any) {
      toast.error(error.response.data.message || "Failed to fetch students");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student: any) =>
    `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const numPage = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}

      <div className="listStudent  px-4 py-6">
        <form className="max-w-md mx-5 mb-5">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by student name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </form>

        <div className="flex justify-center flex-wrap gap-4 ">
          {paginatedStudents.map((user: any) => (
            <div
              key={user._id}
              className=" relative flex items-center justify-between p-4 gap-4 bg-white rounded-lg shadow-md w-full md:w-[48%] lg:w-[31%]"
            >
              <div className="flex items-center gap-4">
                <div className="img">
                  <img
                    src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.first_name}`}
                    alt="avatar"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <div className="dataUser">
                  <h4 className="font-semibold text-lg">
                    {user.first_name + " " + user.last_name}
                  </h4>
                  <span className="block text-sm text-gray-600">
                    Group: {user.group?.name || "No Group"}
                  </span>
                  <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
                    <span>{user.status}</span>
                    <IoCheckmarkCircle className="text-green-600" />
                  </div>
                </div>
              </div>

              <div
                onClick={() => toggleMenu(user._id)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-transform duration-200 hover:scale-110 cursor-pointer relative z-10"
              >
                <IoIosArrowForward className="text-black text-lg" />
              </div>

              {openMenuId === user._id && (
                <div className="absolute  right-4 top-16 bg-white  shadow-lg rounded-md z-50 w-50 text-sm drop_List_Student  ">
                  <button className="w-full px-4 py-2 hover:bg-gray-100 text-left flex items-center "><FaRegEye style={{ marginRight: "5px", color: "green", fontSize: "20px" }} /> View</button>
                  <button className="w-full px-4 py-2 hover:bg-gray-100 text-left flex items-center" > <MdDelete style={{ marginRight: "5px", color: "red", fontSize: "20px" }} /> Delete student </button>
                  <button className="w-full px-4 py-2 hover:bg-gray-100 text-left flex items-center "> <MdDelete style={{ marginRight: "5px", color: "red", fontSize: "20px" }} />Delete From Group</button>
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
              {numPage
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
    </>
  )
}
