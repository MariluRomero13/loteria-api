'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Link = use('App/Models/Link')
const User = use('App/Models/User')
class LinkController {

  async generateLink({ auth, response, request }) {
    const userLogged = await auth.getUser()
    await userLogged.links().update({ 'status': false  })
    const linkGenerated = Math.round((Math.pow(36, 30 + 1) - Math.random() * Math.pow(36, 30))).toString(36).slice(1)
    const link = new Link()
    link.user_id = userLogged.id
    link.link = linkGenerated
    link.way_to_play = parseInt(request.input('way_to_play'))
    await link.save()
    return response.ok(link)
  }

  async verifyLink({ request, response }) {
    const link = request.input('link')
    const linkSelected = await Link.findBy('link', link)
    let status = false;
    if (linkSelected) {
      linkSelected.status ? status = true : status = false
    }

    const user = await User.query().where('id', userLogged.id).with('links', (builder) => {
      builder.where('status', true)
    }).fetch()

    return response.created({
      is_active: status,
      message: status ? 'Link valido' : 'Link invalido o no existe',
      data: status ? user : ''
    })
  }

}

module.exports = LinkController
