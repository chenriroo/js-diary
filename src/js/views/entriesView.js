import View from "./View";
import PreviewEntry from "./previewEntryView";

class Entries extends View {
	_parentElement = this.selectEl('.sidebar__entries');

	listenerCreateEntry(handler) {
		let el = document.querySelector('.btn--new-entry')
		el.addEventListener('click', e => {
			handler()
		})
	}

	HTML() {
		return `
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
			`
	}
}

export default new Entries()