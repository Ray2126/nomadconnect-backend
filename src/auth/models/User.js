import bcrypt from 'bcrypt';

class User {
  constructor(props) {
    this._id = props.id;
    this.password = props.password;
    this.email = props.email;
    this.createdAt = props.createdAt || new Date();
  }

  async toMongoDocument() {
    const encryptedPassword = await bcrypt.hash(this.password, 12);
    return {
      password: encryptedPassword,
      email: this.email,
      createdAt: this.createdAt,
    };
  }

  toApiResponse() {
    return {
      id: this._id,
      email: this.email,
      createdAt: this.createdAt,
    };
  }
}

export default User;