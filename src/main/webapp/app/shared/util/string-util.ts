export const concatFullName = (firstName?: string, lastName?: string) => {
  if (firstName === undefined) {
    firstName = '';
  }
  if (lastName === undefined) {
    lastName = '';
  }
  return firstName + ' ' + lastName;
};
