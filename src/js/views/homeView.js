import View from './View';
import EntryEdit from './entryEditView';

class HomeView extends View {
	_parentElement = document.querySelector('.main');
	_htmlBlock = `
			<h1>Create new entry</h1>
			<button class="btn btn--new-entry" data-button="home-newEntry">Add entry</button>
	`;

	HTML() {
		//console.log(this._data)
		return `
			<div class="home">
				<div class="block block--centered">
					${this._htmlBlock}
				</div>
			</div>
		`
	}

	expandNote(handlers) {
		//console.log(handlers)
		const home = document.querySelector('.home')
		home.classList.toggle('invisible')

		setTimeout(() => {
			handlers.createEntry()
			.then(curEntry => { // entry object: date,content,id
				const markup = EntryEdit.render({entry: curEntry}, false);
				this._parentElement.insertAdjacentHTML('afterbegin', markup);
				document.querySelector('.entry').classList.add("invisible");
				EntryEdit.transitionIn(1);

				this.addListenerDelete(curEntry.id, handlers);
				EntryEdit.addListenerUpdate(handlers.updateEntry);
			})
			.catch(err => console.log(err, 'when creating new entry'));
		},100)

		
		setTimeout(() => {
			home.remove();
		},150);
	};

	deleteEntry(id, handlers) {
		console.log('homeView.deleteNote()', [id, handlers]);
		handlers.deleteEntry(id)
		this.resetLayout(handlers)
	}

	resetLayout(handlers) {
		const elEntry = document.querySelector('.home__new-entry');
		const entry = document.querySelector('.entry')

		entry.classList.toggle('invisible');
		setTimeout(() => {
			entry.remove();
			elEntry.classList.toggle('home__new-entry--expanded');
			newEntryBox.classList.toggle('block--expand');

			newEntryBox.insertAdjacentHTML('afterbegin', this._htmlBlock);
			const btn = document.querySelector("[data-button='home-newEntry']");
			this.addListenerCreateEntry(handlers);
		},200)
	}

	addListenerDelete(id, handlers) {
		const el = document.querySelector("[data-btn='delete']");
		el.addEventListener('click', e => this.deleteEntry(id, handlers));
	}

	addListenerCreateEntry(handlers) {
		const el = document.querySelector("[data-button='home-newEntry']");
		el.addEventListener('click', e => this.expandNote(handlers));
	}


	// Not used, instead using hash in anchortag
	addListenerViewEntry(handler) {
		const element = document.querySelector('.home__recent-entries');
		element.addEventListener('click', e => {
			e.preventDefault();
			let targetEl = e.target;
			if(targetEl.tagName === 'DIV') targetEl = targetEl.parentNode;
			if(targetEl.tagName === 'SPAN') targetEl = targetEl.parentNode.parentNode;
			if(targetEl.tagName !== 'A') return

			// const hash = targetEl.hash.substr(1,1);
			// handler(hash, 'homeEntries');
		});
	}
}

export default new HomeView()