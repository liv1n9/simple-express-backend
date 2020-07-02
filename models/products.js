const { Schema, model } = require("mongoose");
const { EGender } = require("../configs/constants");

const productSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    productTypeCode: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: Object.values(EGender),
    },
    price: {
        type: Number,
        require: true,
        default: 0,
    },
    description: {
        type: String,
        maxlength: 512,
    },
    imageURL: {
        type: String,
    },
    quantity: {
        type: Number,
        default: 0,
    },
}, { timestamps: true, collection: "Product", toJSON: { virtuals: true } });

productSchema.virtual("productType", {
    ref: "ProductType",
    localField: "productTypeCode",
    foreignField: "code",
    justOne: true,
});

exports.productModel = model("Product", productSchema);