import View from "./View";
import PreviewEntry from "./previewEntryView";

class Entries extends View {
	_parentElement = document.querySelector('.sidebar__entries')

	addListenerCreateEntry(handler) {
		const el = this._parentElement.querySelector('.entries')
		el.addEventListener('click', e => {
			let target = e.target;
			if(target.classList.contains('entryPreview__day')) target = target.parentNode;
			if(target.classList.contains('entryPreview__create')) {
				handler(true, target.dataset.day)
			}
		})
	}

	addListenerSelectDropdownEntry(handler) {
		const el = this._parentElement.querySelector('.entries')
		el.addEventListener('click', e => {
			const target = e.target;
			if(target.tagName !== 'SELECT') return
			const value = target.value
			window.location = `/${value}`
		})
	}

	HTML() {
		//console.log('entriesView._data',this._data)
		return `
			<nav class="entries" role="navigation">
				<div class="entries__column">
					${this._data.entries[0].map(entry => PreviewEntry.render(entry, false)).join('')}
				</div>

				<div class="entries__column">
					${this._data.entries[1].map(entry => PreviewEntry.render(entry, false)).join('')}
				</div>

				<div class="entries__column">
					${this._data.entries[2].map(entry => PreviewEntry.render(entry, false)).join('')}
				</div>

				<div class="entries__column">
					${this._data.entries[3].map(entry => PreviewEntry.render(entry, false)).join('')}
				</div>

				<div class="entries__column">
					${this._data.entries[4].map(entry => PreviewEntry.render(entry, false)).join('')}
				</div>
			</nav>
			`
	}
}

export default new Entries()