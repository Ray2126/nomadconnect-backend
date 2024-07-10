import bcrypt from 'bcrypt';

class User {
  constructor(props) {
    this.id = props.id;
    this.password = props.password;
    this.email = props.email;
    this.createdAt = props.createdAt || new Date();
  }

  static fromMongoDocument(doc) {
    return new User({
      id: doc._id,
      password: doc.password,
      email: doc.email,
      createdAt: new Date(doc.createdAt),
    });
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
      id: this.id,
      email: this.email,
      createdAt: this.createdAt,
    };
  }
}

export default User;