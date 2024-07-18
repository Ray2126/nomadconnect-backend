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
}

export default JourneyPoint;