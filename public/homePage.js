const logoutButton = new LogoutButton()

logoutButton.action = () => { 
    ApiConnector.logout((res) => { 
        if(res.success){ 
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
  setInterval(updateSocks, 1000 * 60);

  const moneyManager = new MoneyManager();  

moneyManager.addMoneyCallback = () => {
  ApiConnector.addMoney()
}