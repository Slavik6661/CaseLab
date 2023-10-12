// Инициализация глобального состояния
export const globalState = new Map();


// Функция для изменения состояния
export  function updateState(key, data) {
  globalState.set(key, data);
}

// Пример использования
// updateState("user", { username: "John", age: 30 });
// updateState("products", [{ id: 1, name: "Product 1" }, { id: 2, name: "Product 2" }]);
// updateState("settings", { theme: "dark", language: "en" });

// // Получение данных
// const userData = globalState.get("user");
// const productsData = globalState.get("products");
// const settingsData = globalState.get("settings");

// console.log(userData); // { username: "John", age: 30 }
// console.log(productsData); // [{ id: 1, name: "Product 1" }, { id: 2, name: "Product 2" }]
// console.log(settingsData); // { theme: "dark", language: "en" }



console.log(globalState)