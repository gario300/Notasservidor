'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Task = use('App/Models/Task')


    Route.post('/signup', 'UserController.signup');
    Route.post('/login', 'UserController.login');
    Route.get('/me', 'UserController.me').middleware(['auth']);
    Route.get('/getusers','UserController.getusers').middleware(['auth']);
    Route.get('/:id','UserController.getoneuser').middleware(['auth']);
    
    
    Route.group(() => {
      Route.get('/gettask/:id','TaskController.gettaskbyid')
      Route.get('/gettasks','TaskController.gettasks')
      Route.get('/getone','TaskController.getone')
      Route.post('/newtasks','TaskController.newtask')
      Route.put('/taskedit/:id','TaskController.edittask')
      Route.delete('/deletetask/:id',('TaskController.deletetask'))
      Route.get('/task/:id','Taskcontroller.getonetask')
      //coments
      Route.get('/coments/:id','ComentController.index')
      Route.post('/newcoment/','ComentController.store')
  })
      .prefix('users')
      .middleware(['auth'])


   /* Route.get('tasks', async ({ response }) => {
        let tasks = await Task.all()
        return response.json(tasks)
    })

    Route.get('tasks/:id', async ({ params, response }) => {
        const tarea = await Task.find(params.id)

        return response.json(tarea)
    })
    Route.put('tasks/:id', async ({ params, request, response }) => {
        const tareas = request.only(['nombre', 'body'])

        const tarea = await Task.find(params.id)
        tarea.nombre = tareas.nombre
        tarea.body = tareas.body
       

        await tarea.save()

        return response.status(200).json(tarea)
      })

      Route.delete('tasks/:id', async ({ params, response }) => {
        const task = await Task.find(params.id)
        if (!task) {
          return response.status(404).json({ msg: 'no existe' })
        }
        await task.delete()

        return response.status(200).json(task)
      })*/

   ///Coment Routes
      Route.post('tasks/:task_id/coments', 'ComentController.store')
      Route.get('tasks/:task_id/coments/', 'ComentController.index')
      Route.get('tasks/:task_id/coments/:id', 'ComentController.show')
      Route.put('tasks/:task_id/coments/:id', 'ComentController.update')
      Route.delete('tasks/:task_id/coments/:id', 'ComentController.destroy')
