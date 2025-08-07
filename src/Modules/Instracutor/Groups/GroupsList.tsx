import { useEffect, useState } from 'react';
import { FaPlusCircle, FaEdit, FaTrash, FaTimes, FaCheck, FaSpinner, FaEye } from 'react-icons/fa';
import Loader from '../../../Component/shared/Loader';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import Select from 'react-select';

import { axiosInstance, GROUPS_URLS, STUDENTS_URLS } from '../../../Server/baseUrl';
import DeleteModal from '../../../Component/shared/Delete';
import { IoCloseSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../Redux/store';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';

interface Group {
  _id: string;
  name: string;
  status: 'active' | 'inactive';
  instructor: string;
  students: string[];
  max_students: number;
}
interface AddGroup {
  name: string;
  students: string[];
}

interface Student {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: 'active' | 'inactive';
  role: string;
  avg_score: number;
}

interface StudentOption {
  value: string;
  label: string;
}

export default function GroupsList() {
  let { register, formState: { errors }, handleSubmit, reset, control } = useForm<AddGroup>({
    defaultValues: {
      name: '',
      students: []
    }
  });
  let [Groups, setGroups] = useState<Group[]>([]);
  let [Group, setGroup] = useState<Group | null>(null);
  let [Students, setStudents] = useState<Student[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalGroup, setShowModalGroup] = useState(false);
  let [loading, setLoading] = useState<boolean>(false);
  let [modalLoading, setmodalLoading] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentGroupId, setCurrentGroupId] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.auth.LogData);


  const showModalAdd = () => {
    setShowModal(true);
    setIsUpdateMode(false);
    setCurrentGroupId(null);
    reset({
      name: '',
      students: []
    });
  };

  const showSpecificGroupModal = (group: Group) => {
    setShowModalGroup(true);
    getSelectedGroup(group._id)

  };

  const closeModalAdd = () => {
    setShowModal(false);
    setIsUpdateMode(false);
    setCurrentGroupId(null);
    reset({
      name: '',
      students: []
    });
  };

  const getAllGroups = async () => {
    try {
      setLoading(true);
      let res = await axiosInstance.get(GROUPS_URLS.GET_ALL_GROUPS);
      setGroups(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch groups.");
    } finally {
      setLoading(false);
    }
  };

  const getAllStudents = async () => {
    try {
      let res = await axiosInstance.get(STUDENTS_URLS.GET_ALL_STUDENTS);
      setStudents(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch students.");
    }
  };

  const getSelectedGroup = async (_id: string) => {
    try {
      setmodalLoading(true)
      let res = await axiosInstance.get(GROUPS_URLS.GET_GROUP_BY_ID(_id));
      setGroup(res.data)
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch students.");
    }
    finally {
      setmodalLoading(false)
    }
  };

  const openDeleteModal = (group: Group) => {
    setShowDeleteModal(true);
    setCurrentGroupId(group._id)
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);

  };

  const GetGroupForUpdate = (group: Group) => {
    setIsUpdateMode(true);
    setCurrentGroupId(group._id);
    reset({
      name: group.name,
      students: group.students
    });
    setShowModal(true);
  };

  const addGroup = async (data: AddGroup) => {
    try {
      setmodalLoading(true);

      if (isUpdateMode && currentGroupId) {
        let res = await axiosInstance.put(GROUPS_URLS.UPDATE_GROUP(currentGroupId), data);
        console.log(res?.data);
        toast.success(res?.data?.message);
      } else {
        let res = await axiosInstance.post(GROUPS_URLS.ADD_GROUP, data);
        console.log(res?.data);
        toast.success(res?.data?.message);
      }

      closeModalAdd();
      getAllGroups();
    } catch (error: any) {
      console.error(error?.response?.data?.message);
      toast.error(error?.response?.data?.message || "An error occurred.");
    } finally {
      setmodalLoading(false);
    }
  };

  const deleteGroup = async () => {
    if (currentGroupId) {
      try {
        setmodalLoading(true);
        let res = await axiosInstance.delete(GROUPS_URLS.DELETE_GROUP(currentGroupId));
        console.log(res?.data);
        toast.success(res?.data?.message);
        closeDeleteModal();
        getAllGroups();
      } catch (error: any) {
        console.error(error?.response?.data?.message);
        toast.error(error?.response?.data?.message || "An error occurred.");
      } finally {
        setmodalLoading(false);
      }
    }

  };

  useEffect(() => {
    getAllGroups();

  }, []);

  useEffect(() => {

    getAllStudents();
  }, []);


  const studentOptions: StudentOption[] =  Students?.map(student => ({
    value: student._id,
    label: `${student.first_name} ${student.last_name}`
  }));

  let navigate = useNavigate()
  if (user?.role === "Student") {
    navigate('/dashboard')
  }
  return (
    <>


      <div className="flex-1 p-2 md:p-2  min-h-screen">
        <div className="bg-white border border-gray-300 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
           <h2 className="text-2xl font-bold text-gray-800">{t("GroupsList.title")}</h2>
            <button
              onClick={() => { showModalAdd(); }}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#D9D9D9] rounded-full shadow-sm text-sm text-[#2D2D2D] hover:bg-[#F5F5F5] transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
            >
              <div className="flex items-center justify-center flex-shrink-0">
                <FaPlusCircle className="text-2xl font-bolder text-black" />
              </div>
              <span className="font-bold text-black">{t("GroupsList.addGroup")}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {loading ? (
              <div className="col-span-1 md:col-span-2 flex justify-center items-center py-10">
                <Loader />
              </div>
            ) : (
              <>
                {Groups.length > 0 ? (
                  Groups.map((group) => (
                    <div
                      key={group._id}
                      className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between border border-gray-200"
                    >
                      <div className="flex-grow">
                        <h3 className="font-semibold text-gray-800 text-lg">{t("GroupsList.group")} : {group?.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{t("GroupsList.studentsCount")} : {group?.students?.length}</p>
                      </div>

                      <div className="flex space-x-3">
                        <button onClick={() => { GetGroupForUpdate(group); }} className="text-black cursor-pointer hover:text-green-600 transition">
                          <FaEdit className="w-5 h-5" />
                        </button>
                        <button onClick={() => { openDeleteModal(group) }}>
                          <span className="text-black cursor-pointer hover:text-red-600 transition">
                            <FaTrash className="w-5 h-5" />
                          </span>
                        </button>
                        <button onClick={() => { showSpecificGroupModal(group) }}>
                          <span className="text-black cursor-pointer hover:text-sky-600 transition">
                            <FaEye className="w-5 h-5" />
                          </span>
                        </button>

                      </div>
                    </div>
                  ))
                ) : (
                  <p className="col-span-1 md:col-span-2 text-center text-gray-500 py-10">{t("GroupsList.noGroups")}</p>
                )}
              </>
            )}
          </div>


        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[800px] rounded-lg shadow-lg">

            <form onSubmit={handleSubmit(addGroup)}>
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">
                  {isUpdateMode ? 'Update Group' : 'Set up a new Group'}
                </h3>
                <div className="flex items-center gap-4">
                  <button
                    type='submit'
                    disabled={modalLoading}
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    {modalLoading ? <FaSpinner className="animate-spin" /> : <FaCheck className="text-xl" />}
                  </button>
                  <button
                    type="button"
                    onClick={closeModalAdd}
                    className="text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="relative flex border border-gray-200 rounded-lg focus-within:border-gray-200">
                  <label htmlFor="groupName" className="flex items-center justify-center flex-shrink-0 bg-[#f8ebd9] text-lg font-bold text-black px-4 py-3 rounded-l-lg" style={{ minWidth: '110px' }}>
                    Group Name
                  </label>
                  <input
                    id="groupName"
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    className="flex-grow px-4 py-3 rounded-r-lg focus:outline-none text-gray-800"
                  />
                </div>
                {errors.name && <p className='text-red-600 text-sm mt-1'>{errors.name.message}</p>}

                <div className="relative flex border border-gray-200 rounded-lg focus-within:border-gray-200">
                  <label htmlFor="studentsList" className="flex items-center justify-center flex-shrink-0 bg-[#f8ebd9] text-lg font-bold text-black px-4 py-3 rounded-l-lg" style={{ minWidth: '110px' }}>
                    List Students
                  </label>
                  <Controller
                    name="students"
                    control={control}
                    rules={{ required: 'Students are required' }}
                    render={({ field }) => (
                      <div className="flex-grow">
                        <Select
                          {...field}
                          id="studentsList"
                          options={studentOptions}
                          isMulti
                          placeholder="Select students..."
                          value={studentOptions.filter(option => field.value?.includes(option.value))}
                          onChange={(selectedOptions) => {
                            field.onChange(selectedOptions ? selectedOptions.map(option => option.value) : []);
                          }}
                          styles={{
                            control: (baseStyles) => ({
                              ...baseStyles,
                              backgroundColor: 'transparent',
                              border: 'none',
                              boxShadow: 'none',
                              minHeight: '48px',
                              borderRadius: '0 0.5rem 0.5rem 0',
                            }),
                            valueContainer: (baseStyles) => ({
                              ...baseStyles,
                              paddingLeft: '1rem',
                            }),
                            input: (baseStyles) => ({
                              ...baseStyles,
                              margin: '0',
                              padding: '0',
                            }),
                            placeholder: (baseStyles) => ({
                              ...baseStyles,
                              color: '#6b7280',
                            }),
                            dropdownIndicator: (baseStyles) => ({
                              ...baseStyles,
                              paddingRight: '1rem',
                              color: '#6b7280',
                            }),
                            clearIndicator: (baseStyles) => ({
                              ...baseStyles,
                              color: '#6b7280',
                            }),
                            multiValue: (baseStyles) => ({
                              ...baseStyles,
                              backgroundColor: '#e0e0e0',
                            }),
                            multiValueLabel: (baseStyles) => ({
                              ...baseStyles,
                              color: '#333',
                            }),
                            multiValueRemove: (baseStyles) => ({
                              ...baseStyles,
                              ':hover': {
                                backgroundColor: '#d0d0d0',
                                color: '#c0392b',
                              },
                            }),
                          }}
                        />
                      </div>
                    )}
                  />
                </div>
                {errors.students && <p className='text-red-600 text-sm mt-1'>{errors.students.message}</p>}
              </div>
            </form>
          </div>
        </div>
      )}


      <DeleteModal
        show={showDeleteModal}
        onClose={closeDeleteModal}
        onDeleteConfirm={deleteGroup}
        title="Delete Group"
        loading={modalLoading}
      />

      {showModalGroup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 text-black dark:text-white rounded-2xl shadow-2xl w-[90%] max-w-lg p-6 relative animate-fade-in">
            <button
              onClick={() => setShowModalGroup(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl font-bold"
              aria-label="Close Modal"
            >
              <IoCloseSharp />
            </button>

            {/* المحتوى */}
            {modalLoading ? (
              <Loader />
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6 text-center border-b pb-2">{t("GroupsList.groupDetails")}</h2>
                <div className="space-y-3">
                  <p><span className="font-semibold">{t("GroupsList.groupName")}:</span> {Group?.name}</p>
                  <p><span className="font-semibold">{t("GroupsList.instructor")}:</span> {Group?.instructor}</p>
                  <p><span className="font-semibold">{t("GroupsList.status")}:</span> {Group?.status}</p>
                  <p><span className="font-semibold">{t("GroupsList.students")}:</span> {Group?.students?.length}</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </>
  );
}