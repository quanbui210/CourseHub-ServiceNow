import { useAttachment } from "../../hooks/useAttachment";
import { Course } from "../../types";
interface CourseProps {
    course: Course;
  }

export const Courses: React.FC<CourseProps> = ({course}) => {
    // console.log(course.course_image)
    const image = useAttachment(course.course_image)
    
    return (<div>
        <h3>{course.title}</h3>
        <img src={image?.download_link} alt="" width={"200px"} height={"200px"} />
    </div>)
}

