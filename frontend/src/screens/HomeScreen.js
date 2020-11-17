import React, {useEffect} from 'react';
import Product from "../components/Product";
import {Col, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts} from "../redux/actions/product";
import Loader from "../components/Loader";
import Message from "../components/Message";
const HomeScreen = () => {
    const dispatch = useDispatch();
    const {products, error, loading} = useSelector(state => state.productlist);
    useEffect(() => {
        dispatch(getAllProducts());
    }, [])
    return (
        <>
        {
            loading && !error
                ? <Loader/>
                : error
                ? <Message variant={'danger'} text={'Oops, something went wrong!'}>
                    Make sure you are connected to network and try again...
                </Message>
                : <>
                <h2 className='text-uppercase my-1'>Latest Products</h2>
                <Row>
                    {
                        !products.length ? <p className='lead text-muted ml-2 font-italic'>No any products in shop.</p> :
                        products.map(product => (
                                <Col sm={6} md={4} lg={4} key={product._id}>
                                    <Product key={product._id} product={product}/>
                                </Col>
                            )
                        )
                    }
                </Row>
            </>
        }
        </>
    )
};

export default HomeScreen;