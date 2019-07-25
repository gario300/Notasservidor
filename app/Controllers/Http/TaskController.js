'use strict'
const  Task = use('App/Models/Task')
const Coment = use('App/Models/Coment')
const User = use('App/Models/User')

class TaskController {
  async index ({ request, response, view }) {
    // comming soon
  }
    
  async gettasks ({response}){
      let tasks = await Task.all()
      return response.json(tasks)
  }

  async newtask ({ request, response }) {
    const taskinfo = request.only(['user_id','nombre', 'body']);

    const task = new Task();
    task.user_id = taskinfo.user_id;
    task.nombre = taskinfo.nombre;
    task.body = taskinfo.body;

    // await task.user(await User.find(user_id))
    
    await task.save()

    return response.status(201).json(task)
  }

  async gettaskbyid ({params, response}) {
  
    let { id } = params

    let user = await User.findOrFail(id)

    let tasks = await user.task().fetch()

    return response.json(tasks)
  }

  async getonetask ({ params, response })  {
    const task = await Task.find(params.id)
    return response.json(task)
}

  async getone ({ params, response })  {
    const tarea = await Task.find(params.id)

    return response.json(tarea)
  }


async edittask ({ params, request, response, auth })  {
    const tareas = request.only(['nombre', 'body'])
    // obtener el usuario de la peticion y si es igual hazlo     
    
    const tarea = await Task.find(params.id)
    const userid = await auth.user.id
    const user_id = tarea.user_id

    if (userid == user_id){
      
      tarea.nombre = tareas.nombre
      tarea.body = tareas.body
     
      await tarea.save()
  
      return response.status(200).json(tarea)
      
    } else {
      return response.status(400).json({
      status: 'error',
      message: 'No es tu usuario'
    })
  }
    
  }


  async deletetask ({ params, response })  {
    const task = await Task.find(params.id)
    if (!task) {
      return response.status(404).json({ msg: 'no existe' })
    }
    await task.delete()

    return response.status(200).json(task)
  }
}

module.exports = TaskController
