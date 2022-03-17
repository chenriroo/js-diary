import View from './View';
import PreviewEntry from './previewEntryView';
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
				<div class="home__new-entry">
					<div class="block block--centered" data-home="newEntryBox">
						${this._htmlBlock}
					</div>
				</div>

				<div role="navigation" class="home__recent-entries">					
					${this._data.map(entry => PreviewEntry.render([entry, 'home'], false)).join('')}
				</div>
			</div>
		`
	}

	expandNote(handlers) {
		const elEntry = document.querySelector('.home__new-entry');
		const entries = document.querySelector('.home__recent-entries');
		const newEntryBox = document.querySelector("[data-home='newEntryBox']");
		
		let entry;
		let markup;

		const text = document.querySelector('h1'); // ?specificity?
		const btn = document.querySelector("[data-button='home-newEntry']");

		text.classList.toggle('invisible');
		btn.classList.toggle('invisible');

		elEntry.classList.toggle('home__new-entry--expanded');
		newEntryBox.classList.toggle('block--expand');
		entries.classList.toggle('home__recent-entries--shrink');

		setTimeout(() => {
			handlers.createEntry()
			.then(curEntry => { // entry object: date,content,id
				markup = EntryEdit.render({entry: curEntry}, false);
				newEntryBox.insertAdjacentHTML('afterbegin', markup);
				document.querySelector("[data-btn='toggleView']").remove();
				entry = document.querySelector('.entry');
				entry.classList.add('invisible', 'entry--inset');

				this.addListenerDelete(curEntry.id, handlers);
				EntryEdit.addListenerUpdate(handlers.updateEntry);
			})
			.catch(err => console.log(err, 'when creating new entry'));
		},300)

		
		setTimeout(() => {
			btn.remove();
			text.remove();
			entry.classList.toggle('invisible');
		},500);
	};

	deleteEntry(id, handlers) {
		console.log('homeView.deleteNote()', [id, handlers]);
		handlers.deleteEntry(id)
		this.resetLayout(handlers)
	}

	resetLayout(handlers) {
		const elEntry = document.querySelector('.home__new-entry');
		const newEntryBox = document.querySelector("[data-home='newEntryBox']");
		const entries = document.querySelector('.home__recent-entries');
		const entry = document.querySelector('.entry')

		entry.classList.toggle('invisible');
		setTimeout(() => {
			entry.remove();
			elEntry.classList.toggle('home__new-entry--expanded');
			newEntryBox.classList.toggle('block--expand');
			entries.classList.toggle('home__recent-entries--shrink');

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
			let targetEl = e.target;
			if(targetEl.tagName === 'DIV') targetEl = targetEl.parentNode;
			if(targetEl.tagName === 'SPAN') targetEl = targetEl.parentNode.parentNode;
			if(targetEl.tagName !== 'A') return

			const hash = targetEl.hash.substr(1,1);
			handler(hash, 'homeEntries');
		});
	}
}

export default new HomeView()