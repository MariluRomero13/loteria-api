'use strict'
const Ws = use('Ws')
let randomArray = [];
class GameController {

  // async getRandomNumber({ request, response }) {
  //   const status = request.input('status')
  //   if (parseInt(status) !== 2) {
  //     if (parseInt(status)) {
  //       randomArray = this.reset()
  //     }
  //     let randomNumber = Math.floor(Math.random() * randomArray.length -1)
  //     if (randomNumber === -1) {
  //       randomNumber = 0
  //     }
  //     randomArray[randomNumber]
  //     randomArray.splice(randomNumber, 1)

  //     if (!randomArray.length) {
  //       return response.ok({
  //         status: false,
  //         message: 'Juego finalizado'
  //       })
  //     }
  //     this.sendRandomNumber(randomNumber)
  //     return response.ok(randomNumber)
  //   } else {
  //     randomArray = this.reset()
  //     return response.ok({
  //       status: false,
  //       message: 'Juego finalizado ya hubo un ganador'
  //     })
  //   }
  // }

  async getRandomNumber({ request, response }) {
    const status = request.input('status')
    if (parseInt(status) !== 2) {
      if (parseInt(status)) {
        randomArray = this.reset()
      }
      let randomNumber = Math.floor(Math.random() * 55)
      if (randomNumber === -1 || randomNumber === 0) {
        randomNumber = 1
      }

      if (randomArray.length > 1) {
        let numSelected = randomArray.filter((num) => num === randomNumber)
        if (numSelected.length > 0) {
          randomArray = randomArray.filter(num => num !== numSelected[0])
        }
        while (numSelected.length === 0) {
          randomNumber = Math.floor(Math.random() * 55)
          if (randomNumber === -1 || randomNumber === 0) {
            randomNumber = 1
          }
          numSelected = randomArray.filter((num) => num === randomNumber)
          if (numSelected.length > 0) {
            randomArray = randomArray.filter(num => num !== numSelected[0])
            break;
          }
        }
        const { img, sound } = this.getCardAndSound(numSelected)
        this.sendRandomNumber({ img, sound, cardNumber: randomNumber })
        return response.ok({ img, sound, cardNumber: randomNumber, message: 'Juego en curso' })
      } else {
        const { img, sound } = this.getCardAndSound(randomArray[0])
        this.sendRandomNumber({ img, sound, cardNumber: randomArray[0] })
        return response.ok({ img, sound, cardNumber: randomArray[0], message: 'Juago finalizado' })
      }
    } else {
      randomArray = this.reset()
      return response.ok({
        status: false,
        message: 'Juego finalizado ya hubo un ganador'
      })
    }
  }
  /*
  async generateCard() {
    let newCardArray = [];
    for (let index = 0; index < 16;) {
      let randomNumber = Math.floor(Math.random() * 54)
      if (randomNumber === 0) {
        randomNumber = 1
      }
      const is_found = newCardArray.filter(num => num === randomNumber);
      if (!is_found.length) {
        index++
        const { img, sound } = this.getCardAndSound(randomNumber);
        newCardArray.push({ img, sound, cardNumber: randomNumber });
      }
    }
    return newCardArray
  }
*/
  //otro generador
  //Hola Dios, perdoname
  async generateCard(){
    let a=[]
    let cardNumbers=[]
    let newCardArray = []
    a=this.returnArray()

    this.shuffle(a)

    cardNumbers=a.slice(0,16)

    for(let i=0;i<cardNumbers.length;i++){
      const { img, sound } = this.getCardAndSound(cardNumbers[i])
      newCardArray.push({ img, sound, cardNumber: cardNumbers[i] })
    }

    return newCardArray
  }

  shuffle(array=[]){
    array.sort(() => Math.random() - 0.5);
    return array
  }

  returnArray(array){
    let arrayNumber = []
    for (let index = 1; index <= 54; index++) {
      arrayNumber.push(index)
    }
    return arrayNumber
  }

  reset() {
    let arrayNumber = []
    for (let index = 1; index <= 54; index++) {
      arrayNumber.push(index)
    }
    return arrayNumber
  }

  sendRandomNumber (data) {
    const topic = Ws.getChannel('random').topic('random')
    if (topic) {
      topic.broadcast("new:random", data)
    }
  }

  getCardAndSound(cardNumber) {
    const img = `http://localhost:3333/img/${cardNumber}.jpg`
    const sound = `http://localhost:3333/sounds/${cardNumber}.mp3`
    return { img, sound }
  }
}

module.exports = GameController
