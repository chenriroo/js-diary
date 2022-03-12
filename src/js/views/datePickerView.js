import View from "./View";


class DatePicker extends View {
	_parentElement = this.selectEl('.sidebar__date');


	HTML() {
		//console.log(this._data)

		return `
			<div class="datepicker__years">
				${this._data.map(item => {
					return `
							<input class="form__radio--year" type="radio" id=${item} name="year" value=${item}>
							<label class="form__label--year" for=${item}>${item}</label>
					`
				}).join('')}
			</div>
		
			<div class="datepicker__months">
				<input class="form__radio--month" type="radio" id="January" name="month" value="01">
				<label class="form__label--month" for="January">January</label>

				<input class="form__radio--month" type="radio" id="February" name="month" value="02">
				<label class="form__label--month" for="February">February</label>

				<input class="form__radio--month" type="radio" id="March" name="month" value="03">
				<label class="form__label--month" for="March">March</label>

				<input class="form__radio--month" type="radio" id="April" name="month" value="04">
				<label class="form__label--month" for="April">April</label>

				<input class="form__radio--month" type="radio" id="May" name="month" value="05">
				<label class="form__label--month" for="May">May</label>

				<input class="form__radio--month" type="radio" id="June" name="month" value="06">
				<label class="form__label--month" for="June">June</label>

				<input class="form__radio--month" type="radio" id="July" name="month" value="07">
				<label class="form__label--month" for="July">July</label>

				<input class="form__radio--month" type="radio" id="August" name="month" value="08">
				<label class="form__label--month" for="August">August</label>

				<input class="form__radio--month" type="radio" id="September" name="month" value="09">
				<label class="form__label--month" for="September">September</label>

				<input class="form__radio--month" type="radio" id="October" name="month" value="10">
				<label class="form__label--month" for="October">October</label>

				<input class="form__radio--month" type="radio" id="November" name="month" value="11">
				<label class="form__label--month" for="November">November</label>

				<input class="form__radio--month" type="radio" id="December" name="month" value="12">
				<label class="form__label--month" for="December">December</label>

			</div>
			`
	}

	addListener(handler) {
		const elYears = this.selectEl('.datepicker__years');

		// Just use scrollbars insted
		// elYears.addEventListener('wheel', e => {
		// 	e.preventDefault();

		// 	if(e.deltaY > 0) {
		// 		// scroll down
		// 		elYears.scrollLeft += 50;
		// 	} else {
		// 		//scroll up
		// 		elYears.scrollLeft -= 50;
		// 	}
		// })


		this._parentElement.addEventListener('click', e => {
			const el = e.target;

			// toggle display datepicker
			if(el.classList.contains('form__radio--year')) {
				const data = {
					input: el.value,
					type: 'year'
				};
				handler.yearSelection(data);
			}

			if(el.classList.contains('form__radio--month')) {
				const data = {
					input: el.value,
					type: 'month'
				};
				handler.monthSelection(data);
			}
		})
	}
}

export default new DatePicker()