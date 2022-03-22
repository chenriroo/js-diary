import * as model from './model';
import BottomNav from './views/bottomNavView';
import Sidebar from './views/sidebarView';
import DatePicker from './views/datePickerView';
import Settings from './views/settingsView';
import Entries from './views/entriesView';
import EntryView from './views/entryView';
import EntryEdit from './views/entryEditView';
import HomeView from './views/homeView';


const controlDisplayHome = async () => {
	HomeView.render();
	HomeView.addListenerCreateEntry({
		createEntry: handleCreateEntry,
		deleteEntry: handleDeleteEntry,
		updateEntry: handleUpdateEntry,
	});
}

const controlDatepicker = (input) => {
	model.storeDateSelection(input)
	
	if(!model.state.curDate.year) return
	if(!model.state.curDate.month) return

	controlGetEntries();
}


// Display entries based on year & month selection
// arg reload: no new date/data (when changing entrySize in settings)
const controlGetEntries = async (input, reload=false, empty=false) => {
	await model.getEntries('date', model.state.curDate)

	const arr1 = [];
	const arr2 = [];
	const arr3 = [];
	const arr4 = [];
	const arr5 = [];

	const existingDays = new Set(model.state.curEntries.map(entry => entry.day))
	let arrPlaceholders = []

	for(let i=1; i<32; i++) {
		if(existingDays.has(i)) continue
		arrPlaceholders.push({
			id: 'create-new',
			day: i,
			date: '',
			time: '',
			content: ''
		});
	};

	arrPlaceholders = arrPlaceholders.concat(model.state.curEntries)
	arrPlaceholders.sort((a, b) => a.day - b.day)
	
	arrPlaceholders.forEach(entry => {
		if(entry.day <= 7) arr1.push(entry)
		if(entry.day > 7 && entry.day <= 14) arr2.push(entry)
		if(entry.day > 14 && entry.day <= 21) arr3.push(entry)
		if(entry.day > 21 && entry.day <= 28) arr4.push(entry)
		if(entry.day > 28) arr5.push(entry)
	})

	Entries.render({
		entries: [arr1,arr2,arr3,arr4,arr5]
	})

	Entries.addlistenerCreateEntry(handleCreateEntry)
}

const handleDisplayEntry = async (e, id=undefined) => {
	if(!id) {
		console.log('id=undefined, using hash')
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
		EntryEdit.addListenerDelete(handleDeleteEntry);
		EntryEdit.addListenerUpdate(handleUpdateEntry);
		EntryEdit.transitionIn(1);
	} else {
		EntryView.render({
			entry: model.state.curEntry,
			edit: false
		},true);
		EntryView.addListenerToggleView(handleToggleView);
		EntryView.addListenerDelete(handleDeleteEntry);
		EntryView.transitionIn(1);
	}

}

const handleCreateEntry = async () => {
	await model.createEntry();
	model.toggleEditMode(true);
	handleDisplayEntry(undefined, model.state.curEntry.id);
	return
}

// Entry functions
//-----------------------------------------------
const handleToggleView = (isEditMode) => {
	model.toggleEditMode(isEditMode);

	if(model.state.modes.editMode) {
		EntryEdit.render({
			entry: model.state.curEntry,
			edit: true 
		}, true);
		EntryEdit.addListenerToggleView(handleToggleView);
		EntryEdit.addListenerDelete(handleDeleteEntry);
		EntryEdit.addListenerUpdate(handleUpdateEntry);
		EntryEdit.transitionIn(1);
	} else {
		EntryView.render({
			entry: model.state.curEntry,
			edit: false
		},true);
		EntryView.addListenerToggleView(handleToggleView);
		EntryView.addListenerDelete(handleDeleteEntry);
		EntryView.transitionIn(1);
	}
}

const handleDeleteEntry = async (id) => {
	await model.deleteEntry(id);

	controlDisplayHome();
}

const handleUpdateEntry = async (id, data) => {
	console.log('handleUpdateEntry', [id, data])
	await model.editEntry(id, data);


	// Update state

	// handleDisplayEntry(id);
}


// Sidebar
//-----------
const controllerDisplayEntries = () => {
	Sidebar.toggleVisible();
}


// Settings
//-----------
const controllerDisplaySettings = (exists) => {
	if(exists) {
		Settings.transitionOut();
		setTimeout(() => {
			Settings.remove();
		}, 150);
	} else {
		Settings.render(model.state.settings, true, true);
		Settings.assignVariables();
		Settings.transitionIn();
		Settings.addListener({
			close: controllerDisplaySettings,
			setting: controllerModifySetting
		});

	}
}

const controllerModifySetting = (setting) => {
	model.modifySetting(setting);
	if(setting.setting === 'entrySize') {
		controlGetEntries(undefined, true)
	}

	if(setting.setting === 'theme') {
		console.log('themechange: change css')
	}
}


const init = () => {
	DatePicker.render();
	DatePicker.populateYears();
	DatePicker.addListenerDateSelection(controlDatepicker);

	controlDisplayHome()
	Sidebar.addListenerToggleView();
	BottomNav.addListener({
		home: controlDisplayHome,
		entries: controllerDisplayEntries,
		settings: controllerDisplaySettings
	});
}

init();

window.addEventListener('hashchange', (e) => {
	const hash = window.location.hash.slice(1);
	if(hash==='create-new') console.log('create new entry')
	handleDisplayEntry()
});
window.addEventListener('load', handleDisplayEntry);