'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ComentSchema extends Schema {
  up () {
    this.create('coments', (table) => {
      table.increments()
      table.integer('task_id')
        .unsigned()
        .references('id')
        .inTable('tasks')
        .onDelete('CASCADE')
      table.string('username', 20).nullable()
      table.string('coment', 353).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('coments')
  }
}

module.exports = ComentSchema
