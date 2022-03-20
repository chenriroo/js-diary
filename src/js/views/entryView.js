import View from "./View";

class EntryView extends View {
	_parentElement = document.querySelector('.main');

	HTML() {
		const content = 'aaa'//this._data.entry.content.replaceAll('\n','<br/>')

		const view = `
		<div class="entry entry__view">
			<div class="entry__settings">
				<button class="btn">Edit</button>
				<button class="btn">Delete</button>
			</div>
			<h1>${this._data.entry.date}, ${this._data.entry.time}</h1>
			<p>${content}</p>
		</div>
		`

		const edit = `
		<div class="entry entry__edit">
			<div class="entry__settings">
				<button class="btn" data-btn="toggleView">View</button>
				<button class="btn" data-btn="delete">Delete</button>
			</div>

			<form class="form">
				<input title="date" type="date" class="form__date" name="date" id="date" value="${this._data.entry.date}">
				<input title="time" type="time" class="form__time" name="time" id="time" value="${this._data.entry.time}">
				<textarea title="content" class="form__textarea" id="content" name="content" placeholder="Dear diary...">${this._data.entry.content}</textarea>
				<input type="submit" value="Apply">
			</form>
		</div>
		`

		return `
			${view};
		`
	};

	transitionIn(delay=1000) {
		setTimeout(() => {
			const entry = document.querySelector('.entry')
			entry.classList.remove('invisible');
		},delay)

	}

	transitionOut(delay=1000) {
		setTimeout(() => {
			const entry = document.querySelector('.entry')
			entry.classList.add('invisible');
		},delay)
	}

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