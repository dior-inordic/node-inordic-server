//Добавляем плагин multer, для работы с формами и файлами в node.js
const multer = require('multer')
//Настраивае, куда будем сохранять файл
const uploadFromForm = multer({dest: 'uploads/'})
//Устанавливаем название файла на форме
const fileFromForm = uploadFromForm.single('MYFILE')

const WorkerTableUser = require('../../services/worker-tables/users')

module.exports = (app, connect) => {

    /**
     * Маршрут для добавления оного пользователя:
     * Автор: Ульмасбаев Мухамаддиёр
     * Описание: Возвращает JSON с полями, которые описывают успешное редактирование пользователя в БД 
     * Версия: v1
     * Метод: POST
     * Пример работы с запросом:
     */
     app.post('/users/edit', fileFromForm, function(req, res){

        //Получим данные с формы
        const data = {
            'ID': req.body.ID,
            'NAME': req.body.NAME,
            'SURNAME': req.body.SURNAME,
            'EMAIL': req.body.EMAIL,
            'IMG': req.body.IMG,
            'PHONE': req.body.PHONE,
            'LOGIN': req.body.LOGIN,
            'PASSWORD': req.body.PASSWORD,
            'ROLE': req.body.ROLE,
        }
        //Инициализируем объект класса WorkerTableUser, при этом передаем в конструктор 
        const workerTableUser = new WorkerTableUser(res, req)
        //Добавляем пользователя, через воркер
        workerTableUser.update(data)
     })

    /**
     * Вспомогательный маршрут для редактирование пользователя в БД
     * Автор: Ульмасбаев Мухамаддиёр
     * Описание: Выводить форму на интерфейс для редактирования пользователя 
     * Версия: v1
     * Метод: GET
     * Пример работы с запросом: 
     * Ввести в адресную строку - http://localhost:3000/form_edit_user
     */
     app.get('/form_edit_user', function(req, res){
        res.send(
            `
                <h1>
                    Тестовая форма, для маршрута - edit_user
                </h1>
                <form enctype="multipart/form-data" action='/users/edit' method='post'>
                    <input placeholder='ID' type='text' name='ID'/>
                    <input placeholder='NAME' type='text' name='NAME'/>
                    <input placeholder='SURNAME' type='text' name='SURNAME'/>
                    <input placeholder='IMG' type='text' name='IMG'/>
                    <input placeholder='EMAIL' type='text' name='EMAIL'/>
                    <input placeholder='PHONE' type='text' name='PHONE'/>
                    <input placeholder='LOGIN' type='text' name='LOGIN'/>
                    <input placeholder='PASSWORD' type='text' name='PASSWORD'/>
                    <input placeholder='ROLE' type='text' name='ROLE'/>
                    <input value='Сохранить' type='submit'/>
                </form>
            `
        )
    })
}