import View from "./View";

class PreviewEntryView extends View {

	HTML() {
		console.log(this._data)

		return `
			<a class="entryPreview" href="#${this._data.id}">
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