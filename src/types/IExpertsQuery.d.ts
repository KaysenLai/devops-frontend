export default interface IExpertsQuery {
  page: number;
  online: boolean;
  offline: boolean;
  sort: string;
  priceFrom: number;
  priceTo: number;
  location: string;
  keyword: string;
}
