import Observer from './Observer';
import Subject from './Subject';

const sendMailNotifycation = ({ email, informationOrder }) => {
  const subject = new Subject();
  const email = new Observer(email);

  subject.subscribe(email);
  subject.notify(informationOrder);
};

export default sendMailNotifycation;
