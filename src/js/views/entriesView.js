import View from "./View";
import PreviewEntry from "./previewEntryView";

class Entries extends View {
	_parentElement = this.selectEl('.sidebar__entries');


	HTML() {
		//console.log(this._data)
		return `
			<nav role="navigation" class="entries__list">
				${this._data.entries.map(entry => PreviewEntry.render([entry, this._data.entrySize], false)).join('')}
			</nav>
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
	

	// Not used, instead using hash in anchortag
	listenerSelectEntry(handler) {
		const elListener = document.querySelector('.entries__list')
		elListener.addEventListener('click', e => {
			let targetEl = e.target;
			if(targetEl.tagName === 'DIV') targetEl = targetEl.parentNode;
			if(targetEl.tagName === 'SPAN') targetEl = targetEl.parentNode.parentNode;
			if(targetEl.tagName !== 'A') return
			
			//const hash = targetEl.hash.substr(1,1);
			//handler('curEntries');
		})
	}
}

export default new Entries()