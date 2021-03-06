import React, { Component } from 'react';


import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
	salad: 0.2,
	cheese: 0.2,
	meat: 1.5,
	bacon: 0.5
}

class BurgerBuilder extends Component {

	constructor(props){
		super(props);
		this.state = {
			ingredients: null,
			totalPrice: 2.00,
			purchaseable: false,
			purchasing: false,
			loading: false,
			error: false

		}
	}

	componentDidMount(){
		axios.get("https://react-my-burger-ecb91.firebaseio.com/ingredients.json")
			.then(response =>{
				this.setState({ingredients: response.data})
			})
			.catch(error => {
				this.setState({error: true})
			})
	}

	updatePurchaseState(ingredients){
		

		const sum = Object.keys(ingredients).map(igKey => {
			return ingredients[igKey];
		}).reduce((sum, el) => {
			return sum + el;
		},0);

		this.setState({purchaseable: sum > 0});
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount +1;
		const updatedIngredients = {
			...this.state.ingredients,

		};
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;

		this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if(oldCount <= 0){
			return;
		}
		const updatedCount = oldCount -1;
				const updatedIngredients = {
			...this.state.ingredients,

		};
		updatedIngredients[type] = updatedCount;
		const priceReduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceReduction;

		this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
		this.updatePurchaseState(updatedIngredients);

	}

	purchaseHandler = () => {
		this.setState({purchasing: true});
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false})
	}

	purchaseContinueHandler = () => {
		this.setState({loading: true})
		// alert("You continue");
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: "Niezwan",
				address: {
					street: "Gombak",
					zipcode: "53100"
				},
				email: "test@gmail.com"
			},
			deliveryMethod: "fastest"
		}
		axios.post('/orders.json', order)
			.then(response => {
				// console.log("response", response);
				this.setState({loading: false, purchasing: false})

			})
			.catch(error => {
				this.setState({loading: false, purchasing: false})
				console.log("error",error);
			})
	}

	render(){
		const disableInfo = {
			...this.state.ingredients
		}


		for(let key in disableInfo){
			disableInfo[key] = disableInfo[key] <= 0
		}
		let orderSummary = null;
		let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />

		if(this.state.ingredients){
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls ordered={this.purchaseHandler} ingredientAdded={this.addIngredientHandler} ingredientRemoved={this.removeIngredientHandler} disabled = {disableInfo} price={this.state.totalPrice} purchaseable={this.state.purchaseable}/>
				</Aux>
				);

			orderSummary =  <OrderSummary ingredients={this.state.ingredients} purchaseCanceled={this.purchaseCancelHandler} purchaseContinue={this.purchaseContinueHandler} totalPrice={this.state.totalPrice}/>

		}

		if(this.state.loading){
			orderSummary = <Spinner />
		}


		
		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>

		);
	}

}

export default withErrorHandler(BurgerBuilder, axios);
