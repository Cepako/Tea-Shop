export default interface SliderModel {
  removeArrowOnDeviceType: ('desktop' | 'tablet' | 'mobile')[];
  responsive: {
    desktop: {
      breakpoint: { max: number; min: number };
      items: number;
    };
    tablet: {
      breakpoint: { max: number; min: number };
      items: number;
    };
    mobile: {
      breakpoint: { max: number; min: number };
      items: number;
    };
  };
  data: {
    url: string;
    hoverUrl: string;
    name: string;
    price: string;
    code: string;
  }[];
}
