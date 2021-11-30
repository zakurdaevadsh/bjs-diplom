const logoutButton = new LogoutButton()

logoutButton.action = (data => {
    ApiConnector.logout(data, (res) => {
        console.log(res)
    })
   })