import type { Student } from "../../../Interfaces/Students/Interfaces";
import { Fragment } from "react/jsx-runtime";
import Loader from "../../../Component/shared/Loader";
import { HiOutlineShieldCheck, HiOutlineUser, HiOutlineUsers } from "react-icons/hi";
import { t } from "i18next";
import { Dialog, Transition } from '@headlessui/react';

export function StudentDetailsModal({
  isOpen,
  onClose,
  student,
  loading,
}: {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
  loading: boolean;
}) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 " onClose={onClose}>
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <Loader />
              </div>
            ) : (
              student && (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <Dialog.Title className="text-lg font-bold">{t('studentDetails.title')}</Dialog.Title>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl font-bold">
                      ×
                    </button>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h3 className="flex items-center text-gray-700 font-semibold mb-2">
                      <HiOutlineUser className="mr-2" /> {t('studentDetails.personalInfo')}
                    </h3>
                    <p>
                      <strong>{t('studentDetails.fullName')}:</strong> {student.first_name} {student.last_name}
                    </p>
                    <p>
                      <strong>{t('studentDetails.email')}:</strong> {student.email}
                    </p>
                    <p>
                      <strong>{t('studentDetails.studentId')}:</strong> {student._id}
                    </p>
                    <p className="flex items-center gap-1">
                      <HiOutlineShieldCheck className="text-sm" /> {student.role || 'student'}
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="flex items-center text-gray-700 font-semibold mb-2">
                      <HiOutlineUsers className="mr-2" /> {t('studentDetails.groupInfo')}
                    </h3>
                    <p>
                      <strong>{t('studentDetails.groupName')}:</strong> {student.group?.name || t('studentDetails.noGroup')}
                    </p>
                  </div>
                </>
              )
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}