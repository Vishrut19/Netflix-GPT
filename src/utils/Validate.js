// export const checkValidData = (name, email, password) => {
//   const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
//     email
//   );
//   const isPasswordsValid =
//     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

//   const isNameValid = /^[a-zA-Z]+ [a-zA-Z]+$/.test(name);

//   if (!isEmailValid) return "Email ID is not valid";
//   if (!isPasswordsValid) return "Passwords is not valid";
//   if (!isNameValid) return "Username is not valid";

//   return null;
// };

export const checkValidData = (email, password) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isEmailValid) return "Email ID is not valid";
  if (!isPasswordValid) return "Password is not valid";

  return null;
};
