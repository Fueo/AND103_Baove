const createNotificationTemplate = (name, content, link) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Notification</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
                <td align="center">
                    <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                        
                        <tr>
                            <td style="background-color: #00ff55ff; padding: 20px; text-align: center; color: #ffffff;">
                                <h2 style="margin: 0; font-size: 24px;">
                                    Xin chào, 
                                    <span style="color: #ffd700; font-weight: bold;">${name}</span>
                                </h2>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding: 30px; color: #333333; font-size: 16px; line-height: 1.6;">
                                <p style="margin-top: 0;">${content}</p>
                            </td>
                        </tr>

                        <tr>
                            <td align="center" style="padding-bottom: 30px;">
                                <a href="${link}" style="background-color: #28a745; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; display: inline-block;">
                                    Xem chi tiết
                                </a>
                            </td>
                        </tr>

                        <tr>
                            <td style="background-color: #eeeeee; padding: 15px; text-align: center; color: #888888; font-size: 12px;">
                                <p style="margin: 0;">Đây là email tự động, vui lòng không trả lời email này.</p>
                                <p style="margin: 5px 0 0;">&copy; 2025 AND103 Team.</p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>

    </body>
    </html>
    `;
};

module.exports = createNotificationTemplate;