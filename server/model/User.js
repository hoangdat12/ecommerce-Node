import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      default: 'http://localhost:8080/assets/avatarDefault.png',
    },
    address: {
      type: Object,
      default: {},
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: 'User',
    timestamps: true,
  }
);

// userSchema.methods.getFullName = function getFullName() {
//   return `${this.firstName} ${this.lastName}`;
// };

const _User = model('User', userSchema);
export default _User;
