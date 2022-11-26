const { text } = require('express');

/*
* класс WorkerForMail - отправить 
* Атрибуты
* configuration - защищенный атрибут, для авторизации в почте, через некого абрстактроного робота 
* mailOptions - опции для отправки 
*/ 
module.exports = class WorkerForMail{
    #nodemailer = require('nodemailer')
    #transport
    response
    request
    #configuration = {
            host: 'smtp.yandex.ru', // хостинг почты яндекса
            port: 465, // порт почты
            secure: 465, // Эта конфигурация откроет соединение с сервером TLS с самозаверяющим или недействительным сертификатом TLS.
            auth: {
            user: "inordic2022", 
            pass: "inordic" 
        }
    }
    #mailOptions = {
        from: '"inordic" <inordic2022@yandex.ru', // sender address
        to: 'mukhamaddier2001@yandex.ru', // тут указываем адресс менеджера
        subject: 'Письмо от магазина InordicShoop', // Subject line
        html: "" // html body
    };
    #createTransporter(){
        console.log('НОДЕМЭЙЛЕР', this.#nodemailer)
        return this.#nodemailer.createTransport(
            this.#configuration
        )
    }
    sendMail(text){
        this.#mailOptions.html = text
        this.#transport.sendMail(this.#mailOptions, (error, info) => {
            //обрабатываем ошибку, если она возникла
            if (error){
            this.response.send(error);
            }
            this.response.send('Message %s sent: %s', info.messageId, info.response);
        })
}
    constructor(res,req){
        this.#transport = this.#createTransporter()
        this.response = res
        this.request = req
    }
}