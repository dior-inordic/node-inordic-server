const multer = require('multer')
//Настраивае, куда будем сохранять файл
const uploadFromForm = multer({dest: 'uploads/'})
//Устанавливаем название файла на форме
const fileFromForm = uploadFromForm.single('MYFILE')
//импортируем воркер для работы с почтой
const WorkerForMail = require('../../services/worker-for-mail/index')
 
module.exports = (app)=> {
    /**
     * Маршрут для отправки сообщения админимтратору интренет-магазина
     * Автор: Ульмасбаев Мухамаддиёр
     * Описание: Возвращает JSON с результатом работы отправки письма 
     * Версия: v1
     * Метод: POST
     */
    app.post('/mail/send', fileFromForm, function(req, res){
        //Сообщение, которое мы передали с формы
        const messageToManager = req.body.TEXT;
        //Создадим экземпляр класс, передадим в конструктор для установки внутри воркера res req, как в других воркерах
        const workerForMail = new WorkerForMail(res, req)
        // Применим функию send, для отправки письма, передаем в него сообщение с формы
        workerForMail.sendMail(messageToManager)
    })

    /**
     * Вспомогательный маршрут с формой для отправки сообщения админимтратору интренет-магазина
     * Автор: Ульмасбаев Мухамаддиёр
     * Описание: Возвращает html форму
     * Версия: v1
     * Метод: GET
     * Пример работы с запросом:
     * Ввести в адресную строку - http://localhost:3000/mail/form
     */
    app.get('/mail/form', function(req, res){
        res.send(
            `
                <h1>
                Тестовая форма, для маршрута - /mail/send
                </h1>
                <form enctype="multipart/form-data" action='/mail/send' method='post'>
                    <input placeholder='TEXT' type='text' name='TEXT'/>
                    <input value='Отправить письмо' type='submit'/>
                </form>
            `
        )
    })
 }