import { useAttachment, useCheckSubscription, useItems, useSubscribe } from "../../hooks";
import { Course, Subscription } from "../../types";
import { Card, CardActions, CardMedia, CardContent} from "@mui/material";
interface CourseProps {
    course: Course;
}
const learnerId= "f46cd5a6833852107e535855eeaad3c6"
export const Courses: React.FC<CourseProps> = ({course}) => {
    const image = useAttachment(course.course_image)
    const {mutate} = useItems<Course>("course")
    const {mutate: mutateSubscription} = useItems<Subscription>("course_subscription")
    const {loading, createSubscription, subscribed} = useSubscribe()
    const { isSubscribed, loading: checkLoading } = useCheckSubscription(course.sys_id as string, learnerId);
    const handleSubscribe = (): void => {
        createSubscription(course.sys_id as string, learnerId)
        mutate((currentCourses: Course[] = []) => {
            return currentCourses.map(c => c.sys_id === course.sys_id ? { ...c, subscribed: true } : c);
        }, false);
        mutateSubscription()
    }
    return (<div style={{textAlign:"center"}}>
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardMedia
                image={image?.download_link} 
                title={"course_image"} 
                sx={{height: 180, width: 330, objectFit: "contain", padding: 2}} />
            <CardContent>
                <h4 style={{fontWeight: "bold"}}>{course.title}</h4>
                <span style={{color: "red", fontSize: "11px"}}>{course.type}</span>
                <p style={{fontStyle: "italic", fontSize: "14px"}}>{course.description}</p>
            </CardContent>
            <CardActions>
                <button 
                  disabled={isSubscribed || loading || checkLoading || subscribed}
                  onClick={handleSubscribe} style={{fontSize: "13px", backgroundColor: "#CCC"}}>
                    {loading ? "Subscribing..." : isSubscribed || subscribed ? "Subscribed" : "Subscribe"}
                </button>
            </CardActions>
        </Card>
    </div>)
}

