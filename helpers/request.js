exports.queryOption = (req) => {
    let condition;
    try {
        condition = (req.cond && JSON.parse(req.cond)) || {};
    } catch (err) {
        condition = {};
    }
    const sort = { [req.query.sort || "updatedAt"]: Number(req.query.order || "-1") };
    const limit = Number(req.query.limit || "20");
    const page = Number(req.query.page || "1");
    const skip = limit * (page - 1);
    return {
        condition,
        sort,
        limit,
        page,
        skip,
    };
};