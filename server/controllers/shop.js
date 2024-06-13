const Product = require('../models/product');

exports.getTeas = (req, res, next) => {
    Product.find({type: 'tea'})
        .then((teasProducts) => {
            res
                .status(200)
                .json({message: 'Teas fetched.', products: teasProducts});
        })
        .catch((err) => {
            if (!err.statusCode) err.statusCode = 500;
            next(err);
        });
};
exports.getExtras = (req, res, next) => {
    Product.find({type: 'extras'})
        .then((extrasProducts) => {
            res
                .status(200)
                .json({message: 'Extras fetched.', products: extrasProducts});
        })
        .catch((err) => {
            if (!err.statusCode) err.statusCode = 500;
            next(err);
        });
};
exports.getProducts = (req, res, next) => {
    Product.find()
        .then((products) => {
            res.status(200).json({message: 'Products fetched.', products})
        }).catch(err => {
        if (!err.statusCode) err.statusCode = 500;
        next(err)
    })
}