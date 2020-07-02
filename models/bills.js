const { Schema, model, Types } = require("mongoose");
const { EBillStatus } = require("../configs/constants");

const billSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: "User"
    },
    productsList: [{
        code: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            default: 0,
        }
    }],
    status: {
        type: String,
        enum: Object.values(EBillStatus),
        default: EBillStatus.UNCHECK
    }
}, { timestamps: true, collection: "Bill", toJSON: { virtuals: true } });

billSchema.virtual("user", {
    ref: "User",
    localField: "userId",
    foreignField: "_id",
    justOne: true,
});


billSchema.virtual("productsList.product", {
    ref: "Product",
    localField: "productsList.code",
    foreignField: "code",
    justOne: true,
});

exports.billModel = model("Bill", billSchema);