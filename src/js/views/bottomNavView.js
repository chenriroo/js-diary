import View from "./View";

class BottomNav extends View {
	_parentElement = this.selectEl('.bottom-nav');
	_btnEntries = this.selectEl('.btn--entries')
	
	addListeners(handler) {
		this._parentElement.addEventListener('click', e => {
			//e.preventDefault()
			const el = e.target;

			if(el.textContent === 'Home') {
				handler.home();
				window.location.href = '/'
			}

			if(el.textContent === 'Entries') {
				document.querySelector('.sidebar').classList.toggle('sidebar--collapse')
			}
		})
	}
}

export default new BottomNav()