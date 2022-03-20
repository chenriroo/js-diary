import View from "./View";

class Sidebar extends View {
	_parentElement = document.querySelector('.sidebar');



	resize(e) {
		console.log(e.clientY)
	}

	addListenerDragResize() {
		const el = document.querySelector('.sidebar__edge');

		el.addEventListener('mousedown', (e) => {
			e.preventDefault();
			document.addEventListener('mousemove', this.resize);
			document.addEventListener('mouseup', (e) => {
				document.removeEventListener('mousemove', this.resize)
			})
		})
	}

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