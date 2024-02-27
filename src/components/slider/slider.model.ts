export default interface SliderModel {
  removeArrowOnDeviceType: ('desktop' | 'tablet' | 'mobile')[];
  data: {
    product_img: string;
    hover_img: string;
    name: string;
    price: string;
    code: string;
    size: string;
  }[];
}
