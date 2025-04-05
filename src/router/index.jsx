import { createBrowserRouter } from "react-router-dom";

function Root() {
    return <h1>Hello world</h1>;
}

const router = createBrowserRouter([
    { path: "/", component: Root}
])

export default router