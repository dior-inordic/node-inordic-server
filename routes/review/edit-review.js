// Добавляем плагин multer для работы с формами и файлами в node.js
const multer = require('multer')
//настраиваем куда будем сохранять файл
const uploadFromForm = multer({ dest: 'uploads/' })
// устанавливаем название файла в форме
const fileFromForm = uploadFromForm.single('MYFILE')

const WorkerTableReview = require('../../services/worker-tables/reviews')

module.exports = (app, connect) => {
    app.post('/reviews/edit_review', fileFromForm, function (req, res) {
        // тут не можем читать данные с формы без дополнительных плагинов

        const data = {
            ID: req.body.ID,
            TEXT: req.body.TEXT,
            USER: req.body.USER,
            GOOD_ID: req.body.GOOD_ID
        }

        //инициализируем объект класс workertablereview  при этом ему передаем в конструктор
        const workerTableReview = new WorkerTableReview(res, req)
        //добавляем пользователя через воркер
        workerTableReview.update(data)

    })
    /**
     * Вспомогательный маршрут для редактирования отзыва:
     * Автор: Ульмасбаев Мухамаддиёр
     * Описание: Выводить форму на интейфейс для редактирования отзыва
     * Версия: v1
     * Метод: GET
     * Пример работы с запросом:
     * Ввести в адресную строку - http://localhost:3000/form_edit_review
     */

    app.get('/form_edit_review', function (req, res) {
        res.send(
            `
                <h1>
                    Тестовая форма для редактирования отзыва - edit_review
                </h1>
                <form enctype="multipart/form-data" action='/users/edit_review' method='post'>
                    <input placeholder="TEXT" type="text" name="TEXT"/>
                    <input placeholder="USER" type="text" name="USER"/>
                    <input placeholder="GOOD_ID" type="text" name="GOOD_ID"/>
                    <input type='submit' value="Добавить"/>
                </form>
            `
        )
    })
}