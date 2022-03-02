interface IReceivedCard {
  name: string;
  acceptButton: string;
  rejectButton: string;
}

const RECEIVED_CARD_STATUS: Array<IReceivedCard> = [
  { name: 'Awaiting Response', acceptButton: 'Accept', rejectButton: 'Reject' },
];

export default RECEIVED_CARD_STATUS;
