'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.post('/login', 'AuthController.login')
  .validator('Login')
Route.post('/login/refresh-token', 'AuthController.generateTokenWithRefresh')
  .validator('LoginRefresh')
Route.post('/logout', 'AuthController.logout')
  .validator('LoginRefresh')
Route.post('/register', 'AuthController.register')
  .validator('RegisterUser')

Route.post('/generate-link', 'LinkController.generateLink').middleware(['auth:jwt'])
Route.post('/verify-link', 'LinkController.verifyLink').middleware(['auth:jwt']).validator('VerifyLink')
Route.post('/cancel-link', 'LinkController.cancelLink').middleware(['auth:jwt']).validator('VerifyLink')
Route.post('/get-random-number', 'GameController.getRandomNumber').middleware(['auth:jwt'])
Route.get('/generate-card', 'GameController.generateCard')
Route.post('/get-winner', 'GameController.getWinner').middleware(['auth:jwt'])
