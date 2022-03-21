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
				<div class="block block--centered">
					${this._htmlBlock}
				</div>
		`
	}

	expandNote(handlers) {
		//console.log(handlers)
		const home = document.querySelector('.block')
		home.classList.toggle('invisible')

		setTimeout(() => {
			home.remove();
		},100);

		handlers.createEntry() // handleCreateEntry()

		// Instead just call the handleCreateEntry() which calls handleDisplayEntry()
		// Leaving this here incase i change my mind

		// .then(curEntry => { // entry object: date,content,id
		// 	const markup = EntryEdit.render({edit: true, entry: curEntry}, false);
		// 	this._parentElement.insertAdjacentHTML('afterbegin', markup);
		// 	document.querySelector('.entry').classList.add("invisible");
		// 	EntryEdit.transitionIn(1);

		// 	this.addListenerDelete(curEntry.id, handlers);
		// 	EntryEdit.addListenerUpdate(handlers.updateEntry);
		// })
		.catch(err => console.log(err, 'when creating new entry'));
	};

	addListenerDelete(id, handlers) {
		const el = document.querySelector("[data-btn='delete']");
		el.addEventListener('click', () => handlers.deleteEntry(id));
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