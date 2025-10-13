/**
 * Styled confirmation email template for contact form submissions
 * Uses brand colors and includes professional signature
 */

interface ConfirmationEmailData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  companyEmail: string;
  logoUrl: string;
}

export function generateConfirmationEmail(data: ConfirmationEmailData): string {
  const { name, email, phone, message, companyEmail, logoUrl } = data;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for contacting Taupiri Sound</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <!-- Main Container -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">

              <!-- Header with Logo and Brand Secondary Color -->
              <tr>
                <td style="background: #430c08; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
                  <img
                    src="${logoUrl}"
                    alt="Taupiri Sound"
                    width="200"
                    height="auto"
                    style="display: block; margin: 0 auto; max-width: 180px;"
                  />
                </td>
              </tr>

              <!-- Main Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                    Hi <strong>${name}</strong>,
                  </p>
                  <p style="margin: 0 0 30px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                    We have successfully received your message and will aim to get back to you as soon as possible.
                  </p>

                  <!-- Message Details Box -->
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fffbe8; border-left: 4px solid #900000; border-radius: 4px; margin-bottom: 30px;">
                    <tr>
                      <td style="padding: 20px;">
                        <h2 style="margin: 0 0 15px 0; color: #900000; font-size: 18px; font-weight: 600;">
                          Your Message Details
                        </h2>
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td style="padding: 8px 0; color: #71221d; font-size: 14px;">
                              <strong style="color: #430c08;">Name:</strong> ${name}
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #71221d; font-size: 14px;">
                              <strong style="color: #430c08;">Email:</strong> ${email}
                            </td>
                          </tr>
                          ${
                            phone
                              ? `
                          <tr>
                            <td style="padding: 8px 0; color: #71221d; font-size: 14px;">
                              <strong style="color: #430c08;">Phone:</strong> ${phone}
                            </td>
                          </tr>
                          `
                              : ''
                          }
                          <tr>
                            <td style="padding: 8px 0; color: #71221d; font-size: 14px;">
                              <strong style="color: #430c08;">Message:</strong>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0 0 0; color: #71221d; font-size: 14px; line-height: 1.6;">
                              ${message.replace(/\n/g, '<br>')}
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.6;">
                    If you have any urgent questions, feel free to reach out to us directly.
                  </p>
                </td>
              </tr>

              <!-- Signature Section -->
              <tr>
                <td style="background: #0a0000; padding: 30px; border-radius: 0 0 8px 8px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td align="center">
                        <!-- Company Name -->
                        <h3 style="margin: 0 0 15px 0; color: #fffbe8; font-size: 20px; font-weight: 600; text-align: center;">
                          Taupiri Sound
                        </h3>

                        <!-- Contact Info -->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td align="center" style="padding: 5px 0;">
                              <a href="mailto:${companyEmail}" style="color: #b8956a; text-decoration: none; font-size: 14px;">
                                ${companyEmail}
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td align="center" style="padding: 5px 0;">
                              <a href="tel:+6478254894" style="color: #b8956a; text-decoration: none; font-size: 14px;">
                                +64 7 825 4894
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td align="center" style="padding: 5px 0; color: #b8956a; font-size: 14px;">
                              Taupiri, Waikato, New Zealand
                            </td>
                          </tr>
                        </table>

                        <!-- Divider -->
                        <div style="border-top: 1px solid #430c08; margin: 20px 0;"></div>

                        <!-- Footer Text -->
                        <p style="margin: 0; color: #b8956a; font-size: 12px; text-align: center; line-height: 1.5;">
                          This is an automated confirmation email from Taupiri Sound.<br>
                          Please do not reply directly to this email.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
