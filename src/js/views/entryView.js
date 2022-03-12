import View from "./View";

class EntryView extends View {
	_parentElement = this.selectEl('.main')

	HTML() {
		return `
			<div class="entry entry__view">
				<div class="entry__settings">
					<button class="btn">Edit</button>
					<button class="btn">Delete</button>
				</div>
				<h1>${this._data.entry.date}, ${this._data.entry.time}</h1>
				<p>${this._data.entry.content}</h1>
			</div>
		`
	};

	deleteEntry() {
		console.log('entryView.deleteEntry()')
		handler(this._data.entry.id);
	}

	addListenerToggleView(handler) {
		const settings = document.querySelector('.entry__settings');
		settings.addEventListener('click', e => {
			if(e.target.textContent === 'Edit') handler(true);
		});
	};

	addListenerDelete(handler) {
		const settings = document.querySelector('.entry__settings');
		settings.addEventListener('click', e => {
			if(e.target.textContent === 'Delete') this.deleteEntry(handler)
		});
	};

}

export default new EntryView()