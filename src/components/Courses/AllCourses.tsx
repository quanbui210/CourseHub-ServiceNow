import { useItems } from '../../hooks'
import { Course, } from '../../types'
import { Courses } from '../../components'
import { Link} from 'react-router-dom'


export const AllCourses = () => {
    const {items: courses} = useItems<Course>("course")
    return (
        <>
        <a style={{float: "right"}}><Link to={'/subscriptions'}>My Courses</Link></a>
         <div style={{marginTop:70}}>
            <h2 style={{marginTop: 30}}>Courses</h2>
              {courses.length === 0 && <h5>Loading...</h5>}
                <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr"}}>
                  {courses.length >0 && courses.map((course) => 
                  <div key={course.sys_id}>
                      <Courses course={course}/>
                  </div>)}
              </div>
         </div>
        </>
      )
}