const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.username) {
    errors.username = 'Required'
  }
  if (values.username && values.username.length < 3) {
    errors.username = 'Minimum length of username is 3'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  if (values.password && values.password.length < 5) {
    errors.password = 'Minimum length of password is 5'
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required'
  }
  return errors
}

export default validate