const favoritesWidget = new FavoritesWidget();
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
  favoritesWidget.setMessage(false, res.error)
})

const ratesBoard = new RatesBoard();

function updateStocks() {
  ApiConnector.getStocks((res) => {
    if (res.success === true) {
      ratesBoard.clearTable()
      ratesBoard.fillTable(res.data)
      return
    }
    favoritesWidget.setMessage(false, res.error)
  })
}
updateStocks();
setInterval(updateStocks, 1000 * 60);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (params) => {
  ApiConnector.addMoney(params, (res) => {
    if (res.saccess === false) {
      favoritesWidget.setMessage(false, res.error)
      return
    }
    ApiConnector.current((res) => {
      if (res.success) {
        ProfileWidget.showProfile(res.data)
        favoritesWidget.setMessage(true, "Баланс пополнен")
        return
      }
      favoritesWidget.setMessage(false, res.error)
    })
  })
}

moneyManager.conversionMoneyCallback = (params) => {
  ApiConnector.convertMoney(params, (res) => {
    if (res.success === false) {
      favoritesWidget.setMessage(false, res.error)
      return
    }
    ApiConnector.current((res) => {
      if (res.success) {
        ProfileWidget.showProfile(res.data)
        favoritesWidget.setMessage(true, "Конвертация выполнена успешно")
        return
      }
      favoritesWidget.setMessage(false, res.error)
    })
  })
}

moneyManager.sendMoneyCallback = (params) => {
  ApiConnector.transferMoney(params, (res) => {
    if (res.success === false) {
      favoritesWidget.setMessage(false, res.error)
      return
    }
    ApiConnector.current((res) => {
      if (res.success) {
        ProfileWidget.showProfile(res.data)
        favoritesWidget.setMessage(true, "Перевод выполнен")
        return
      }
      favoritesWidget.setMessage(false, res.error)
    })
  })
}


ApiConnector.getFavorites((res) => {
  if(res.success === false){
    favoritesWidget.setMessage(false, res.error)
    return
  }
  favoritesWidget.clearTable()
  favoritesWidget.fillTable(res.data)
  moneyManager.updateUsersList(res.data)
})

favoritesWidget.addUserCallback = (params) => {
  ApiConnector.addUserToFavorites(params, (res) => {
    if(res.success === false){
      favoritesWidget.setMessage(false, res.error)
      return
    }
    favoritesWidget.clearTable()
    favoritesWidget.fillTable(res.data)
    moneyManager.updateUsersList(res.data)
  })
}

favoritesWidget.removeUserCallback = (params) => {
  ApiConnector.removeUserFromFavorites(params, (res) => {
    if(res.success === false){
      favoritesWidget.setMessage(false, res.error)
      return
    }
    favoritesWidget.clearTable()
    favoritesWidget.fillTable(res.data)
    moneyManager.updateUsersList(res.data)
  })
}