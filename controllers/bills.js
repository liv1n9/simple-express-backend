const { queryOption } = require("../helpers/request");
const { response } = require("../helpers/response");
const { billModel } = require("../models/bills");
const { EBillStatus } = require("../configs/constants");
const { MethodNotAllowed } = require("http-errors");

exports.get = async (req, res, next) => {
  try {
    const opt = queryOption(req);
    const data = await billModel
      .find(opt.condition)
      .sort(opt.sort)
      .skip(opt.skip)
      .limit(opt.limit)
      .populate(
        "user",
        "username fullName dateOfBirth email phoneNumber address gender"
      );
    const total = await billModel.countDocuments(opt.condition);
    res.status(200).json(response(data, total));
  } catch (err) {
    return next(err);
  }
};

exports.userGet = async (req, res, next) => {
  try {
    const opt = queryOption(req);
    Object.assign(opt.condition, { userId: req.user._id });
    console.log(req.user._id);
    const data = await billModel
      .find(opt.condition)
      .sort(opt.sort)
      .skip(opt.skip)
      .limit(opt.limit);
    const total = await billModel.countDocuments(opt.condition);
    res.status(200).json(response(data, total));
  } catch (err) {
    return next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await billModel
      .findById(id)
      .populate(
        "user",
        "username fullName dateOfBirth email phoneNumber address gender"
      )
      .populate({
        path: "productsList.product",
        populate: {
          path: "productType",
          select: "-_id -updatedAt -createdAt -__v",
        },
      });
    res.status(200).json(response(data));
  } catch (err) {
    return next(err);
  }
};

exports.userCreate = async (req, res, next) => {
  try {
    const docs = req.body;
    docs.userId = req.user.id;
    const data = await billModel.create(docs);
    res.status(201).json(response(data));
  } catch (err) {
    return next(err);
  }
};

exports.userUpdateById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const conditions = { _id: id, userId: req.user.id };
    const data = await billModel.findOneAndUpdate(conditions, update, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

exports.adminCheckById = async (req, res, next) => {
  try {
    const conditions = {
      _id: req.params.id,
      status: EBillStatus.UNCHECK,
    };
    const bill = await billModel.findOne(conditions);
    if (!bill) {
      return next(MethodNotAllowed("Not found or checked!"));
    }
    bill.status = EBillStatus.CHECK;
    res.status(200).json(await bill.save());
  } catch (err) {
    return next(err);
  }
};

exports.adminUncheckById = async (req, res, next) => {
  try {
    const conditions = {
      _id: req.params.id,
      status: EBillStatus.CHECK,
    };
    const bill = await billModel.findOne(conditions);
    if (!bill) {
      return next(MethodNotAllowed("Not found or unchecked!"));
    }
    bill.status = EBillStatus.UNCHECK;
    res.status(200).json(await bill.save());
  } catch (err) {
    return next(err);
  }
};

exports.deleteById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const data = await billModel.findByIdAndDelete(id);
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};
