import View from "./View";
import PreviewEntry from "./previewEntryView";

class Entries extends View {
	_parentElement = this.selectEl('.entries');

	entryHover(e) {
		const target = e.target;
		if(target.classList.contains('entryPreview--multi')) {
			const block = target.querySelector('.entryPreview__entry-block')
			block.classList.toggle('hidden');
			console.log(target)
		} else if(target.classList.contains('entryPreview--empty')) {
			const block = target.querySelector('.entryPreview__hover')
			block.classList.toggle('hidden');
		} if(target.classList.contains('entryPreview--single')) {
			console.log(target)
		} else return
	}



	entryClick(e, handler) {
		let target = e.target;
		if(target.tagName==='SPAN') target = target.parentNode;
		if(target.tagName!=='A') return
		console.log(target)
	}

	addListeners(handler) {
		//this._parentElement.addEventListener('click', this.entryClick);
		this._parentElement.addEventListener('mouseenter', this.entryHover, true);
		this._parentElement.addEventListener('mouseleave', this.entryHover, true);
	}

	HTML() {
		//console.log('entriesView._data',this._data)
		return `
			<nav class="entries">
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