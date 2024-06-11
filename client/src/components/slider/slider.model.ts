export default interface SliderModel {
  removeArrowOnDeviceType: ('desktop' | 'tablet' | 'mobile')[];
  data: {
    images: {
      main: string;
      hover?: string;
    };
    name: string;
    price: string;
    _id: string;
    size?: string;
    color?: string[];
  }[];
}
