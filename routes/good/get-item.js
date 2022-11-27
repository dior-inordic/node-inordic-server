const WorkerTableGood = require('../../services/worker-tables/goods')
/**
 * Маршрут для получения оного товара:
 * Автор: Ульмасбаев Мухамаддиёр
 * Описание: Возвращает JSON с одним товаром 
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/goods/get/1
 */
module.exports = (app) => app.get('/goods/get/:id', function(req, res){
   //Получить данные из параметра 
   const {id} = req.params
   const workerTableGood = new WorkerTableGood(res, req)
   workerTableGood.get(id);
})