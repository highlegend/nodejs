import AbstractView from './AbstractView.js';

export default class extends AbstractView {
	constructor(params) {
		super(params);
		this.setTitle("Visualiser L'aliment");
	}

	async getHtml() {
		const nu = this.params.id;

		async function getData(url) {
			const response = await fetch(url);
			return response.json();
		}

		const data = await getData('/static/js/views/aliments.json');
		const aliment = data.hints.find((item) => item.food.foodId === nu).food;

		return (
			`
        <h1>` + aliment.label + `</h1> 
		<p>Catégorie : ` + aliment.categoryLabel + `</p> 
		<p><strong> Calories : ` + aliment.nutrients.ENERC_KCAL + ` KCAL</strong> </p>
		<p><strong> Fat: ` + aliment.nutrients.FAT + `</strong> </p>
		<div>
		<img src="` + aliment.image +` ">
		</div>
        <br>
        <a href='/' data-link>Retourner</a>`
		);
	}
}
