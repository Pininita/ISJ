import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' // Esta importación es necesaria

const ToastProvider = ({children}) => {

  return (
    <>
      {children}
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={false}
        draggable
        theme="light"
        limit={3}
        newestOnTop={true}
        />
    </>
  )
}

export default ToastProvider;