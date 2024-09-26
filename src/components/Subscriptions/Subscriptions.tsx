
import { ListItem } from '@mui/material'
import { useItems } from '../../hooks'
import { Subscription } from '../../types'
import { MySubscription } from './MySubscription'
import { Link } from 'react-router-dom'

export const Subscriptions = () => {
    const {items: subscriptions} = useItems<Subscription>("course_subscription")
  

    return (
        <div>
           <Link to={'..'}>Go Back</Link>
            { <h2 style={{marginTop: "10"}}>Your Subscribed Courses</h2>}
            {subscriptions.length === 0 && <p>You haven't subscribed to any course yet</p>}
              {subscriptions.length > 0 && subscriptions.map((sub) => {
                    return (
                    <ListItem
                      sx={{textAlign: "center"}}
                      key={sub.sys_id}>
                        <MySubscription  subscription={sub}/>
                    </ListItem> 
                    )
                })}
       </div>
    )
}

