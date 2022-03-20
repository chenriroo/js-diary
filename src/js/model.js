import {format} from 'date-fns'
import { AJAX } from './helpers';

export const state = {
	curDate: {
		year: '',
		month: ''
	},
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


// TODO: refactor merging getEntries & getEntriesPaginated
export const getEntries = async (type, inputDate) => {
	try {
		let fetchedEntries;

		if(type === 'date') {
			const date = `${inputDate.year}-${inputDate.month}`
			fetchedEntries = await AJAX(`http://localhost:5000/entries?date_like=${date}`);
		} else if (type === 'paginate') {
			fetchedEntries = await AJAX('http://localhost:5000/entries?_page=1&_limit=8');
		}
		
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


const formatTime = (input) => {
	const objDate = new Date(input)
	const year = objDate.getFullYear();
	let month = objDate.getMonth() + 1;
	let day = objDate.getDate();
	const hour = objDate.getHours();
	const minutes = objDate.getMinutes();



	if(month < 10) month = `0${month}`;
	if(day < 10) day = `0${day}`;

	// Same for the time: 1:00 should be 01:10  - double digits
	
	const date = `${year}-${month}-${day}`
	const time = `${hour}:${minutes}`

	return [date, time];
}

const createEntryObject = (data) => {
		const [date, time] = formatTime(data.date)

		const objEntry = {
			id: data.id,
			date: date,
			time: time,
			content: data.content
		}

	return objEntry
}

export const getEntry = async (id) => {
	try {
		const entry = await AJAX(`http://localhost:5000/entries/${id}`);
		
		state.curEntry = createEntryObject(entry)
		return

	} catch(err) {
		console.error(err, 'model.getEntry()')
	}
}

export const toggleEditMode = (isEditMode) => {
	isEditMode ? state.modes.editMode = true : state.modes.editMode = false;
}

export const createEntry = async () => {
	try {
		let objNewEntry = {
			date: new Date(),
			content: '',
		}
	
		let foo = await AJAX(`http://localhost:5000/entries/`, objNewEntry)
	
		const [date, time] = formatTime(foo.date)
	
		const outputEntry = {
			id: foo.id,
			date: date,
			time: time,
			content: foo.content
		};
		state.curEntry = outputEntry;

	} catch(err) {
		console.log(err)
	}
}



const updateStateCurEntry = (arrData) => {
	const newCurEntry = {
		id: arrData[0],
		date: arrData[1],
		time: arrData[2],
		content: arrData[3]
	};
	state.curEntry = newCurEntry;
}


export const editEntry = async (id, data) => {
	try {
		const [date, time, content] = data;

		updateStateCurEntry([id, date, time, content]);
	
		const newDate = new Date(`${date} ${time}`);
	
		const newEntry = {
			date: newDate,
			content: content,
		};
	
		const res = await fetch(`http://localhost:5000/entries/${id}`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(newEntry),
		});

	} catch(err) {
		console.error(err)
		// Render error
	}

}

export const deleteEntry = async (id) => {
	await fetch(`http://localhost:5000/entries/${id}`, {
		method: 'DELETE',
	});
}


export const storeDateSelection = (input) => {
	if(input[0] === 'year') state.curDate.year = input[1];
	if(input[0] === 'month') state.curDate.month = input[1];
	return
}

export const modifySetting = input => {
	const { setting, value} = input;
	state.settings[setting] = value;
}