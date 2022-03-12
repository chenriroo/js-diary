import View from "./View";
import PreviewEntry from "./previewEntryView";

class Entries extends View {
	_parentElement = this.selectEl('.sidebar__entries');


	HTML() {
		//console.log(this._data)
		return `
			<ul class="entries__list">
				${this._data.entries.map(entry => PreviewEntry.render([entry, this._data.entrySize], false)).join('')}
			</ul>

			<button class="btn btn--new-entry">New Entry</button>
			`
	}
	removeListeners() {
		this._parentElement.removeEventListener('click');
	}

	listenerCreateEntry(handler) {
		let el = document.querySelector('.btn--new-entry')
		el.addEventListener('click', e => {
			handler()
		})
	}
	
	listenerSelectEntry(handler) {
		const elListener = document.querySelector('.entries__list')
		elListener.addEventListener('click', e => {
			let targetEl = e.target;
			if(targetEl.tagName === 'DIV') targetEl = targetEl.parentNode;
			if(targetEl.tagName === 'SPAN') targetEl = targetEl.parentNode.parentNode;
			if(targetEl.tagName !== 'A') return
			
			const hash = targetEl.hash.substr(1,1);

			handler(hash, 'curEntries');
		})
	}

	listenerDeleteEntry(handler) {
		console.log('listenerDeleteEntry')
	}	

	addListener(handlers) {

		// const hash = el.hash.substring(1); // select anchor element
		// handler.selectEntry(hash);
	}
}

export default new Entries()