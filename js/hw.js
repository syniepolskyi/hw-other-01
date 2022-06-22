

const countries = [
    "Ukraine",
    "Poland",
    "Croatia",
    "Montenegro",
    "France",
    "USA",
  ];
  const successMsg = "Логін успішний";
  
  const countriesPrice = [100, 200, 300, 400, 500, 600];
  const maxLoginAttempts = 5;
  
  let currentUserIndex = -1;
  let loginAttempts = 0;

  let users = [];

  const userRegistration = function(){
      let userName = prompt("New user :: name:");
      if(typeof(userName) !== "string" || userName.replaceAll(" ","") === "" ){
        alert("Значення userName не може бути порожнім, користувача не зареєстровано");
        return;
      }
      let userPass = prompt("New user :: password:");
      if(typeof(userPass) !== "string"){
        alert("Пароль користувача не задано, користувача не зареєстровано");
        return;
      }
      let userCredits = prompt("New user :: credits:");
      userCredits = parseFloat(userCredits);

      if (isNaN(userCredits) || Math.abs(userCredits) === Infinity ){
          alert("Неправильне значення userCredits, користувача не зареєстровано");
          return ;
      }
      users.push({
        name: userName,
        pass: userPass,
        credits: parseFloat(userCredits)
      });
  };

  const userLogin = function(){
    if(users.length === 0){
        alert("Жодного користувача не зареєстровано");
        return ;
    }
    let userName = prompt("User name:");
    let userPass = prompt("User password:");
    const userIndex = users.findIndex(u => u.name === userName && u.pass === userPass);
    if (userIndex >= 0){
        console.log(successMsg);
        alert(successMsg);
        currentUserIndex = userIndex;
        loginAttempts = 0;
        return ;
    }
    loginAttempts++;
    if(loginAttempts < maxLoginAttempts){
        alert(`Невірний логін або пароль. Спроб входу: ${loginAttempts} з ${maxLoginAttempts}`)
        return userLogin();
    }
    alert(`Забагато спроб входу`);
    loginAttempts = 0;
};

const pickUserCountry = function(){
    if(currentUserIndex === -1){
        userLogin();
    }
    if(currentUserIndex === -1){
        alert("Помилка входу");
        return ;
    }
    let maxPrice = prompt("Max price:");
    let userCountries = [];
    maxPrice = parseFloat(maxPrice);
    if (isNaN(maxPrice) || Math.abs(maxPrice) === Infinity ){
        alert(`Значення maxPrice не вірне`);
        return;
    }
    if (maxPrice > users[currentUserIndex].credits){
        alert(`Значення maxPrice не може бути більше, ніж у Вас кредитів (${users[currentUserIndex].credits})`);
        return;
    }
    for (let i = 0; i < countriesPrice.length; i++){
        if (countriesPrice[i] <= maxPrice){
            userCountries.push(countries[i]);
        }
    }
    if (userCountries.length === 0){
        alert("Вибачте, але для Вас жодна країна не є доступною");
        return ;
    }
    alert("Для Вас доступні країни: " + userCountries.join(", "));
    let userCountry = prompt("Напишіть країну із доступних " + userCountries.join(", "));
    let userCountryIndex = countries.indexOf(userCountry);
    if (userCountryIndex < 0){
        alert("Країну не знайдено");
        return ;
    }
    users[currentUserIndex].credits -= countriesPrice[userCountryIndex];
    alert(`Чудовий вибір! 
    Ви замовили країну ${countries[userCountryIndex]}, 
    ціна: ${countriesPrice[userCountryIndex]},
    залишилося у Вас на рахунку: ${users[currentUserIndex].credits}`);
};
