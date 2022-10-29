/**
 * Маршрут для получения всех товаров:
 * Автор: Ульмасбаев Мухамаддиёр
 * Описание: Возвращает JSON со спском всех товаров
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/get_all_good
 */
 module.exports = (app, connect) => app.get('/get_all_good', function(request, response){
    
    //Составим запрос для базы данных
    // SELECT - выборка (получить), ключевое слово
    // * - обозначение всех полей в базе
    // FROM - ключевое слово, означает откуда
    // goods - название таблицы в базе данных
    const sql = 'SELECT * FROM goods'

    //Отправить запрос на серве
    // для отправки запроса используем функцю query, передаем первым параметром запрос, а вторым 
    connect.query(
        sql,
        (error, result) => {
            //Если есть ошибка, выведем ее
            if(error){
                //Выводим ошибку
                response.send(
                    error
                )
            //если ошибки нет
            }else{
                //отправляем результат запроса на экран
                response.send(
                    //Предварительно, через метод JSON.stringify, преобразуем объект в строку JSON
                    JSON.stringify(result)
                )
            }
        }
    )
})