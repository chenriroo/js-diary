import * as model from './model';
import BottomNav from './views/bottomNavView';
import Sidebar from './views/sidebarView';
import DatePicker from './views/datePickerView';
import Entries from './views/entriesView';
import EntryView from './views/entryView';
import EntryEdit from './views/entryEditView';
import HomeView from './views/homeView';


const controlDisplayHome = async () => {
	HomeView.render();

	// HomeView.addListenerCreateEntry({
	// 	createEntry: controlCreateEntry,
	// 	deleteEntry: controlDeleteEntry,
	// 	updateEntry: handleUpdateEntry,
	// });
}

const controlDatepicker = (input) => {
	model.storeDateSelection(input)

	if(!model.state.curDate.year) return
	if(!model.state.curDate.month) return

	controlGetEntries();
}

// Retrieving entries with same day, unfinished
const tempGetSameDay = (entries) => {
	const arrSameDay = [];

	for(let aLoop=0; aLoop<entries.length;aLoop++) {
		let entryA = entries[aLoop]
		//console.log('a-Loop',entry)

		for(let i=0; i<entries.length; i++) {
			if(i<=aLoop) continue
			let entryB = entries[i]
			console.log(entryA,entryB);
			if(entryA.day === entryB.day) {
				arrSameDay.push(entryA)
				arrSameDay.push(entryB)
			}
		}
	}

	console.log(arrSameDay)
	const foo = new Set(arrSameDay)
	console.log(foo)
}

// Filter entries with the same day
const filterSameDay = (entries) => {
	const objDays = [];	// Object with day + entries
	const arrDays = []; // Array with number of the day(s)
	for(let i=1; i<32; i++) {
		let foo={
			day: i,
			multiEntry: true, 
			entries: []
		};
		entries.filter(entry => {
			if(entry.day === i) foo.entries.push(entry)	
		})
		if(foo.entries.length>1) {
			objDays.push(foo);
			arrDays.push(foo.day)
		}
	}
	return [arrDays, objDays];
}

// Parameter reload: no new date/data
const controlGetEntries = async (input, reload=false, empty=false) => {
	
	const arr1 = [], arr2=[], arr3=[], arr4=[], arr5=[];
	let arrPlaceholders = [];
			
	await model.getEntries('date', model.state.curDate)

	const existingDays = new Set(model.state.curEntries.map(entry => entry.day))
	for(let i=1; i<32; i++) {
		if(existingDays.has(i)) continue
		arrPlaceholders.push({
			id: '',
			day: i,
			date: '',
			time: '',
			content: '',
			hasEntry: false,
		});
	};

	const arrEntries = arrPlaceholders.concat(model.state.curEntries)
	arrEntries.sort((a, b) => a.day - b.day)

	const [arrSameDays, objSameDays] = filterSameDay(model.state.curEntries);
	const arrSingleDayEntries = arrEntries.filter(entry => !arrSameDays.includes(entry.day))
	
	const arrEntriesFinal = arrSingleDayEntries.concat(objSameDays).sort((a,b) => a.day-b.day);

	arrEntriesFinal.forEach(entry => {
		if(entry.day <= 7) arr1.push(entry)
		if(entry.day > 7 && entry.day <= 14) arr2.push(entry)
		if(entry.day > 14 && entry.day <= 21) arr3.push(entry)
		if(entry.day > 21 && entry.day <= 28) arr4.push(entry)
		if(entry.day > 28) arr5.push(entry)
	});
	
	Entries.render({
		entries: [arr1,arr2,arr3,arr4,arr5]
	});
	Entries.addListeners(controlCreateEntry)
}

const handleDisplayEntry = async (e, id=undefined) => {
	if(!id) {
		//console.log('id=undefined, using hash')
		const hash = window.location.hash.slice(1)
		if(!hash) return
	
		await model.getEntry(hash);
	} else {
		console.log('Retrieving entry via passed in id:', id)
	}

	if(model.state.modes.editMode) {
		EntryEdit.render({
			entry: model.state.curEntry,
			edit: true 
		}, true);
		EntryEdit.addListenerToggleView(handleToggleView);
		EntryEdit.addListenerDelete(controlDeleteEntry);
		EntryEdit.addListenerUpdate(handleUpdateEntry);
		EntryEdit.transitionIn(1);
	} else {
		EntryView.render({
			entry: model.state.curEntry,
			edit: false
		},true);
		EntryView.addListenerToggleView(handleToggleView);
		EntryView.addListenerDelete(controlDeleteEntry);
		EntryView.transitionIn(1);
	}

}
// setDate: Create entry on specific day via the datepicker using the 'day' argument
const controlCreateEntry = async (setDate=false, day) => {
	await model.createEntry(setDate, day);

	controlGetEntries()
	model.toggleEditMode(true);
	handleDisplayEntry(undefined, model.state.curEntry.id);
}

const handleToggleView = (isEditMode) => {
	model.toggleEditMode(isEditMode);

	if(model.state.modes.editMode) {
		EntryEdit.render({
			entry: model.state.curEntry,
			edit: true 
		}, true);
		EntryEdit.addListenerToggleView(handleToggleView);
		EntryEdit.addListenerDelete(controlDeleteEntry);
		EntryEdit.addListenerUpdate(handleUpdateEntry);
		EntryEdit.transitionIn(1);
	} else {
		EntryView.render({
			entry: model.state.curEntry,
			edit: false
		},true);
		EntryView.addListenerToggleView(handleToggleView);
		EntryView.addListenerDelete(controlDeleteEntry);
		EntryView.transitionIn(1);
	}
}

const controlDeleteEntry = async (id) => {
	await model.deleteEntry(id);
	EntryView.transitionOut(1); //EntryEdit same function, not important for now
	controlGetEntries()
	setTimeout(() => {
		controlDisplayHome();
	},500);
}

const handleUpdateEntry = async (id, data) => {
	console.log('handleUpdateEntry', [id, data])
	await model.editEntry(id, data);


	// Update state

	// handleDisplayEntry(id);
}

const init = () => {
	const {month:curMonth, year:curYear} = model.createFormatTime()
	controlDatepicker(['year',curYear]);
	controlDatepicker(['month',curMonth]);
	DatePicker.render();
	DatePicker.populateYears();
	DatePicker.initSelection(model.state.curDate)
	DatePicker.addListenerDateSelection(controlDatepicker);

	controlDisplayHome()
	Sidebar.addListenerToggleView();
	BottomNav.addListeners({
		home: controlDisplayHome,
	});
}

init();

window.addEventListener('hashchange', (e) => {
	const hash = window.location.hash.slice(1);
	handleDisplayEntry()
});
window.addEventListener('load', handleDisplayEntry);