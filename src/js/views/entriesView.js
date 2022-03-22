import View from "./View";
import PreviewEntry from "./previewEntryView";

class Entries extends View {
	_parentElement = this.selectEl('.sidebar__entries');

	removeListenerCreateEntry() {
		this._parentElement.removeEventListener('click')
	}

	addlistenerCreateEntry(handler) {
		const foo = document.querySelectorAll('.entries__column')


		foo.forEach(el => {
			el.addEventListener('click', e => {
				let target = e.target
	
				if(target.tagName === 'DIV')target = target.parentNode;
				if(target.tagName === 'SPAN')target = target.parentNode.parentNode;
				if(target.classList.contains('entryPreview--single')) return
				console.log('addListenerCreateEntry()')
				handler(true, target.dataset.day)
			})
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