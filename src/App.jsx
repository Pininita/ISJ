import "react-datepicker/dist/react-datepicker.css";
import { RouterProvider} from "react-router-dom";
import router from "./router/index.jsx";

function App() {
    return (
            <RouterProvider router={router}/>
    )
}

export default App
