import View from "./View";

class SettingsMenu extends View {
	_parentElement = document.querySelector('.container');
	_overlay;
	_settings;
	
	HTML() {
		console.log(this._data)
		return `
			<div class="overlay"></div>
			<div class="settings">
			<div class="settings__block">
				<label for="theme-select">Theme</label>
				<select name="theme" id="theme-select">
					<option value="basic-light">Basic Light</option>
					<option value="basic-dark">Basic Dark</option>
				</select>
			</div>
		</div>
		`
	}

	assignVariables() {
		this._overlay = document.querySelector('.overlay');
		this._settings = document.querySelector('.settings')
	}

	transitionIn() {
		setTimeout(() => {
			this._overlay.classList.toggle('overlay--visible');
			this._settings.classList.toggle('settings--visible');
		},1)

	}

	transitionOut() {
		setTimeout(() => {
			this._overlay.classList.toggle('overlay--visible')
			this._settings.classList.toggle('settings--visible');
		},1)
	}

	remove() {
		this._overlay.remove();
		this._settings.remove();
	}

	addListener(handler) {
		this._overlay.addEventListener('click', e => {
			handler.close(true);
		})

		this._settings.addEventListener('click', e => {
			let input = e.target;
			if(input.tagName !== 'INPUT' && input.tagName !== 'SELECT') return;
			
			if(input.tagName === 'SELECT') {
				input = {
					setting: 'theme',
					value: input.value
				}
			}

			if(input.tagName === 'INPUT') {
				input = {
					setting: 'entrySize',
					value: input.value
				}
			}

			handler.setting(input);
		})
	}
}

export default new SettingsMenu();