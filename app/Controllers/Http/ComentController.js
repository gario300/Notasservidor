'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with coments
 */
const Coment = use('App/Models/Coment')
const Task = use('App/Models/Task')

class ComentController {
  /**
   * Show a list of all coments.
   * GET coments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({params, response}) {
    let { id } = params

    let task = await Task.findOrFail(id)

    let coments = await task.coment().fetch()
    return response.json(coments)
  }

  /**
   * Render a form to be used for creating a new coment.
   * GET coments/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new coment.
   * POST coments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ params, request, response}) {
    let { task_id } = params
    const comentInfo = request.only(['task_id','username', 'coment'])

    const coment = new Coment()
    coment.task_id = comentInfo.task_id
    coment.username = comentInfo.username
    coment.coment = comentInfo.coment

    await coment.save()

    return response.status(201).json(coment)
  }

  /**
   * Display a single coment.
   * GET coments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({params, response}) {
    const coment = await Coment.find(params.id)

    return response.json(coment)
  }

  /**
   * Render a form to update an existing coment.
   * GET coments/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update coment details.
   * PUT or PATCH coments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({params, request, response}) {
    const comentInfo = request.only(['username', 'coment'])

    const coment = await Coment.find(params.id)
    if (!coment) {
      return response.status(404).json({data: 'Resource not found'})
    }
    coment.username = comentInfo.username
    coment.coment = comentInfo.coment
    
    await coment.save()

    return response.status(200).json(coment)
  }

  /**
   * Delete a coment with id.
   * DELETE coments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({params, response}) {
    const coment = await Coment.find(params.id)
    if (!coment) {
      return response.status(404).json({data: 'No encontrado'})
    }
    await coment.delete()

    return response.status(204).json(null)
  }
}

module.exports = ComentController
