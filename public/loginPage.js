const userForm = new UserForm()

userForm.loginFormCallback = (data => {
 ApiConnector.login(data, (res) => {
  if(res.success === false){
   userForm.setLoginErrorMessage(res.error)
   return 
  } 
  location.reload();
 })
})

userForm.registerFormCallback = (data => {
 ApiConnector.register(data, (res) => {
  if(res.success === false){
   userForm.setRegisterErrorMessage(res.error)
   return
  }
  location.reload();
 })
})
   