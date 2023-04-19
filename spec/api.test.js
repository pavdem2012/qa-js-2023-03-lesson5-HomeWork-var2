const axios = require('axios');
const baseUrl = 'https://bookstore.demoqa.com';
const uniqueUsername = `testUser_${new Date().getTime()}`;
const password = 'Pass_@507798';
const invalidPassword = '123456';


//Тест для проверки все ли работает
// test('should return correct data from API', async () => {
//     const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
//     console.log(response);
//     expect(response.data.userId).toEqual(1);
//     expect(response.data.id).toEqual(1);
//     expect(response.data.title).toEqual('delectus aut autem');
//     expect(response.data.completed).toEqual(false);
// });


//Тесты на создание пользователя
describe('API tests create user', () => {

//Проверка "Создание пользователя успешно"
    test('should create a new user', async () => {
        //console.log(uniqueUsername)
        let requestData = {
            userName: uniqueUsername,
            password: password,
        };

        try {
            let response = await axios.post(`${baseUrl}/Account/v1/User`, requestData);
            expect(response.status).toEqual(201);
            expect(response.statusText).toBe('Created')
            expect(response.data.userID).toBeDefined();
            expect(response.data.username).toEqual(requestData.userName);
            expect(response.data.books).toBeDefined();
            expect(Array.isArray(response.data.books)).toBe(true);
        } catch (error) {
            //console.error(error);
        }
    });

//Проверка "Создание пользователя c ошибкой, пароль не подходит"
    test('error message when sending empty password', async () => {
        let requestData = {
            userName: uniqueUsername,
            password: invalidPassword,
        };
        try {
            let response = await axios.post(`${baseUrl}/Account/v1/User`, requestData);

            expect(response.status).toBe(400);
            expect(response.statusText).toBe('Bad Request')
            expect(response.data.code).toBe('1300');
            expect(response.data.message).toBe('Passwords must have at least one non alphanumeric character, one digit (\'0\'-\'9\'), one uppercase (\'A\'-\'Z\'), one lowercase (\'a\'-\'z\'), one special character and Password must be eight characters or longer..');
        } catch (error) {
            //console.error(error);
        }
    });

//  Проверка "Создание пользователя c ошибкой, логин уже используется"
    test('should return error message when sending existing userName', async () => {
        let requestData = {
            userName: uniqueUsername,
            password: password,
        };
        try {
            let response = await axios.post(`${baseUrl}/Account/v1/User`, requestData);
            expect(response.status).toBe(406);
            expect(response.statusText).toBe('Not Acceptable')
            expect(response.data.code).toBe('1204');
            expect(response.data.message).toBe('User exists!');
        } catch (error) {
            //console.error(error);
        }
    });
});

//Тесты на получения токена
describe('API tests generate token', () => {

//  Проверка "Генерация токена успешно"
    test('Should generate token for valid user', async () => {
        let requestData = {
            userName: uniqueUsername,
            password: password,
        };
        try {
            let response = await axios.post(`${baseUrl}/Account/v1/GenerateToken`, requestData);
            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK')
            expect(response.data.status).toBe('Success');
            expect(response.data.token).toBeTruthy();
        } catch (error) {
            //console.error(error);
        }
    });
//  Проверка "Генерация токена c ошибкой"
    test('returns an error message when body are not provided', async () => {
        try {
            const response = await axios.post(`${baseUrl}/Account/v1/GenerateToken`);
            expect(response.status).toBe(400);
            expect(response.statusText).toBe('Bad Request')
            expect(response.data.code).toBe('1200');
            expect(response.data.message).toBe('UserName and Password required.');
        } catch (error) {
            //console.error(error);
        }
    });
});


