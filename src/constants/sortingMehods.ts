interface ISortingMethod {
  value: string;
  label: string;
}

const sortingMehods: Array<ISortingMethod> = [
  { value: 'publishDate', label: 'Most recently published' },
  { value: 'popular', label: 'Most popular' },
  { value: 'recommended', label: 'Most recommended' },
];

export default sortingMehods;
