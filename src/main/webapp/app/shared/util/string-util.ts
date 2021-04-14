export const concatFullName = (firstName: string, lastName: string) => {
  if (firstName === null) {
    firstName = '';
  }
  if (lastName === null) {
    lastName = '';
  }
  return firstName + ' ' + lastName;
};
