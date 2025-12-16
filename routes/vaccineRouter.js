var express = require('express');
var router = express.Router();
var vaccineModel = require("../models/vaccine");

// GET: Lấy ds 3 loai vaccine co gia thap nhat sap xep tang dan
router.get("/list", async function (req, res) {
    const list = await vaccineModel
        .find({})
        .sort({ price: 1 })
        .limit(3);
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

// DELETE: Xóa vaccine
router.delete("/delete", async function (req, res) {
    try {
        const { id } = req.body;

        // Kiểm tra xem có tồn tại không trước khi xóa
        const item = await vaccineModel.findById(id);

        if (item) {
            await vaccineModel.findByIdAndDelete(id);
            res.status(200).json({ status: true, message: "Thành công" });
        } else {
            res.status(200).json({ status: false, message: "Không tìm thấy vaccine để xóa" });
        }
    } catch (e) {
        // Lỗi thường gặp: ID sai định dạng
        res.status(500).json({ status: false, message: e.message });
    }
});

module.exports = router;