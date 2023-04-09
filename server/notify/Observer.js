import sendEmail from '../helper/sendMail';

// InformationOrder {
//     orderNumber: 1,
//     date: 11/1/2111,
//     products: [
//         {
//             name: product,
//             quantity: 1,
//             price: 1
//         }
//     ]
// }

class Observer {
  constructor(name) {
    this.name = name;
  }

  send(informationOrder) {
    const contentSend = `
    Subject: Your Order is Confirmed!

    Dear ${this.name},

    We are writing to confirm that your order has been successfully processed. Thank you for choosing our website for your purchase.

    Your order details are as follows:

    Order number: ${informationOrder.orderNumber}
    Date of purchase: ${informationOrder.date}

    The following table shows the products you ordered:

    <table border="1" cellpadding="5" cellspacing="0">
    ${informationOrder.products.map((product) => {
      return `
            <tr>
                <th>${product.name}</th>
                <th>${product.quantity}</th>
                <th>${product.price}</th>
            </tr>`;
    })}
    [Insert rows with product details here]
    <tr>
        <td colspan="2">Total</td>
        <td>$[Order Total]</td>
    </tr>
    </table>
    We will send you a shipping confirmation email with tracking information as soon as your order has been shipped. If you have any questions about your order, please don't hesitate to reach out to us.

    Thank you again for your business. We appreciate your support and look forward to serving you in the future.

    Best regards,
    `;
    sendEmail({ email: this.name, contentSend });
  }
}

export default Observer;
