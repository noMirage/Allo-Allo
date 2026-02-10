import { EditorState } from "draft-js";

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

export function validateFullName(value: string) {
  let error;
  if (!value || value.trim() === "") {
    return "Заповніть поле!";
  }

  const trimmedValue = value.trim();

  if (trimmedValue.length < 3) {
    return "Ім’я занадто коротке";
  }
  if (trimmedValue.length > 50) {
    return "Ім’я занадто довге";
  }

  const words = trimmedValue
    .split(/\s+/)
    .filter((w) => w.replace(/[-']/g, "").length > 0);

  if (words.length < 2) {
    return "Введіть ім’я та прізвище";
  }

  const regex = /^[А-Яа-яЁёЇїІіЄєҐґA-Za-z'-]+$/;
  for (const word of words) {
    if (!regex.test(word)) {
      return "Поле містить недопустимі символи";
    }
  }
  return error;
}

export function validateDescription(editorState: EditorState) {
  let error;
  const plainText = editorState.getCurrentContent().getPlainText().trim();
  if (!plainText) return "Заповніть поле!";
  return error;
}
