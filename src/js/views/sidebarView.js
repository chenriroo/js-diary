import View from "./View";

class Sidebar extends View {
	_parentElement = document.querySelector('.sidebar');


	toggleDisplay() {
		if(this._parentElement.classList.contains('sidebar--collapse')) {
			this._parentElement.classList.toggle('hidden');
			setTimeout(() => {
				this._parentElement.classList.toggle('sidebar--collapse')
			}, 100);
		} else {
			this._parentElement.classList.toggle('sidebar--collapse')

			setTimeout(() => {
				this._parentElement.classList.toggle('hidden');
			}, 200)
		}

	}



}

export default new Sidebar();