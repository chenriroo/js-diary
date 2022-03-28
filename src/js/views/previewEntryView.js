import View from "./View";

class PreviewEntryView extends View {

	generateSingleEntry(entry) {
		//<a href="#${entry.id}">${entry.time}</a>
		const anchor = `<a href="#${entry.id}">${entry.time}</a>`
		const option = `<option value=#${entry.id}>${entry.time}</a>`
		//console.log('generateSingleEntry', entry)
		return option
	}

	HTML() {
		const spanDay = `<span class="entryPreview__day">${this._data.day}</span>`
		const spanCreate = `<span class="entryPreview__create" data-day="${this._data.day}">+</span>`

		if(this._data.hasOwnProperty('multiEntry')) {
			//console.log(this._data)
			return `
			<div class="entryPreview entryPreview--multi" href="#">
				<div class="entryPreview__entry entryPreview__entry--multi" data-day="${this._data.day}">
				${spanDay}
					<select class="entryPreview__dropdown">
						${this._data.entries.map(entry => this.generateSingleEntry(entry)).join('')}
					</select>
				</div>
				${spanCreate}
			</div>
			`
		} else if(this._data.hasEntry) {
			return `
			<div class="entryPreview entryPreview--single" href="#${this._data.id}">
				<div class="entryPreview__entry">
					${spanDay}
					<a href="#${this._data.id}">
						${this._data.time}
					</a>
				</div>
				${spanCreate}
			</div>
			`
		} else {	// no entry
			return `
			<a class="entryPreview entryPreview--empty" href="#${this._data.id}">
				<div class="entryPreview__entry">
					${spanDay}
					<span>Empty</span>
				</div>
				${spanCreate}
			</a>
			`
		}
	}
}

export default new PreviewEntryView()