// import { useSubscribe } from "../../hooks";
import { useUnsubscribe } from "../../hooks";
import { useItem, useItems } from "../../hooks";
import { Course, Learner, Subscription } from "../../types"

interface MySubscriptionProps {
    subscription: Subscription;
  }

 export const MySubscription: React.FC<MySubscriptionProps> = ({subscription}) =>  {
    const {data: course, mutate: mutateItem} = useItem<Course>("course",subscription.course.value)
    const {data: learner} = useItem<Learner>("learner", subscription.learner.value)
    const {loading, unSubscribed, unSubscribe} = useUnsubscribe()
    const {mutate} = useItems<Subscription>("course_subscription")

    const handleClick = ():void => {
        unSubscribe(subscription.sys_id as string)
        mutate((currentSubscriptions: Subscription[] = []) => {
            return currentSubscriptions.filter(sub => sub.sys_id !== subscription.sys_id);
        }, false);
        mutateItem()
    }
    return (
        <div>
            <div>
                <h4>{course?.title}</h4>
                <p>Subscribed by: {learner?.user_account.value}</p>
                <p>Subscribed on: {subscription.subscription_date}</p>
                <button onClick={handleClick}>
                    {loading ? "Unsubscribing..." : unSubscribed ? "Unsubscribed" : "Unsubscribe"}
                </button>
            </div>
        </div>
    )
}

