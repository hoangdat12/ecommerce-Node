class ShippingStrategy {
  calculateShippingCost(order) {
    console.log("This method must be implemented in a subclass");
  }
}

class StandardShipping extends ShippingStrategy {
  calculateShippingCost(order) {
    const weight = order.weight;
    let shippingPrice = 0;
    if (weight <= 1) {
      shippingPrice = 25;
    } else if (weight > 1 && weight <= 5) {
      shippingPrice = 40;
    } else if (weight > 5 && weight <= 10) {
      shippingPrice = 80;
    } else if (weight > 10 && weight < 20) {
      shippingPrice = 200;
    } else {
      shippingPrice = 500;
    }
    return shippingPrice + orderKilometer(order.address);
  }
}

class ExpressShipping extends ShippingStrategy {
  calculateShippingCost(order) {
    const weight = order.weight;
    console.log(weight);
    let shippingPrice = 0;
    if (weight <= 1) {
      shippingPrice = 30;
    } else if (weight > 1 && weight <= 5) {
      shippingPrice = 50;
    } else if (weight > 5 && weight <= 10) {
      shippingPrice = 100;
    } else if (weight > 10 && weight < 20) {
      shippingPrice = 300;
    } else {
      shippingPrice = 400;
    }
    console.log(shippingPrice);
    return shippingPrice + orderKilometer(order.address);
  }
}

class FreeShipping extends ShippingStrategy {
  calculateShippingCost() {
    // return 0 for free shipping
    return 0.0;
  }
}

const orderKilometer = (place) => {
  const condition =
    place.toLowerCase() === "hue" ||
    place.toLowerCase() === "da nang" ||
    place.toLowerCase() === "ha noi" ||
    place.toLowerCase() === "hai phong" ||
    place.toLowerCase() === "ho chi minh";
  if (condition) {
    return 5;
  } else {
    return 10;
  }
};

class Shipping {
  constructor(shippingMethod) {
    this.shippingMethod = shippingMethod;
  }

  calculateShippingCost(order) {
    return this.shippingMethod.calculateShippingCost(order);
  }
}

class ShippingFactory {
  static createShipping(shippingMethod) {
    switch (shippingMethod) {
      case "standard":
        return new Shipping(new StandardShipping());
      case "express":
        return new Shipping(new ExpressShipping());
      case "free":
        return new Shipping(new FreeShipping());
      default:
        console.log("Invalid shipping method");
        break;
    }
  }
}

export default ShippingFactory;
