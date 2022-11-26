// Добавляем плагин multer для работы с формами и файлами в node.js
const multer = require('multer')
//настраиваем куда будем сохранять файл
const uploadFromForm = multer({ dest: 'uploads/' })
// устанавливаем название файла в форме
const fileFromForm = uploadFromForm.single('MYFILE')
const uuid = require('uuid')
const WorkerTableUser = require('../../services/worker-tables/reviews')

module.exports = (app, connect) => {
    app.post('/review/add', fileFromForm, function (req, res) {
        // тут не можем читать данные с формы без дополнительных плагинов

        const data = {
            ID: uuid.v4(),
            TEXT: req.body.TEXT,
            USER: req.body.USER,
            GOOD_ID: req.body.GOOD_ID
        }

        //инициализируем объект класс workertableuser  при этом ему передаем в конструктор
        const workerTableReview = new WorkerTableReview(res, req)
        //добавляем пользователя через воркер
        workerTableReview.add(data)
    })
    /**
     * Вспомогательный маршрут для добавления отзыва:
     * Автор: Ульмасбаев Мухамаддиёр
     * Описание: Выводить форму на интейфейс для добавления отзыва
     * Версия: v1
     * Метод: GET
     * Пример работы с запросом:
     * Ввести в адресную строку - http://localhost:3000/form_add_review
     */

    app.get('/form_add_review', function (req, res) {
        res.send(
            `
                <h1>
                    Тестовая форма для маршрута - add_review
                </h1>
                <form enctype="multipart/form-data" action='/review/add' method='post'>
                    <input placeholder="TEXT" type="text" name="TEXT"/>
                    <input placeholder="USER" type="text" name="USER"/>
                    <input placeholder="GOOD_ID" type="text" name="GOOD_ID"/>
                    <input type='submit' value="Добавить"/>
                </form>
            `
        )
    })
}