// Инициализация глобального состояния
export const globalState = new Map();

// Функция для изменения состояния
export function updateState(key, data) {
  globalState.set(key, data);
}
