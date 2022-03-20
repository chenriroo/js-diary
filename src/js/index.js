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
	HomeView.render();
	HomeView.addListenerCreateEntry({
		createEntry: handleCreateEntry,
		deleteEntry: handleDeleteEntry,
		updateEntry: handleUpdateEntry,
	});
}

const controllerUpdateDate = (input) => {
	model.storeDateSelection(input)
	console.log(model.state.curDate);
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
const handleDisplayEntry = async (e, id=undefined) => {
	if(!id) {
		console.log('id=undefined, using hash')
		const hash = window.location.hash.slice(1)
		if(!hash) return
	
		await model.getEntry(hash);
	} 

	console.log('Retrieving entry via passed in id:', id)

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


const handleCreateEntry = async () => {
	await model.createEntry();
	model.toggleEditMode(true);
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

const handleDeleteEntry = async (id) => {
	await model.deleteEntry(id);

	controllerDisplayHome();
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
	DatePicker.render();
	DatePicker.populateYears();
	DatePicker.addListenerDateSelection(controllerUpdateDate);

	controllerDisplayHome()
	Sidebar.addListenerToggleView();
	Sidebar.addListenerDragResize();
	BottomNav.addListener({
		home: controllerDisplayHome,
		entries: controllerDisplayEntries,
		settings: controllerDisplaySettings
	});
}

init();

window.addEventListener('hashchange', handleDisplayEntry);
window.addEventListener('load', handleDisplayEntry);