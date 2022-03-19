import View from "./View";

class Sidebar extends View {
	_parentElement = document.querySelector('.sidebar');


	toggleVisible() {
			this._parentElement.classList.toggle('sidebar--collapse')
	}

}

export default new Sidebar();