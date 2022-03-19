import View from "./View";

class PreviewEntryView extends View {

	HTML() {
		const [entry, entrySize] = this._data;
		let day;
		let content;
		let cssClass;

		if(entrySize === 'small') {
			day = entry.date.slice(8,10);
			content = entry.content.slice(0,5);
			cssClass = 'entryPreview--small';
		} else if (entrySize ==='normal') {
			day = entry.date.slice(8,10);
			content = entry.content.slice(0,100);
			cssClass = '';
		} else if (entrySize ==='home') {
			day = entry.date.slice(8,10);
			content = entry.content.slice(0,200);
			cssClass = 'entryPreview--home';
		}

		return `
			<a class="entryPreview ${cssClass}" href="#${entry.id}">
				<div class="entryPreview__day">
					<span>${day}</span>
				</div>
				<div class="entryPreview__other">
					<span class="entryPreview__time">${entry.time}</span>
					<span class="entryPreview__content">${content}</span>
				</div>
			</a>
		`
	}
}

export default new PreviewEntryView()