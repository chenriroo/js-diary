import View from "./View";

class BottomNav extends View {
	_parentElement = this.selectEl('.bottom-nav');
	_btnEntries = this.selectEl('.btn--entries')
	
	addListener(handler) {
		this._parentElement.addEventListener('click', e => {
			e.preventDefault()
			const el = e.target;

			if(el.textContent === 'Home') {
				handler.home();
				window.location.href = '/'
			}

			if(el.textContent === 'Entries') {
				handler.entries();
			}
			if(el.textContent === 'Settings') {
				const el = document.querySelector('.container');
				const settings = document.querySelector('.settings');
				
				el.contains(settings) ? handler.settings(true) : handler.settings(false)
			}
		})
	}
}

export default new BottomNav()