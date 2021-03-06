const {Router} = require('express');
const Product = require('../models/product');
const asyncHandler = require('../middleware/asyncMiddleware');
const {protect, admin} = require('../middleware/authMiddleware');
const router = Router();

//get top rated products
router.get('/top', asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({rating: -1}).limit(3);
    res.send(products);
}));

//get all products
router.get('/', asyncHandler(async (req, res) => {
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;
    const {keyword} = req.query;
    const search = keyword ? {name: {$regex: keyword, $options: 'i'}} : {};
    const count = await Product.countDocuments({});
    const products = await Product.find({...search}).limit(pageSize).skip(pageSize * (page - 1));
    res.status(200).send({products, page, pages: Math.ceil(count / pageSize)});
}));

// get single product
router.get('/:id', asyncHandler(async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id).populate('user', 'name email');
    if(!product) {
        return res.status(404).send({msg: 'Product not  found.'});
    }
    res.status(200).send(product);
}));

//delete product by ID
router.delete('/:id', [protect, admin], asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        await product.remove();
        res.status(200).send({msg: 'Product removed.'});
    } else {
        res.status(404);
        throw new Error('Product not found.');
    }
}));

//create new sample product
router.post('/', [protect, admin], asyncHandler(async (req, res) => {
    const product = new Product({
        user: req.user._id,
        name: 'Sample name',
        image: '/images/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample category',
        description: 'Sample description'
    });
    const createdProduct = await product.save();
    res.status(201).send(createdProduct);
}));

//update product  by ID
router.put('/:id', [protect, admin], asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
     if(product) {
         const {name, image, brand, category, countInStock, description, price} = req.body;
         product.name = name;
         product.image = image;
         product.brand = brand;
         product.category = category;
         product.countInStock = countInStock;
         product.description = description;
         product.price = price;
         req.body.user = req.user._id;
         const updatedProduct = await product.save();
         res.send(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found.');
    }
}));

//add review for product
router.post('/:id/reviews', protect, asyncHandler(async (req, res) => {
    const {rating, comment} = req.body;
    const product = await Product.findById(req.params.id);
    if(!product) {
        res.status(404);
        throw new Error('Product not found.');
    } else {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
        if(alreadyReviewed) {
            res.status(400);
            throw new Error('Product is already reviewed.');
        } else {
            product.reviews.push({name: req.user.name, rating: Number(rating), comment, user: req.user._id});
            product.numReviews = product.reviews.length;
            product.rating = product.reviews.reduce((acc, review) => acc+=review.rating, 0) / product.reviews.length;
            await product.save();
            res.status(201).send({msg: 'Product reviewed.'});
        }
    }
}));

module.exports = router;