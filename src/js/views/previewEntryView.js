import View from "./View";

class PreviewEntryView extends View {

	HTML() {
		const a = `<span class="entryPreview__icon--entry">${this._data.time}</span>`
		const b = `<span class="entryPreview__icon--empty">Empty</span>`

		return `
			<a class="entryPreview ${this._data.hasEntry ? 'entryPreview--single': 'entryPreview--empty'}" href="#${this._data.id}" data-day="${this._data.day}">
				<span class="entryPreview__day">${this._data.day}</span>
				${this._data.hasEntry ? a : b}
			</a>
		`
		// IDEA/TODO: multiple entries on a day, hover over day to display the entries
		//<span class="entryPreview__time">${this._data.time}</span>
	}
}

export default new PreviewEntryView()