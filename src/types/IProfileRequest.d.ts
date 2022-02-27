export interface IMyRequest {
  meetingID: string,
  expertID: string,
  userID: string,
  status: string,
  price: Number,
  date: Date,
  expert: {
    expertID: string,
    firstName: string,
    lastName: string,
    jobTitle: string,
  }
}

export interface IRecievedRequest {
  meetingID: string,
  expertID: string,
  userID: string,
  status: string,
  price: Number,
  date: Date,
  client: {
    userID: string,
    firstName: string,
    lastName: string,
  }
}
