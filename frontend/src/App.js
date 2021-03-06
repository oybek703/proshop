import React from 'react';
import './index.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import './bootstrap.min.css'
import {Container} from "react-bootstrap";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import {Provider} from "react-redux";
import store from "./redux/store";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Header/>
                <Container>
                    <main>
                        <Route path='/login'  component={LoginScreen} />
                        <Route path='/shipping'  component={ShippingScreen} />
                        <Route path='/payment'  component={PaymentScreen} />
                        <Route path='/placeorder'  component={PlaceOrderScreen} />
                        <Route path='/register'  component={RegisterScreen} />
                        <Route path='/userslist'  component={UserListScreen} />
                        <Route path='/productslist' exact  component={ProductListScreen} />
                        <Route path='/productslist/:pageNumber' exact component={ProductListScreen} />
                        <Route path='/orderslist'  component={OrderListScreen} />
                        <Route path='/products/:id/edit'  component={ProductEditScreen} />
                        <Route path='/profile'  component={ProfileScreen} />
                        <Route path='/users/:id/edit'  component={UserEditScreen} />
                        <Route path='/order/:id'  component={OrderScreen} />
                        <Route path='/product/:id'  component={ProductScreen} />
                        <Route path='/cart/:id?'  component={CartScreen} />
                        <Route path='/search/:keyword' component={HomeScreen} exact />
                        <Route path='/page/:pageNumber' component={HomeScreen} />
                        <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} />
                        <Route path='/' exact component={HomeScreen} />
                    </main>
                </Container>
                <Footer/>
            </Router>
        </Provider>
    );
};

export default App;