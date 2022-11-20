const multer = require('multer')
//Настраивае, куда будем сохранять файл
const uploadFromForm = multer({dest: 'uploads/'})
//Устанавливаем название файла на форме
const fileFromForm = uploadFromForm.single('MYFILE')
//импортируем плагин
const nodemailer = require('nodemailer')
 
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
        //Создали объект через функцию createTransport, который содержит настройки 
        let transporter = nodemailer.createTransport({
            host: 'smtp.yandex.ru', // хостинг почты яндекса
            port: 465, // порт почты
            secure: 465, // Эта конфигурация откроет соединение с сервером TLS с самозаверяющим или недействительным сертификатом TLS.
            auth: {
                user: "inordic2022", 
                pass: "inordic" 
            }
        });
        //Создадим объект с опциями для письма
        let mailOptions = {
            from: '"inordic" <inordic2022@yandex.ru', // sender address
            to: 'r-sasha@list.ru', // тут указываем адресс менеджера
            subject: 'Письмо от магазина InordicShoop', // Subject line
            html: messageToManager // html body
        };

        //Отправляем письмо
        transporter.sendMail(mailOptions, (error, info) => {
            //обрабатываем ошибку, если она возникла
            if (error) {
                res.send(error);
            }
            res.send('Message %s sent: %s', info.messageId, info.response);
        });


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