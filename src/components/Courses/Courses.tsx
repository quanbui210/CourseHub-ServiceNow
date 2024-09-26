import { useAttachment, useCheckSubscription, useItems, useSubscribe} from "../../hooks";
import { Course } from "../../types";
import { Card, CardActions, CardMedia, CardContent, duration} from "@mui/material";
interface CourseProps {
    course: Course;
}
const learnerId= "f46cd5a6833852107e535855eeaad3c6"
export const Courses: React.FC<CourseProps> = ({course}) => {
    const image = useAttachment(course.course_image)
    const {mutate} = useItems<Course>("course")
    const {loading, createSubscription, subscribed} = useSubscribe()
    const { isSubscribed, loading: checkLoading } = useCheckSubscription(course.sys_id as string, learnerId);
    const disabled = isSubscribed || loading || checkLoading || subscribed
    const handleSubscribe = (): void => {
        createSubscription(course.sys_id as string, learnerId)
        mutate((currentCourses: Course[] = []) => {
            return currentCourses.map(c => c.sys_id === course.sys_id ? { ...c, subscribed: true } : c);
        }, false);
    }
    return (<div style={{textAlign:"center"}}>
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardMedia
                image={image?.download_link} 
                title={"course_image"} 
                sx={{height: 180, width: 330, objectFit: "contain", padding:1}} />
            <CardContent style={{height: 270}}>
                <h4  style={{fontWeight: "bold", height: 35}}>{course.title}</h4>
                <div style={{ fontSize: "11px"}}>Duration: {course.duration} days</div>
                <span style={{color: "red", fontSize: "11px"}}>Learning type: {course.type}</span>
                <p style={{fontStyle: "italic", fontSize: "14px"}}>{course.description}</p>
            </CardContent>
            <CardActions>
                <button 
                  disabled={disabled}
                  onClick={handleSubscribe}
                  style={{
                    fontSize: "13px", 
                    backgroundColor: disabled ? "#ccc" : "#333", 
                    color: "#fff",
                    cursor: disabled ? "not-allowed" : "pointer"
                  }}>
                    {loading ? "Subscribing..." : isSubscribed || subscribed ? "Subscribed" : "Subscribe"}
                </button>
            </CardActions>
        </Card>
    </div>)
}

