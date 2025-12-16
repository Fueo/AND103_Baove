var express = require('express');
var router = express.Router();
var productModel = require("../models/product");

//api
//POST: thêm, PUT: cập nhật, DELETE: Xóa, GET: Lấy dữ liệu

//Thêm sp
router.post("/add", async function (req, res) {
    //lấy dữ liệu từ user truyền vào
    const { name, description, price, quantity, status, cateID } = req.body;

    //Tạo object để lưu dữ liệu
    const newProduct = { name, description, price, quantity, status, cateID };
    newProduct.createAt = Date.now();
    newProduct.updateAt = Date.now();

    // lưu
    await productModel.create(newProduct);
    res.status(200).json({ status: true, message: "Thành công" });
})


//Cập nhật sp
router.put("/update", async function (req, res) {
    //lấy dữ liệu từ user truyền vào
    const { id, name, description, price, quantity, status, cateID } = req.body;

    //Tìm 
    const item = await productModel.findById(id);

    if (item) {
        item.name = name ? name : item.name;
        item.description = description ? description : item.description;
        item.price = price ? price : item.price;
        item.quantity = quantity ? quantity : item.quantity;
        item.status = status ? status : item.status;
        item.cateID = cateID ? cateID : item.cateID;
        item.updateAt = Date.now();
        // lưu
        await item.save();
        res.status(200).json({ status: true, message: "Thành công" });
    }
    else {
        res.status(200).json({ status: false, message: "Không tìm thấy" });
    }
})

//Xóa sp theo params
router.delete("/delete/:id", async function (req, res) {
    const { id } = req.params;
    const item = await productModel.findById(id);
    if (item) {
        await productModel.findByIdAndDelete(id);
        res.status(200).json({ status: true, message: "Thành công" });
    }
    else {
        res.status(200).json({ status: false, message: "Không tìm thấy" });
    }
})

//Lấy dssp có giá từ 100k hoặc có sl < 10
router.get("/cau1", async function (req, res) {
    const list = await productModel.find({ $or: [{ price: { $gt: 100000 } }, { quantity: { $lt: 10 } }] });
    res.status(200).json({ status: true, message: "Thành công", data: list });
});


//Lấy dssp có sl be hơn 10
router.get("/cau2", async function (req, res) {
    const list = await productModel.find({ quantity: { $lt: 10 } });
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

//Lấy dssp có name chứa từ khóa "socola".
router.get("/cau3", async function (req, res) {
    const list = await productModel.find({
        name: { $regex: 'socola', $options: 'i' }
    });
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

//Lấy dssp sap xep theo gia tang dan
router.get("/cau4", async function (req, res) {
    const list = await productModel
        .find({})
        .sort({ price: 1 })
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

//Lấy 3 sp co gia cao nhat
router.get("/cau5", async function (req, res) {
    const list = await productModel
        .find({})
        .sort({ price: -1 })
        .limit(3);
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

//Lấy 5 sp co sl nhieu nhat
router.get("/cau6", async function (req, res) {
    const list = await productModel
        .find({})
        .sort({ quantity: -1 })
        .limit(5);
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

//Lấy danh sách sản phẩm được tạo trong ngày hôm nay (dựa vào createAt).
router.get("/cau7", async function (req, res) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const list = await Product.find({
        createdAt: { $gte: startOfDay, $lte: endOfDay }
    });
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

//Lấy dssp có giá từ 20000 -> 100k
router.get("/cau8", async function (req, res) {
    const list = await productModel.find({ price: { $gte: 20000, $lte: 100000 } });
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

//Lấy danh sách sản phẩm có tên bắt đầu bằng chữ “Bánh”.
router.get("/cau9", async function (req, res) {
    const list = await productModel.find({
        name: { $regex: '^Bánh', $options: 'i' }
    });
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

//Tìm sản phẩm theo nhiều điều kiện: giá < 100,000 và quantity > 20.
router.get("/cau10", async function (req, res) {
    const list = await productModel.find({ $and: [{ price: { $lt: 100000 } }, { quantity: { $gt: 20 } }] });
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

//Lấy danh sách sản phẩm có giá < 100,000 và status = true, đồng thời sắp xếp theo giá giảm dần
router.get("/cau11", async function (req, res) {
    const list = await productModel
        .find({ $and: [{ price: { $lt: 100000 } }, { status: { $eq: true } }] })
        .sort({ price: -1 });
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

//Lấy sản phẩm có quantity nằm trong khoảng từ 10 đến 30 và name chứa từ “bánh”.
router.get("/cau12", async function (req, res) {
    const list = await productModel
        .find({ $and: [{ quantity: { $gte: 10, $lte: 30 } }, { name: { $regex: 'Bánh', $options: 'i' } }] });
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

//Tìm sản phẩm theo nhiều điều kiện: name chứa “kem” hoặc “socola”, và giá > 200,000
router.get("/cau13", async function (req, res) {
    const list = await productModel
        .find({ $and: [{ price: { $gt: 200000 } }, { name: { $regex: 'kem|socola', $options: 'i' } }] });
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

//Lấy danh sách sản phẩm có quantity > 20, sắp xếp theo quantity giảm dần, sau đó theo price tăng dần.
router.get("/cau14", async function (req, res) {
    const list = await productModel
        .find({ quantity: { $gt: 20 } })
        .sort({ quantity: -1, price: 1 });
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

//Lấy danh sách sản phẩm theo cateID nhưng loại bỏ các sản phẩm có status = false
router.get("/cau15/:cateId", async function (req, res) {
    const cateId = req.params.cateId;
    const list = await productModel.find({
        cateID: cateId,
        status: { $ne: false }
    });
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

//Tìm sản phẩm có price thấp nhất trong toàn bộ danh sách.
router.get("/cau16", async function (req, res) {
    const minProduct = await productModel.findOne().sort({ price: 1 });
    if (!minProduct) {
        res.status(200).json({ status: false, message: "Không có sản phẩm", data: list });
    }

    const list = await productModel.find({ price: minProduct.price });
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

// Tìm 5 sản phẩm có price cao nhất nhưng quantity phải lớn hơn 10.
router.get("/cau17", async function (req, res) {
    const list = await productModel.find({ quantity: { $gt: 10 } })
        .sort({ price: -1 })
        .limit(5);
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

//Tìm tất cả sản phẩm có name bắt đầu bằng chữ “Bánh” và description chứa từ “vani”.
router.get("/cau18", async function (req, res) {
    const list = await productModel.find({
        name: { $regex: '^Bánh', $options: 'i' },
        description: { $regex: 'vani', $options: 'i' }
    })
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

//Lọc danh sách sản phẩm tạo trong vòng 7 ngày trở lại đây dựa vào createAt.
router.get("/cau19", async function (req, res) {
    const dateNow = new Date();
    const sevenDaysAgo = new Date().setDate(dateNow.getDate() - 7);
    const list = await productModel.find({
        createAt: { $gte: sevenDaysAgo }
    })
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

//Lấy danh sách sản phẩm theo cateID, và chỉ trả về các field: name, price, quantity.
router.get("/cau20/:cateId", async function (req, res) {
    const cateID = req.params.cateId;
    const list = await productModel.find({
        cateID: cateID
    }, 'name price quantity')
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

//Tìm sản phẩm có price từ 20,000 đến 200,000 và name KHÔNG chứa chữ “socola”.
router.get("/cau21/", async function (req, res) {
    const list = await productModel.find({
        price: { $gte: 20000, $lte: 200000 },
        name: { $not: { $regex: 'socola', $options: 'i' } }
    })
    res.status(200).json({ status: true, message: "Thành công", data: list });
})
module.exports = router;