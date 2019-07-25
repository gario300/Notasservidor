'use strict'
const User = use('App/Models/User');
const Hash = use('Hash');
const Task = use('App/Models/Task');

class UserController {
    ///Sign up
    async getusers ({response}){
        let users = await User.all()
        return response.json(users)
    }

    async getoneuser ({ params, response })  {
        const usuario = await User.find(params.id)
        return response.json(usuario)
    }
    
    
    async signup ({ request, auth, response }) {
		// Se obtienen los datos de formulario
        
        const userData = request.only(['name', 'email', 'password'])

		try {
			// se guardan en la base de datos
			const user = await User.create(userData)
			// JW Token
			const token = await auth.generate(user)

			return response.json({
				status: 'success',
				data: token
			})
		} catch (error) {
			return response.status(400).json({
				status: 'error',
				message: 'Usuario y/o Email existentes'
			})
		}
    }
    
    //login
    async login ({ request, auth, response }) {
        try {
            // Se validan los datos del formulario y segenera el token
            const token = await auth.attempt(
                request.input('email'),
                request.input('password')
            )
    
            return response.json({
                status: 'success',
                data: token
            })
        } catch (error) {
            response.status(400).json({
                status: 'error',
                message: 'Contraseña o E-mail incorrecto'
            })
        }
        



}

async me ({ auth, response }) {
    return response.json({
        data: {
            status: 'success',
            data: auth.user
        }
    })
  } 

  

}

module.exports = UserController
