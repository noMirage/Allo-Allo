export function validateEmail(value: string) {
  let error;
  if (!value) {
    error = "Заповніть поле";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Неправильний Email!";
  }
  return error;
}

export function validateBaseField(value: string) {
  let error;
  if (!value || value === "") {
    error = "Заповніть поле!";
  }
  return error;
}

export function validatePhone(value: string) {
  let error;
  if (!value || value.length <= 10) {
    error = "Заповніть поле!";
  }
  return error;
}
