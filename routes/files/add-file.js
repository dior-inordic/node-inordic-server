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
     * Маршрут для добавления файла
     * Автор: Ульмасбаев Мухамаддиёр
     * Описание: Реализует добавления файла в папку на сервере
     * Версия: v1
     * Метод: POST
     */
    app.post('/file/add', fileFromForm, function(req, res){
        // Получаем файл из формы
        const fileFromForm = req.file
        //Путь к файлу (откуда мы его забираем)
        const pathToFile = fileFromForm.path
        //Путь к файлу (куда мы его передаем)
        const pathToSaveFile = "uploads/" + fileFromForm.originalname 
        //Создадим 2 тонеля для передачи данных
        // Читаем файл
        const src = fs.createReadStream(pathToFile)
        // Записываем файл
        const dest = fs.createWriteStream(pathToSaveFile)
        //Запускаем процесс записи 
        src.pipe(dest)

        //Опишем обработчики загрузки файла
        //Переменная для ответа от сервера при загрузке файла
        const resFromAPI = {}
        //Успешная загрузка
        src.on('end', function(){
            resFromAPI.status = 200;
            resFromAPI.message = 'Файл успешно загрузился';
            res.send(
                JSON.stringify(resFromAPI)
            )
        })

        //Ошибочная загрузка
        src.on('error', function(){
            resFromAPI.status = 500;
            resFromAPI.message = 'Файл не удалось загрузить по техническим причинам';
            res.send(
                JSON.stringify(resFromAPI)
            )
        })
    })

    /**
     * Вспомогательный маршрут для добавления файла
     * Автор: Ульмасбаев Мухамаддиёр
     * Описание: Выводить форму на интерфейс для добавления файла 
     * Версия: v1
     * Метод: GET
     * Пример работы с запросом: 
     * Ввести в адресную строку - http://localhost:3000/form_add_file
     */
     app.get('/form_add_file', function(req, res){
        res.send(
            `
                <h1>
                Тестовая форма, для маршрута - /file/add
                </h1>
                <form enctype="multipart/form-data"  action='/file/add' method='post'>
                    <input type='file' name='MYFILE'/>
                    <input type='submit' value='Сохранить' />
                </form>
            `
        )
    })

}