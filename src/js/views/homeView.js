import View from './View';

class HomeView extends View {
	_parentElement = document.querySelector('.main');

	HTML() {
		return `
		`
	}
}

export default new HomeView()