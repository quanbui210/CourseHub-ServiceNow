
import './App.css'
import { useItems} from './hooks/useItems'
import { Course, Subscription } from './types'
import {Courses} from './components'
// import { MySubscription } from './components'
function App() {
  const courses = useItems<Course>("course")
  // const subscriptions = useItems<Subscription>("course_subscription")
  return (
    <>
     <h2>Courses</h2>
     {courses.length >0 && courses.map((course) => <div key={course.sys_id}>
        <Courses course={course}/>
     </div>)}

     {/* <h2>Subscriptions</h2>
     {subscriptions.length > 0 && subscriptions.map((sub) => {
          return <MySubscription key={sub.sys_id} subscription={sub}/>
      })} */}
    </>
  )
}

export default App
