import {format} from 'date-fns'

export const state = {
	curDate: {
		year: '',
		month: ''
	},
	homeEntries: [],
	curEntries: [],
	curEntry: {},
	modes: {
		editMode: false,
	},
	settings: {
		theme: 'basic-light',
		entrySize: 'small',
	}
}
// Retrieves years for display in datepicker
export const getYears = async () => {
	try {
		const res = await fetch('http://localhost:5000/years');
		const years = await res.json();
		return years
	} catch (err) {
		console.log(err)
	}
}


// TODO: refactor merging getEntries & getEntriesPaginated
export const getEntries = async (type, inputDate) => {
	try {
		let res;

		if(type === 'date') {
			const date = `${inputDate.year}-${inputDate.month}`
			res = await fetch(`http://localhost:5000/entries?date_like=${date}`);
		} else if (type === 'paginate') {
			res = await fetch('http://localhost:5000/entries?_page=1&_limit=8');
		}
		
		let fetchedEntries = await res.json();

		const arrEntries = fetchedEntries.map(entry => {
			const [date,time] = formatTime(entry.date)
			return { 
				id: entry.id,
				date: date,
				time: time,
				content: entry.content
			}
		})
		if(type === 'date') state.curEntries = arrEntries
		if(type === 'paginate') state.homeEntries = arrEntries;

	} catch (err) {
		console.log(err, 'model.getEntries()');
	}
}


// Format time for editing in form
const formatTime = (input) => {
	const objDate = new Date(input)
	const year = objDate.getFullYear();
	let month = objDate.getMonth() + 1;
	let day = objDate.getDate();
	const hour = objDate.getHours();
	const minutes = objDate.getMinutes();

	if(month < 10) month = `0${month}`;
	if(day < 10) day = `0${day}`;

	const date = `${year}-${month}-${day}`
	const time = `${hour}:${minutes}`

	return [date, time];
}

export const getEntry = (id, array) => {
	try {
		state.curEntry = state[array].find(entry => entry.id === +id);
	} catch(err) {
		console.error(err, 'model.getEntry()')
	}
}

export const toggleEditMode = (isEditMode) => {
	isEditMode ? state.modes.editMode = true : state.modes.editMode = false;
	return
}

export const createEntry = async () => {
	const curDate = new Date()
	//const curDate = format(new Date(), 'yyyy-MM-dd');
	let entry = {
		date: curDate,
		content: '',
	}
	const res = await fetch(`http://localhost:5000/entries/`, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify(entry)
	})
	entry = await res.json();

	//
	const [date, time] = formatTime(entry.date)
	const outputEntry = {
		id: entry.id,
		date: date,
		time: time,
		content: entry.content
	};

	state.curEntry = outputEntry;
	return
}


export const editEntry = async (id, data) => {
	const [date, time, content] = data;

	const newDate = new Date(`${date} ${time}`)

	const newEntry = {
		date: newDate,
		content: content,
	};
	const res = fetch(`http://localhost:5000/entries/${id}`, {
		method: 'PUT',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify(newEntry),
	})
	return
}

export const deleteEntry = async (id) => {
	const res = await fetch(`http://localhost:5000/entries/${id}`, {
		method: 'DELETE',
	})
	return
}


export const storeDateSelection = (input) => {
	if(input.type === 'year') state.curDate.year = input.input;
	if(input.type === 'month') state.curDate.month = input.input;
	return
}

export const modifySetting = input => {
	const { setting, value} = input;
	state.settings[setting] = value;
}