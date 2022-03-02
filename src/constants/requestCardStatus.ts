interface IRequestCard {
  name: string;
  button: string;
}

const REQUEST_CARD_STATUS: Array<IRequestCard> = [
  { name: 'Not Reviewed', button: 'Write a review' },
  { name: 'Pending Payment', button: 'Pay Now' },
];

export default REQUEST_CARD_STATUS;
