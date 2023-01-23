const Restriction = require('hacktiv8-restriction')

const {convertFood, filterFoods, statusFood, statisticFood, generateFoodCalorie} = require('../index')

describe('Hacktiv Food Calorie Testing', () => {
  it('Should convert an array of string into a multi dimensional array (20)', () => {
    const foods = [
      'Pisang Goreng@200',
      'Biskuit',
      'Bubur Ayam@300',
      'Odading@60',
      'Bakso@360',
      'Tahu Goreng@20',
      'Nasi Padang@190',
      'Ayam Bakar',
      'Tempe Goreng@20',
      'Telur Rebus'
    ]

    const result = [
      ['Pisang Goreng', '200'],
      ['Biskuit'],
      ['Bubur Ayam', '300'],
      ['Odading', '60'],
      ['Bakso', '360'],
      ['Tahu Goreng', '20'],
      ['Nasi Padang', '190'],
      ['Ayam Bakar'],
      ['Tempe Goreng', '20'],
      ['Telur Rebus']
    ]

    expect(convertFood(foods)).toEqual(expect.arrayContaining(result))
  })

  it('Should filter a menu without total calorie (20)', () => {
    const foods = [
      ['Pisang Goreng', '200'],
      ['Biskuit'],
      ['Bubur Ayam', '300'],
      ['Odading', '60'],
      ['Bakso', '360'],
      ['Tahu Goreng', '20'],
      ['Nasi Padang', '190'],
      ['Ayam Bakar'],
      ['Tempe goreng', '20'],
      ['Telur Rebus']
    ]
    const result = [
      ['Pisang Goreng', 200],
      ['Bubur Ayam', 300],
      ['Odading', 60],
      ['Bakso', 360],
      ['Tahu Goreng', 20],
      ['Nasi Padang', 190],
      ['Tempe goreng', 20]
    ]

    expect(filterFoods(foods)).toEqual(result)
  })

  it('Should give each food the correct status (20)', () => {
    const foods = [
      ['Pisang Goreng', 200],
      ['Bubur Ayam', 300],
      ['Odading', 60],
      ['Bakso', 360],
      ['Tahu Goreng', 20],
      ['Nasi Padang', 190],
      ['Tempe goreng', 20]
    ]

    const result = [
      ['Pisang Goreng', 200, 'medium'],
      ['Bubur Ayam', 300, 'high'],
      ['Odading', 60, 'low'],
      ['Bakso', 360, 'high'],
      ['Tahu Goreng', 20, 'low'],
      ['Nasi Padang', 190, 'medium'],
      ['Tempe goreng', 20, 'low']
    ]

    expect(statusFood(foods)).toEqual(result)
  })

  it('Should return a statistic for all food (20)', () => {
    const foods = [
      ['Pisang Goreng', 200, 'medium'],
      ['Bubur Ayam', 300, 'high'],
      ['Odading', 60, 'low'],
      ['Bakso', 360, 'high'],
      ['Tahu Goreng', 20, 'low'],
      ['Nasi Padang', 190, 'medium'],
      ['Tempe goreng', 20, 'low']
    ]

    const result = {
      medium: 2,
      high: 2,
      low: 3
    }

    expect(statisticFood(foods)).toEqual(result)
  })

  it('Should generate a food and statistic as an object (20)', () => {
    const foods = [
      'Pisang Goreng@200',
      'Biskuit',
      'Bubur Ayam@300',
      'Odading@60',
      'Bakso@360',
      'Tahu Goreng@20',
      'Nasi Padang@190',
      'Ayam Bakar',
      'Tempe Goreng@20',
      'Telur Rebus'
    ]

    const result = {
      statistic: {medium: 2, high: 2, low: 3},
      foods: [
        {name: 'Pisang Goreng', totalCalorie: 200, status: 'medium'},
        {name: 'Bubur Ayam', totalCalorie: 300, status: 'high'},
        {name: 'Odading', totalCalorie: 60, status: 'low'},
        {name: 'Bakso', totalCalorie: 360, status: 'high'},
        {name: 'Tahu Goreng', totalCalorie: 20, status: 'low'},
        {name: 'Nasi Padang', totalCalorie: 190, status: 'medium'},
        {name: 'Tempe Goreng', totalCalorie: 20, status: 'low'}
      ]
    }

    expect(generateFoodCalorie(foods)).toEqual(result)
  })

  it('Check restriction (-20)', async () => {
    const checkRestriction = new Restriction('../index.js')
    checkRestriction.rules = ['match', 'split', 'concat', 'search']
    const result = await checkRestriction.readCode()
    expect(result).toBe(null)
  })
})
