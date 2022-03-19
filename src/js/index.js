import * as model from './model';
import BottomNav from './views/bottomNavView';
import Sidebar from './views/sidebarView';
import DatePicker from './views/datePickerView';
import Settings from './views/settingsView';
import Entries from './views/entriesView';
import EntryView from './views/entryView';
import EntryEdit from './views/entryEditView';
import HomeView from './views/homeView';


const controllerDisplayHome = async () => {
	await model.getEntries('paginate');
	HomeView.render(model.state.homeEntries);
	HomeView.addListenerCreateEntry({
		createEntry: handleCreateEntry,
		deleteEntry: handleDeleteEntry,
		updateEntry: handleUpdateEntry,
	});
}


// Datepicker: Pick year & month
const handleDatepicker = async() => {
	DatePicker.render();
	DatePicker.populateYears();
	DatePicker.addListenerDateSelection(handleGetEntries);
}

// Display entries based on year & month selection
// arg reload: no new date/data (when changing entrySize in settings)
const handleGetEntries = async (input, reload=false) => {

	if(!reload) {
		model.storeDateSelection(input) // input year & month
		if(model.state.curDate.year === '' || model.state.curDate.month === '') return
		
		await model.getEntries('date', model.state.curDate)
	}

	Entries.render({
		entries: model.state.curEntries,
		entrySize: model.state.settings.entrySize
	})
}


// Display entry, take in from state: [curEntries] or [homeEntries]
const handleDisplayEntry = async (id=undefined) => {
	const hash = window.location.hash.slice(1)
	if(!hash) return

	await model.getEntry(hash);

	//console.log(model.state.curEntry)

	if(model.state.modes.editMode) {
		EntryEdit.render({
			entry: model.state.curEntry,
			edit: true 
		}, true);
		EntryEdit.addListenerToggleView(handleToggleView);
		EntryEdit.addListenerDelete(handleDeleteEntry);
		EntryEdit.addListenerUpdate(handleUpdateEntry);
		EntryEdit.transitionIn();
	} else {
		EntryView.render({
			entry: model.state.curEntry,
			edit: false
		},true);
		EntryView.addListenerToggleView(handleToggleView);
		EntryView.addListenerDelete(handleDeleteEntry);
		EntryView.transitionIn();
	}

}

// Creates new entry from the 'Home' page; refactor duplicate
const handleCreateEntry = async () => {
	await model.createEntry();
	model.toggleEditMode();
	handleDisplayEntry
	return model.state.curEntry
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

		EntryEdit.assignVariables();
		EntryEdit.transitionIn();
	} else {
		EntryView.render({
			entry: model.state.curEntry,
			edit: false
		},true);
		EntryView.addListenerToggleView(handleToggleView);
		EntryView.addListenerDelete(handleDeleteEntry);
		EntryView.assignVariables();
		//EntryView.transitionIn();
	}
}

const handleDeleteEntry = async (e, id) => {
	
	await model.deleteEntry(id);

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
		handleGetEntries(undefined, true)
	}

	if(setting.setting === 'theme') {
		console.log('themechange: change css')
	}
}


const init = () => {
	handleDatepicker();
	controllerDisplayHome()
	BottomNav.addListener({
		home: controllerDisplayHome,
		entries: controllerDisplayEntries,
		settings: controllerDisplaySettings
	});
}

init();

window.addEventListener('hashchange', handleDisplayEntry);
window.addEventListener('load', handleDisplayEntry);