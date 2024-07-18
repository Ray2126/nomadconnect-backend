import bcrypt from 'bcrypt';

class User {
  constructor(props) {
    this.id = props.id;
    this.password = props.password;
    this.email = props.email;
    this.createdAt = props.createdAt || new Date();
    this.name = props.name;
    this.bio = props.bio;
    this.hometown = props.hometown;
    this.sex = props.sex;
    this.birthday = props.birthday;
    this.interests = props.interests;
    this.occupation = props.occupation;
    this.socialLinks = props.socialLinks;
  }

  static fromMongoDocument(doc) {
    return new User({
      id: doc._id,
      password: doc.password,
      email: doc.email,
      createdAt: new Date(doc.createdAt),
      name: doc.name,
      bio: doc.bio,
      hometown: doc.hometown,
      sex: doc.sex,
      birthday: doc.birthday,
      interests: doc.interests,
      occupation: doc.occupation,
      socialLinks: doc.socialLinks,
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

  toMongoUpdateDocument() {
    return {
      name: this.name,
      bio: this.bio,
      hometown: this.hometown,
      sex: this.sex,
      birthday: this.birthday,
      interests: this.interests,
      occupation: this.occupation,
      socialLinks: this.socialLinks,
    };
  }

  toApiResponse() {
    return {
      id: this.id,
      email: this.email,
      createdAt: this.createdAt,
      name: this.name,
      bio: this.bio,
      hometown: this.hometown,
      sex: this.sex,
      birthday: this.birthday,
      interests: this.interests,
      occupation: this.occupation,
      socialLinks: this.socialLinks,
    };
  }

  updateProfile(props) {
    this.name = props.name;
    this.bio = props.bio;
    this.hometown = props.hometown;
    this.sex = props.sex;
    this.birthday = props.birthday;
    this.interests = props.interests;
    this.occupation = props.occupation;
    this.socialLinks = props.socialLinks;
  }
}

export default User;