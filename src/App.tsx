import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AuthLayout from "./Component/shared/AuthLayout"
import Login from "./Modules/Authentication/Login/Login"
import Register from "./Modules/Authentication/Register/Register"
import ChangePassword from "./Modules/Authentication/ChangePassword/ChangePassword"
import ForgetPassword from "./Modules/Authentication/ForgetPassword/ForgetPassword"
import NotFound from "./Component/shared/NotFound"
import Dashboard from "./Component/Dashboard/Dashboard"
import MasterLayout from "./Component/shared/MasterLayout"
import { ToastContainer } from "react-toastify"
import ResetPassword from "./Modules/Authentication/ResetPassword/ResetPassword"
import { Provider } from "react-redux"
import { store } from "./Redux/store"

import GroupsList from "./Modules/Instracutor/Groups/GroupsList"
import StudentList from "./Modules/Instracutor/Student/StudentList"



function App() {

  let routes = createBrowserRouter([
    {
      path: "", element: <AuthLayout />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "change-password", element: <ChangePassword /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
      ],
      errorElement: <NotFound />
    },
    {
      path: "",
      element: <MasterLayout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "students", element: <StudentList /> },
    { path: "groups", element: <GroupsList /> },
     { path: "quizes", element: <GroupsList /> }


      ]
    }

  ])

  return (
    <>
      <Provider store={store}  >
        <RouterProvider router={routes}></RouterProvider>
        <ToastContainer position="top-right" autoClose={2000} />

      </Provider>
    </>
  )
}

export default App
