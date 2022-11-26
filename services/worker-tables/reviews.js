const WorkerDataBase = require('../worker-data-base')

module.exports = class WorkerTableReview extends WorkerDataBase {
	#name = 'reviews'
	constructor(res, req) {
		super()
		//устанавливаем атрибуты которые описаны в абстрактном классе
		this.name_table = this.#name
		this.response = res
		this.request = req
	}
}