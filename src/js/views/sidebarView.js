import View from "./View";

class Sidebar extends View {
	_parentElement = document.querySelector('.sidebar');

	addListenerToggleView() {
		this._parentElement.addEventListener('click', e => {
			if(this._parentElement.classList.contains('sidebar--collapse')) {
				this._parentElement.classList.remove('sidebar--collapse')
			}
		})
	}

	toggleVisible() {
			this._parentElement.classList.toggle('sidebar--collapse')
	}

}

export default new Sidebar();