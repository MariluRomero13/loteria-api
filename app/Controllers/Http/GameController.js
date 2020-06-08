'use strict'
const Ws = use('Ws')
let randomArray = [];
class GameController {

  async getRandomNumber({ request, response }) {
    const status = request.input('status')
    if (parseInt(status) !== 2) {
      if (parseInt(status)) {
        randomArray = this.reset()
      }
      let randomNumber = Math.floor(Math.random() * randomArray.length -1)
      if (randomNumber === -1) {
        randomNumber = 0
      }
      randomArray[randomNumber]
      randomArray.splice(randomNumber, 1)

      if (!randomArray.length) {
        return response.ok({
          status: false,
          message: 'Juego finalizado'
        })
      }
      this.sendRandomNumber(randomNumber)
      return response.ok(randomNumber)
    } else {
      randomArray = this.reset()
      return response.ok({
        status: false,
        message: 'Juego finalizado ya hubo un ganador'
      })
    }
  }

  reset() {
    let arrayNumber = []
    for (let index = 1; index <= 54; index++) {
      arrayNumber.push(index)
    }
    return arrayNumber
  }

  sendRandomNumber (randomNumber) {
    const topic = Ws.getChannel('random').topic('random')
    if (topic) {
      topic.broadcast("new:random", randomNumber)
    }
  }
}

module.exports = GameController
