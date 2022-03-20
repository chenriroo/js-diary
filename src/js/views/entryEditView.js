import View from "./View";

class EntryEditView extends View {
	_parentElement = document.querySelector('.main');

	HTML() {
		console.log(this._data)
		return `
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
	}

	transitionIn(delay=1000) {
		setTimeout(() => {
			const entry = document.querySelector('.entry')
			entry.classList.toggle('invisible');
		},delay)

	}

	transitionOut(delay=1000) {
		setTimeout(() => {
			const entry = document.querySelector('.entry')
			entry.classList.toggle('invisible');
		},delay)
	}

	deleteEntry(handler) {
		console.log('entryEditView.deleteEntry()')
		handler(this._data.entry.id);
	}

	addListenerToggleView(handler) {
		const btn = document.querySelector("[data-btn='toggleView']");
		btn.addEventListener('click', e => {
			if(e.target.textContent === 'View') handler(false);
		})
	}

	addListenerDelete(handler) {
		const btn = document.querySelector("[data-btn='delete']");
		btn.addEventListener('click', e => {
			if(e.target.textContent === 'Delete') this.deleteEntry(handler);
		})
	}

	addListenerUpdate(handlers) {
		const form = document.querySelector('.form');

		form.addEventListener('submit', e => {
			e.preventDefault();
			let formData = new FormData(form);
			const values = [...formData.values()];
			handlers(this._data.entry.id, values);
		});
	};
}

export default new EntryEditView()