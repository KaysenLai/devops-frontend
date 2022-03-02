export default interface ICommentInfo {
  meetingID: string,
  meetingDate: Date,
  userID: string,
  comment: string,
  rate: number,
  date: Date,
  client: {
    userID: string,
    firstName: string,
    lastName: string
  }
}
