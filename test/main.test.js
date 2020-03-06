import assert from 'assert'

suite('Main Tests', () => {

  test('"Fruit" partially implements "Food"', async () => {
    let error, fruit
    try {
      const { Fruit } = await import('./sample')
      fruit = new Fruit()
    } catch (e) {
      error = e
    }
    assert.notEqual(error, undefined, 'No error was caught')
    assert.equal(fruit, undefined, '"fruit" is not undefined')
  })

  test('"Orange" implements "Food"', async () => {
    let error, orange
    try {
      const { Orange } = await import('./sample')
      orange = new Orange()
    } catch (e) {
      error = e
    }
    assert.equal(error, undefined, `An error was caught (${error})`)
    assert.notEqual(orange, undefined, '"orange" is undefined')
  })

  test('"Meat" implements "Food" and "Vegan"', async () => {
    let error, meat
    try {
      const { Meat } = await import('./sample')
      meat = new Meat()
    } catch (e) {
      error = e
    }
    assert.equal(error, undefined, `An error was caught (${error})`)
    assert.notEqual(meat, undefined, '"meat" is undefined')
  })

  test('"Apple" wrongly implements "Food"', async () => {
    let error, apple
    try {
      const { Apple } = await import('./sample')
      apple = new Apple()
    } catch (e) {
      error = e
    }
    assert.notEqual(error, undefined, 'No error was caught')
    assert.equal(apple, undefined, '"apple" is not undefined')
  })

  test('"Avocado" implements "Vegan" and inherits "Food"', async () => {
    let error, avocado
    try {
      const { Avocado } = await import('./sample')
      avocado = new Avocado()
    } catch (e) {
      error = e
    }
    assert.equal(error, undefined, `An error was caught (${error})`)
    assert.notEqual(avocado, undefined, '"avocado" is undefined')
  })

})
