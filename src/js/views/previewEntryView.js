import View from "./View";

class PreviewEntryView extends View {

	HTML() {

		return `
			<a class="entryPreview ${this._data.hasEntry ? 'entryPreview--single': ''}" href="#${this._data.id}" data-day="${this._data.day}">
				<div class="entryPreview__day">
					<span>${this._data.day}</span>
				</div>
				<div class="entryPreview__other">
					<span class="entryPreview__time">${this._data.time}</span>
				</div>
			</a>
		`
	}
}

export default new PreviewEntryView()