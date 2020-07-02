const { Schema, model } = require("mongoose");

const productTypeSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        maxlength: 512
    },
}, { timestamps: true, collection: "ProductType" });

exports.productTypeModel = model("ProductType", productTypeSchema);