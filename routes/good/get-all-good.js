const WorkerTableGood = require('../../services/worker-tables/goods')
/**
 * Маршрут для получения всех товаров:
 * Автор: Ульмасбаев Мухамаддиёр
 * Описание: Возвращает JSON со спском всех товаров
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/goods/get
*/
module.exports = (app) => app.get('/goods/get', function(req, res){
    const workerTableGood = new WorkerTableGood(res, req)
    workerTableGood.getAll();
})