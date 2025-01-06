import React from 'react'
import { TaskCard } from './TaskCard'
import { cookies } from 'next/headers'
import { Task } from '@/lib/types'
import next from 'next'

const TaskList = async ({filter}:{filter:string}) => {


  const data = await fetch('https://task-mangement-express-ts.vercel.app/api/v1/tasks/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'token': `${cookies().get('authToken')?.value}`
    },
    next: {
      tags: ['tasks']  
    },
  })
  const tasks = await data.json()


  const filteredTasks = tasks.data.filter((task:Task)=>{
    if (filter === 'all' ) {
      return true
    } else{
      return task.status === filter
    }
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredTasks.map((task:Task) => (
        <TaskCard key={task._id} task={task} />
      ))}
  </div>
  )
}

export default TaskList