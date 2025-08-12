// MultiSelectInput.tsx
import { Fragment } from "react";
import { Listbox } from "@headlessui/react";
import { FaChevronDown, FaCheck } from "react-icons/fa";

type Student = {
  _id: string;
  first_name: string;
  last_name: string;
};

export default function MultiSelectInput({
  students,
  selected,
  onChange,
}: {
  students: Student[];
  selected: string[];
  onChange: (value: string[]) => void;
}) {
  return (
    <Listbox value={selected} onChange={onChange} multiple as="div">
      {() => (
        <div className="relative">
          {/* Button */}
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 sm:text-sm dark:bg-gray-800 dark:text-white">
            <span className="block truncate">
              {selected.length > 0
                ? `${selected.length} student(s) selected`
                : "Select Students"}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <FaChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>

          {/* Dropdown */}
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-gray-700">
            {students.map((student) => (
              <Listbox.Option key={student._id} value={student._id} as={Fragment}>
                {({ active, selected }) => (
                  <li
                    className={`relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900 dark:bg-amber-600 dark:text-white" : "text-gray-900 dark:text-gray-200"
                    }`}
                  >
                    <span
                      className={`block truncate ${
                        selected ? "font-semibold" : "font-normal"
                      }`}
                    >
                      {student.first_name} {student.last_name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600 dark:text-amber-300">
                        <FaCheck className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      )}
    </Listbox>
  );
}