const WorkerTableReview = require('../../services/worker-tables/reviews')

module.exports = (app, connect) => {
    app.get('/review/get', function (req, res) {
        console.log('WorkerTableUsers')
        // Создадим экземпляр вспомогательного класса
        const workerTableReview = new WorkerTableReview(res, req)
        workerTableReview.getAll()
    })
}