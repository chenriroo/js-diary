const timeout = function(timeSeconds) {
	return new Promise(function(_, reject) {
		setTimeout(() => {
			reject(new Error(`Request timed out.`))
		}, timeSeconds * 1000);
	})
}

export const AJAX = async function (url, inputData=undefined)  {
	try {
		let fetchPro
		if(inputData) {
			fetchPro = fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(inputData)
			});
		} else {
			fetchPro = fetch(url)
		}
		
		const res = await Promise.race([fetchPro, timeout(10)])
		const data = await res.json();

		if(!res.ok) throw new Error(`${data.message} ${res.status}`)

		return data
	} catch (err) {
		throw err;
	}

}