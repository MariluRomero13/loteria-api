'use strict'
const Encryption = use('Encryption')
const User = use('App/Models/User')
class AuthController {
  async login({ request, response, auth }) {
    const { email, password } = request.only(['email', 'password'])
    const token = await auth.query().withRefreshToken().attempt(email, password, true)

    return response.ok(token)
  }

  async register ({ request, response, auth }) {
    const userData = request.only(User.store)
    const user = await User.create(userData)
    const token = await auth.query().withRefreshToken().attempt(user.email, userData.password, true)
    return response.created({
      status: true,
      message: 'User registered successfully',
      data: { user, token }
    })
  }

  async generateTokenWithRefresh({ request, response, auth }) {
    const refreshToken = request.input('refresh_token')
    const token = await auth.newRefreshToken()
      .generateForRefreshToken(refreshToken)
    return response.ok(token)
  }

  async logout({ request, response, auth }) {
    const refreshToken = request.input('refresh_token')
    const decryptedToken = Encryption.decrypt(refreshToken)

    try {
      const user = await auth.getUser()
      await user.tokens()
        .where('token', decryptedToken)
        .delete()
    } catch (error) {}

    return response.ok({
      success: true,
      message: 'Logged out successfully!',
      data: {}
    })
  }
}

module.exports = AuthController
