const userForm = new UserForm()

userForm.loginFormCallback = (data => {
 ApiConnector.login(data, (res) => {
  if(res.success === false){
   userForm.setLoginErrorMessage(res.error)
  }
 })
})

userForm.registerFormCallback = (data => {
 ApiConnector.register(data, (res) => {
  if(res.success === false){
   userForm.setRegisterErrorMessage(res.error)
  }
 })
})

const logoutButton = new LogoutButton()

logoutButton.action = (data => {
    ApiConnector.logout(data, (res) => {
        console.log(res)
    })
   })
   