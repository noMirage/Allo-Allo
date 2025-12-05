export function validateEmail(value: string) {
  let error;
  if (!value) {
    error = "Required";
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
