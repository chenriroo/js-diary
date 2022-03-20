import View from "./View";


class DatePicker extends View {
	_parentElement = this.selectEl('.sidebar__date');


	HTML() {
		//console.log(this._data)

		return `
			<div class="datepicker">

				<span class="datepicker__year">
					<label for="year">Year</label>
					<select id="year" name="year" class="datepicker-year form__select">
					</select>
				</span>

				<span class="datepicker__month">
					<label for="month">Month</label>
					<select id="month" name="month" class="datepicker-month form__select">
						<option>January</option>
						<option>February</option>
						<option>March</option>
						<option>April</option>
						<option>May</option>
						<option>June</option>
						<option>July</option>
						<option>August</option>
						<option>September</option>
						<option>October</option>
						<option>November</option>
						<option>December</option>
					</select>
				</span>
			</div>
			`
	}

	populateYears() {
		const yearPicker = document.querySelector('#year')
		const curYear = new Date().getFullYear();

		for(let i=0; i<=20; i++) {
			let elSelect = document.createElement('option')
			elSelect.value = curYear-i;
			elSelect.textContent = curYear-i;
			yearPicker.append(elSelect);
		}
	}

	addListenerDateSelection(handler) {
		const inputYear = document.querySelector('.datepicker-year');
		const inputMonth = document.querySelector('.datepicker-month');

		this._parentElement.addEventListener('click', e => {
			const el = e.target
			if(el == inputYear) handler(['year', el.value]);
			if(el == inputMonth) handler(['month', el.value]);
			return
		});



		console.log(inputYear.value, inputMonth.value)
	}

	addListener(handler) {
		const elYears = this.selectEl('.datepicker__years');

		this._parentElement.addEventListener('click', e => {
			const el = e.target;
		})
	}
}

export default new DatePicker()