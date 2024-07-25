class JourneyPoint {
  constructor(props) {
    this.id = props.id;
    this.createdAt = props.createdAt || new Date();
    this.userId = props.userId;
    this.city = props.city;
    this.country = props.country;
    this.arrivalDate = props.arrivalDate;
    this.departureDate = props.departureDate;
  }

  static fromMongoDocument(doc) {
    return new JourneyPoint({
      id: doc._id,
      createdAt: new Date(doc.createdAt),
      userId: doc.userId,
      city: doc.city,
      country: doc.country,
      arrivalDate: doc.arrivalDate,
      departureDate: doc.departureDate,
    });
  }

  toMongoDocument() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      userId: this.userId,
      city: this.city,
      country: this.country,
      arrivalDate: this.arrivalDate,
      departureDate: this.departureDate,
    };
  }

  toApiResponse() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      userId: this.userId,
      city: this.city,
      country: this.country,
      arrivalDate: this.arrivalDate,
      departureDate: this.departureDate,
    };
  }

  update(props) {
    this.arrivalDate = props.arrivalDate ?? this.arrivalDate;
    this.departureDate = props.departureDate ?? this.departureDate;
  }

  toMongoUpdateDocument() {
    return {
      arrivalDate: this.arrivalDate,
      departureDate: this.departureDate,
    };
  }
}

export default JourneyPoint;