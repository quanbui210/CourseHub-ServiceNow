import { useItem } from "../hooks/useItems";
import { Course, Learner, Subscription } from "../types"

interface MySubscriptionProps {
    subscription: Subscription;
  }

 const MySubscription: React.FC<MySubscriptionProps> = ({subscription}) =>  {
    const course = useItem<Course>("course",subscription.course.value)
    const learner = useItem<Learner>("learner", subscription.learner.value)
    return (
        <div>
            <div>
                <h4>{course?.title}</h4>
                <p>Subscribed by: {learner?.user_account.value}</p>
                <p>Subscribed on: {subscription.subscription_date}</p>
            </div>
        </div>
    )
}

export default MySubscription