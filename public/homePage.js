const logoutButton = new LogoutButton()

logoutButton.action = () => { 
    ApiConnector.logout((res) => { 
        if(res.success){ 
            location.reload() 
        } 
    }) 
}