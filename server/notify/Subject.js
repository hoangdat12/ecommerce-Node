class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(informationOrder) {
    this.observers.forEach((observer) => {
      observer.send(informationOrder);
    });
  }
}

export default Subject;
