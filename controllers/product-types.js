const { queryOption } = require("../helpers/request");
const { response } = require("../helpers/response");
const { productTypeModel } = require("../models/product-types");

exports.get = async (req, res, next) => {
    try {
        const opt = queryOption(req);
        const data = await productTypeModel
            .find(opt.condition)
            .sort(opt.sort)
            .skip(opt.skip)
            .limit(opt.limit);
        const total = await productTypeModel.countDocuments(opt.condition);
        res.status(200).json(response(data, total));
    } catch (err) {
        return next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await productTypeModel.findById(id);
        res.status(200).json(response(data));
    } catch (err) {
        return next(err);
    }
};

exports.getByCode = async (req, res, next) => {
    try {
        const code = req.params.code;
        const data = await productTypeModel.findOne({ code });
        res.status(200).json(response(data));
    } catch (err) {
        return next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const docs = req.body;
        const data = await productTypeModel.create(docs);
        res.status(201).json(response(data));
    } catch (err) {
        return next(err);
    }
};

exports.updateById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const update = req.body;
        const data = await productTypeModel.findByIdAndUpdate(id, update, { new: true, runValidators: true });
        res.status(200).json(data);
    } catch (err) {
        return next(err);
    }
};

exports.deleteById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await productTypeModel.findByIdAndDelete(id);
        res.status(200).json(data);
    } catch (err) {
        return next(err);
    }
};