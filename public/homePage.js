const logoutButton = new LogoutButton()

logoutButton.action = () => {
  ApiConnector.logout((res) => {
    if (res.success) {
      location.reload()
    }
  })
}

ApiConnector.current((res) => {
  if (res.success) {
    ProfileWidget.showProfile(res.data)
    return
  }
  console.log(res.error)
})

const ratesBoard = new RatesBoard();

function updateStocks() {
  ApiConnector.getStocks((res) => {
    if (res.success === true) {
      ratesBoard.clearTable()
      ratesBoard.fillTable(res.data)
      return
    }
    console.log(res.error)
  })
}
updateStocks();
setInterval(updateStocks, 1000 * 60);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (params) => {
  ApiConnector.addMoney(params, (res) => {
    if (res.saccess === false) {
      alert("Ошибка запроса")
      return
    }
    ApiConnector.current((res) => {
      if (res.success) {
        ProfileWidget.showProfile(res.data)
        alert("Баланс пополнен")
        return
      }
      alert("Ошибка запроса")
    })
  })
}

moneyManager.conversionMoneyCallback = (params) => {
  ApiConnector.convertMoney(params, (res) => {
    if (res.success === false) {
      alert("Ошибка запроса")
      return
    }
    ApiConnector.current((res) => {
      if (res.success) {
        ProfileWidget.showProfile(res.data)
        alert("Конвертация выполнена успешно")
        return
      }
      alert("Ошибка запроса")
    })
  })
}

moneyManager.sendMoneyCallback = (params) => {
  ApiConnector.transferMoney(params, (res) => {
    if (res.success === false) {
      alert("Ошибка запроса")
      return
    }
    ApiConnector.current((res) => {
      if (res.success) {
        ProfileWidget.showProfile(res.data)
        alert("Перевод выполнен")
        return
      }
      alert("Ошибка запроса")
    })
  })
}

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((res) => {
  console.log(res)
  if(res.success === false){
    alert("Ошибка запроса")
    return
  }
  favoritesWidget.clearTable()
  favoritesWidget.fillTable(res.data)
  moneyManager.updateUsersList(res.data)
})

favoritesWidget.addUserCallback = (params) => {
  ApiConnector.addUserToFavorites(params, (res) => {
    console.log(res)
    if(res.success === false){
      alert("Ошибка запроса")
      return
    }
    favoritesWidget.clearTable()
    favoritesWidget.fillTable(res.data)
    moneyManager.updateUsersList(res.data)
  })
}

favoritesWidget.removeUserCallback = (params) => {
  ApiConnector.removeUserFromFavorites(params, (res) => {
    console.log(res)
    if(res.success === false){
      alert("Ошибка запроса")
      return
    }
    favoritesWidget.clearTable()
    favoritesWidget.fillTable(res.data)
    moneyManager.updateUsersList(res.data)
  })
}