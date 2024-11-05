/**
 * Enum representing different media sizes with corresponding media query strings.
 * @enum {string}
 */
export enum MediaSizeEnum {
  /**
   * Extra extra small devices (portrait phones, less than 375.98px)
   */
  Xxs = '(max-width: 375.98px)',
  /**
   * Extra small devices (between 376px and 575.98px)
   */
  Xs = '(min-width: 376px) and (max-width: 575.98px)',
  /**
   * Downsize to extra small devices (max-width: 575.98px)
   */
  DownXs = '(max-width: 575.98px)',
  /**
   * Upsize from extra small devices (min-width: 376px)
   */
  UpXs = '(min-width: 376px)',
  /**
   * Small devices (between 576px and 767.98px)
   */
  Sm = '(min-width: 576px) and (max-width: 767.98px)',
  /**
   * Downsize to small devices (max-width: 767.98px)
   */
  DownSm = '(max-width: 767.98px)',
  /**
   * Upsize from small devices (min-width: 576px)
   */
  UpSm = '(min-width: 576px)',
  /**
   * Medium devices (between 768px and 991.98px)
   */
  Md = '(min-width: 768px) and (max-width: 991.98px)',
  /**
   * Downsize to medium devices (max-width: 991.98px)
   */
  DownMd = '(max-width: 991.98px)',
  /**
   * Upsize from medium devices (min-width: 768px)
   */
  UpMd = '(min-width: 768px)',
  /**
   * Large devices (between 992px and 1199.98px)
   */
  Lg = '(min-width: 992px) and (max-width: 1199.98px)',
  /**
   * Downsize to large devices (max-width: 1199.98px)
   */
  DownLg = '(max-width: 1199.98px)',
  /**
   * Upsize from large devices (min-width: 992px)
   */
  UpLg = '(min-width: 992px)',
  /**
   * Extra large devices (between 1200px and 1399.98px)
   */
  Xl = '(min-width: 1200px) and (max-width: 1399.98px)',
  /**
   * Downsize to extra large devices (max-width: 1399.98px)
   */
  DownXl = '(max-width: 1399.98px)',
  /**
   * Upsize from extra large devices (min-width: 1200px)
   */
  UpXl = '(min-width: 1200px)',
  /**
   * Extra extra large devices (min-width: 1400px)
   */
  Xxl = '(min-width: 1400px)',
}
