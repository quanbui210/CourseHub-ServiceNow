
import './App.css'
import { useItems } from './hooks'
import { Course, Subscription } from './types'
import {Courses} from './components'
import { MySubscription } from './components'
import { Box, Drawer, List, ListItem } from '@mui/material'
import { useState } from 'react'
function App() {
  const {items: courses} = useItems<Course>("course")
  const {items: subscriptions} = useItems<Subscription>("course_subscription")
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);

  };
  return (
    <>
     <div>
      <a style={{float: "right"}} onClick={toggleDrawer(true)}>My Courses</a>
      <Drawer  sx={{textAlign: "center"}} open={open} onClose={toggleDrawer(false)} anchor='right'>
        <Box 
          sx={{ width: 450}} 
          role="presentation" 
          >
            <h3 style={{color: "blue"}}>My Courses</h3>
            {subscriptions.length === 0 && <h6 style={{marginTop: "60%"}}>No subscriptions</h6>}
            <List>
            {subscriptions.length > 0 && subscriptions.map((sub) => {
                  return (
                  <ListItem
                    sx={{textAlign: "center"}}
                    key={sub.sys_id}>
                      <MySubscription  subscription={sub}/>
                  </ListItem> 
                  )
              })}
            </List>
        </Box>
      </Drawer>
     </div>
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

export default App
