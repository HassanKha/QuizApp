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

  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const [students, setStudents] = React.useState([]);
  async function fetchStudents() {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${Student_URLS.getStudents}`);
      setStudents(response.data);
    }
    catch (error: any) {
      toast.error(error.response.data.message || "Failed to fetch students");
    }
    finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}

      <div className="listStudent  px-4 py-6">
        <div className="flex justify-center flex-wrap gap-4 ">
          {students.map((user: any) => (
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
      </div>


    </>
  )
}
