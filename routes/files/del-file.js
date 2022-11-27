//Импортируем плагин для работы с формой
const multer = require('multer')
//Модуль для работы с файловой системой
const fs = require("fs");
//Настраивае, куда будем сохранять файл
const uploadFromForm = multer({dest: 'uploads/'})
//Name инпута для загрузки файла
const fileFromForm = uploadFromForm.single('MYFILE')

module.exports = (app) => {

    /**
     * Маршрут для удаления файла
     * Автор: Ульмасбаев Мухамаддиёр
     * Описание: Реализует удаления файла из папки на сервере
     * Версия: v1
     * Метод: POST
     */
     app.post('/file/del', fileFromForm, function(req, res){
        //Получим название файла, переданное из формы
        const fileName = req.body.name
        const resFromAPI = {}
        //Применяем метод unlink для удаления
        fs.unlink(`./uploads/${fileName}`, function(err){
            if(err){
                resFromAPI.status = 500;
                resFromAPI.message = 'Файл не удалось удалить из папки'
                resFromAPI.error = err
                res.send(
                    JSON.stringify(resFromAPI)
                )
            }else{
                resFromAPI.status = 200;
                resFromAPI.message = 'Файл успешно удален из папки'
                res.send(
                    JSON.stringify(resFromAPI)
                )
            }
        })
     })


     /**
     * Вспомогательный маршрут для удаления файла
     * Автор: Ульмасбаев Мухамаддиёр
     * Описание: Выводить форму на интерфейс для удаления файла 
     * Версия: v1
     * Метод: GET
     * Пример работы с запросом: 
     * Ввести в адресную строку - http://localhost:3000/form_del_file
     */
      app.get('/form_del_file', function(req, res){
        res.send(
            `
                <h1>
                Тестовая форма, для маршрута - /file/del
                </h1>
                <form enctype="multipart/form-data"  action='/file/del' method='post'>
                    <input type='text' name='name' placeholder='Введите название файла'/>
                    <input type='submit' value='Удалить' />
                </form>
            `
        )
    })

}