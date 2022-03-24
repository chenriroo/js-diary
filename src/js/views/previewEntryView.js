import View from "./View";

class PreviewEntryView extends View {

	HTML() {
		console.log(this._data)
		if(this._data.hasOwnProperty('multiEntry')) {
			return `
			<a class="entryPreview entryPreview--multi" href="#" data-day="${this._data.day}">
				<span class="entryPreview__day">${this._data.day}</span>
				<span class="entryPreview__icon--multi">M</span>
				<span class="entryPreview__entry-block hidden">
					blabla
				</span>
			</a>
			`
		} else if(this._data.hasEntry) {
			return `
			<a class="entryPreview entryPreview--single" href="#${this._data.id}" data-day="${this._data.day}">
				<span class="entryPreview__day">${this._data.day}</span>
				<span class="entryPreview__icon--entry">&#10003;</span>
			</a>
			`
		} else {
			return `
			<a class="entryPreview entryPreview--empty" href="#${this._data.id}" data-day="${this._data.day}">
			<span class="entryPreview__day">${this._data.day}</span>
			<span class="entryPreview__hover hidden">
				Create
			</span>
			</a>
			`
		}
		//<span class="entryPreview__time">${this._data.time}</span>
	}
}

export default new PreviewEntryView()