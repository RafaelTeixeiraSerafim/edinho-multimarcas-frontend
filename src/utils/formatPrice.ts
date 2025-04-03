interface PriceFormatOptions {
  decimalSeparator?: string;
  thousandSeparator?: string;
  decimalPlaces?: number;
  currencySymbol?: string;
  symbolPosition?: 'before' | 'after';
}

export function formatPrice(
  price: number | string,
  options: PriceFormatOptions = {}
): string {
  const {
    decimalSeparator = ',',
    thousandSeparator = '.',
    decimalPlaces = 2,
    currencySymbol = 'R$ ',
    symbolPosition = 'before',
  } = options;

  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

  if (isNaN(numericPrice)) {
    throw new Error('Invalid price value');
  }

  const roundedPrice = Math.round(numericPrice * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);

  const [wholePart, decimalPart] = roundedPrice.toFixed(decimalPlaces).split('.');

  const formattedWhole = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);

  let formattedPrice = decimalPart
    ? `${formattedWhole}${decimalSeparator}${decimalPart}`
    : formattedWhole;

  if (currencySymbol) {
    formattedPrice =
      symbolPosition === 'before'
        ? `${currencySymbol}${formattedPrice}`
        : `${formattedPrice}${currencySymbol}`;
  }

  return formattedPrice;
}