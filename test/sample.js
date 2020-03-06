import itimplements from '../lib/main'

const Food = {
  __name: 'Food',
  name: (lowercase) => 'string',
  calories: 'number'
}

class VeganInterface {
  isVegan = 'boolean'
}
const Vegan = new VeganInterface()

//@itimplements(Food)
class Fruit {

  name(lowercase) {
    return lowercase ? this.constructor.name.toLowerCase() : this.constructor.name
  }

}

class Orange extends Fruit {

  constructor() {
    super()
    this.calories = 50
  }

}

@itimplements(Food, Vegan)
class Meat {

  name = (lowercase) => 'Steak'
  calories = 100
  isVegan = false

}

class Apple extends Fruit {

  name() {
    return super.name(false)
  }
  calories = 70

}

@itimplements(Vegan)
class Avocado extends Fruit {

  isVegan = true
  calories = 70

}

export {
  Fruit,
  Orange,
  Meat,
  Apple,
  Avocado
}
