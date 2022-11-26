const WorkerTableReview = require('../../services/worker-tables/reviews')

/**
 * Маршрут для получения одного отзыва:
 * Автор: Румянцев Александр
 * Описание: Возвращает JSON с одним отзывом
 * Версия: v1
 * Метод: GET
 * Пример работы с запросом:
 * Ввести в адресную строку - http://localhost:3000/review/(id отзыва)
 */

module.exports = app =>
    app.get('/reviews/get/:id', function (req, res) {
        const { id } = req.params
        console.log('id пользователя: ', id)
        const workerTableReview = new WorkerTableReview(res, req)
        workerTableReview.get(id)
    })