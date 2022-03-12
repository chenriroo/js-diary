import View from "./View";

class ListDates extends View {

	HTML() {
		return `
			<li>
				<button class="btn btn--date">${this._data}</button>
			</li>
		`
	}
}

export default new ListDates();
