import AbstractView from './AbstractView.js';

export default class extends AbstractView {
	constructor(params) {
		super(params);
		this.setTitle('Aliments');
	}

	async getHtml() {
		async function getData(url) {
			const response = await fetch(url);
			return response.json();
		}

		const aliments = await getData('/static/js/views/aliments.json');

		let html = '';

		aliments.hints.forEach((data) => {
			html += `<div class="col border p-5">
						<img src="${data.food.image}" class="img-fluid" alt="Description de l'image">
						<a href="/product-view/${data.food.foodId}" class="">${data.food.label}</a>
					</div>`;
		});

		return (
			`
			<h1 class="mt-5">Alimentation</h1>
                <p>Découvrez tous nos aliments</p>
            <div class="container text-center">
                
                <div class="row">
                    
                        ${html}
                    
                </div>
            </div>
        `
		);
	}
}

