// File: config/swagger.js
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Tài liệu API cho dự án của tôi',
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Local server',
            },
        ],
        // Cấu hình bảo mật JWT (nếu có dùng)
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    // Đường dẫn tới các file chứa comment API
    // Lưu ý: Đường dẫn này tính từ thư mục gốc của dự án (nơi chạy lệnh npm start)
    apis: ['./routes/*.js'],
};

const specs = swaggerJsDoc(options);

module.exports = specs;