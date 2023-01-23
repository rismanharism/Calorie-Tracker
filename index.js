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

function convertFood(foods) {
  // code here
  let result = [];
  for (let food of foods) {
    if (food.includes("@")) {
      let splitFood = food.split("@");
      result.push(splitFood);
    } else {
      result.push([food]);
    }
  }
  return result;
}

function filterFoods(foods) {
  // your code here
  let result = [];
  for (let food of foods) {
    if (food.length > 1) {
      food[1] = Number(food[1]);
      result.push(food);
    }
  }
  return result;
}

function statusFood(foods) {
  // your code here
  for (let food of foods) {
    if (food[1] > 200) {
      food.push("high");
    } else if (food[1] >= 90 && food[1] <= 200) {
      food.push("medium");
    } else {
      food.push("low");
    }
  }
  return foods;
}

function statisticFood(foods) {
  // your code here
  let result = {
    high: 0,
    medium: 0,
    low: 0
  }
  for (let food of foods) {
    result[food[2]] += 1;
  }
  return result;
}

function generateFoodCalorie(foods) {
  // code here
  let convertedFoods = convertFood(foods);
  let filteredFoods = filterFoods(convertedFoods);
  let statusFoods = statusFood(filteredFoods);
  let foodObjects = statusFoods.map(food => {
    return {
      name: food[0],
      totalCalorie: food[1],
      status: food[2]
    }
  });
  return {
    statistic: statisticFood(statusFoods),
    foods: foodObjects
  }
}

console.log(generateFoodCalorie(foods))
/**
{
  statistic: { medium: 2, high: 2, low: 3 },
  foods: [
    { name: 'Pisang Goreng', totalCalorie: 200, status: 'medium' },
    { name: 'Bubur Ayam', totalCalorie: 300, status: 'high' },
    { name: 'Odading', totalCalorie: 60, status: 'low' },
    { name: 'Bakso', totalCalorie: 360, status: 'high' },
    { name: 'Tahu Goreng', totalCalorie: 20, status: 'low' },
    { name: 'Nasi Padang', totalCalorie: 190, status: 'medium' },
    { name: 'Tempe Goreng', totalCalorie: 20, status: 'low' }
  ]
}
**/

// Silahkan tulis kode kamu untuk Manipulasi DOM disini

// RENDER DI BROWSER
// selectors
const menuList = document.querySelector('.food-list')

// ABAIKAN code dibawah ini
function render() {
  // get todo list
  let foodObject = generateFoodCalorie(foods)
  // put all task to html
  for (let i = 0; i < foodObject.foods.length; i++) {
    // create div
    const menu = document.createElement('div')
    menu.classList.add('food')
    // create list
    const newMenu = document.createElement('li')
    newMenu.innerText = `${foodObject.foods[i].name} -- ${foodObject.foods[i].totalCalorie}`
    newMenu.classList.add('food-item')
    menu.appendChild(newMenu)

    // create completed button
    const infoButton = document.createElement('button')
    infoButton.innerHTML = foodObject.foods[i].status[0].toUpperCase() + foodObject.foods[i].status.substring(1)
    if (infoButton.innerHTML === 'High') {
      infoButton.classList.add('high-btn')
    } else if (infoButton.innerHTML === 'Medium') {
      infoButton.classList.add('medium-btn')
    } else {
      infoButton.classList.add('low-btn')
    }
    menu.appendChild(infoButton)
    menuList.appendChild(menu)
  }
}
render()

// Uncomment baris ini untuk melakukan testing
// Comment juga semua code yang berhubungan dengan DOM untuk menjalankan testing
// module.exports = {
//   convertFood,
//   filterFoods,
//   statusFood,
//   statisticFood,
//   generateFoodCalorie
// }
