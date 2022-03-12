class View {
	_data;
	_parentElement;

	// render: false > returns the markup with rendering HTML
	// popup: Render without removing previous HTML (nonexisting)

	render(data, render=true, popup=false) {
		this._data = data;
		const markup = this.HTML();
		
		if(!render) return markup
		if(!popup) this.clearHTML();
		this._parentElement.insertAdjacentHTML('afterbegin', markup);
	}

	selectEl(selector) {
		const el = document.querySelector(selector)
		return el
	}

	clearHTML() {
		this._parentElement.innerHTML = '';
	}

}

export default View