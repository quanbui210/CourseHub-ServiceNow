// import { useSubscribe } from "../../hooks";
import { useAttachment, useUnsubscribe } from "../../hooks";
import { useItem, useItems } from "../../hooks";
import { Course, Subscription } from "../../types"

interface MySubscriptionProps {
    subscription: Subscription;
  }

 export const MySubscription: React.FC<MySubscriptionProps> = ({subscription}) =>  {
    const {data: course} = useItem<Course>("course",subscription.course.value)
    // const {data: learner} = useItem<Learner>("learner", subscription.learner.value)
    const {loading, unSubscribed, unSubscribe} = useUnsubscribe()
    const {mutate} = useItems<Subscription>("course_subscription")
    const image = useAttachment(course?.course_image as string)
    // console.log(learner)
    const handleClick = ():void => {
        unSubscribe(subscription.sys_id as string)
        mutate((currentSubscriptions: Subscription[] = []) => {
            return currentSubscriptions.filter(sub => sub.sys_id !== subscription.sys_id);
        }, false);
    }
    return (
        <div style={{borderBottom: "1px solid #ccc"}}>
            <div>
                <img src={image?.download_link} width={150} height={150}></img>
                <h4>{course?.title}</h4>
                {/* <p>Subscribed by: {learner?.user_account.value}</p> */}
                <p>Subscribed on: {subscription.subscription_date}</p>
                <button style={{marginBottom: 10, fontSize: "12px", backgroundColor: "#333"}} onClick={handleClick}>
                    {loading ? "Unsubscribing..." : unSubscribed ? "Unsubscribed" : "Unsubscribe"}
                </button>
            </div>
        </div>
    )
}

