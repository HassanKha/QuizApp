import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AuthLayout from "./AuthLayout/AuthLayout"
import Login from "./Modules/Authentication/Login/Login"
import Register from "./Modules/Authentication/Register/Register"
import ChangePassword from "./Modules/Authentication/ChangePassword/ChangePassword"
import ForgetPassword from "./Modules/Authentication/ForgetPassword/ForgetPassword"
import NotFound from "./Component/Shere/NotFound"
import Dashboard from "./Component/Dashboard/Dashboard"
import MasterLayout from "./Component/Shere/MasterLayout"
import AuthContextProvider from "./Context/AuthContextProvider"
import { ToastContainer } from "react-toastify"
import ResetPassword from "./Modules/Authentication/ResetPassword/ResetPassword"
import { Provider } from "react-redux"
import { store } from "./Redux/store"

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
      path: "dashboard",
      element: <MasterLayout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "dashboard", element: <Dashboard /> }

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
