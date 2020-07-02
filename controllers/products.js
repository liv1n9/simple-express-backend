const { queryOption } = require("../helpers/request");
const { response } = require("../helpers/response");
const { productModel } = require("../models/products");

exports.get = async (req, res, next) => {
    try {
        const opt = queryOption(req);
        const data = await productModel
            .find(opt.condition)
            .sort(opt.sort)
            .skip(opt.skip)
            .limit(opt.limit);
        const total = await productModel.countDocuments(opt.condition);
        res.status(200).json(response(data, total));
    } catch (err) {
        return next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await productModel.findById(id).populate("productType", "-_id -updatedAt -createdAt -__v");
        res.status(200).json(response(data));
    } catch (err) {
        return next(err);
    }
};

exports.getByCode = async (req, res, next) => {
    try {
        const code = req.params.code;
        const data = await productModel.findOne({ code }).populate("productType", "-_id -updatedAt -createdAt -__v");
        res.status(200).json(response(data));
    } catch (err) {
        return next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const docs = req.body;
        const data = await productModel.create(docs);
        res.status(201).json(response(data));
    } catch (err) {
        return next(err);
    }
};

exports.updateById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const update = req.body;
        const data = await productModel.findByIdAndUpdate(id, update, { new: true, runValidators: true });
        res.status(200).json(data);
    } catch (err) {
        return next(err);
    }
};

exports.deleteById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const update = req.body;
        const data = await productModel.findByIdAndUpdate(id, update, { new: true, runValidators: true });
        res.status(200).json(data);
    } catch (err) {
        return next(err);
    }
};