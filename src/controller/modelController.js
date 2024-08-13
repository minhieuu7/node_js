const Model = require("../model/Model")

const gettAll = async (req, res) => {
    try {
        const products = await Model.find();
        if(!products) return res.status(400).json({message: "no data !"});
        return res.status(200).json({
            data: products
        })
    } catch (error) {
        return error.message;
    }
}

const createNew = async (req, res) => {
    try {
        const newProduct = await Model.create(req.body);
        if(!newProduct) return res.status(400).json({message: 'thêm sản phẩm thất bại !'})
        return res.status(200).json({
            message: "thêm sản phẩm thành công !",
            data: newProduct
        })
    } catch (error) {
        return error.message;
    }
}

const getById = async (req, res) => {
    try {
        const productId = await Model.findById(req.params.id);
        if(!productId) return res.status(404).json({message:"không tìm thấy sản phẩm !"})
        return res.json({
            detail: productId
        })
    } catch (error) {
        return error.message
    }
}

const deleteById = async(req, res) => {
    try {
        const productId = Model.findByIdAndDelete(req.params.id);
        if(!productId) {
            return res.status(404).json({message: "có lỗi khi xóa !"})
        }
        return res.status(200).json({
            message: "xóa sản phẩm thành công !"
        })
    } catch (error) {
        return error.message
    }
}

const updateById = async (req, res) => {
    try {
        const productId = await Model.findById(req.params.id);

        if(!productId) return res.status(404).json({ message: "không tìm thấy sản phẩm !"})

        const updatedProduct = await Model.findByIdAndUpdate(productId, req.body, {new: true});

        return res.status(200).json({
            message: "Cập nhật sản phẩm thành công !",
            data: updatedProduct
        })
    } catch (error) {
        return error.message;
    }
}

module.exports = {gettAll, createNew, getById, deleteById, updateById}