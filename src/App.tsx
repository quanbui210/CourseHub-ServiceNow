
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Subscriptions, AllCourses } from './components';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AllCourses/>,
    },
    {
      path: "/subscriptions",
      element: <Subscriptions/>,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
