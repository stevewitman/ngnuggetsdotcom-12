import { FormGroup } from '@angular/forms';

export function isValidEmail(deliveryAddress: string) {
  const reEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  return reEmail.test(deliveryAddress.trim()) ? true : false;
}

export function isValidTwitterHandle(deliveryAddress: string) {
  const reTwitterHandle = new RegExp(/^@(\w){4,16}$/);
  const result = reTwitterHandle.test(deliveryAddress) ? true : false;
  return result;
}

export function isValidTwitterUrl(deliveryAddress: string) {
  const reTwitterUrl = new RegExp(
    /^((?:http:\/\/)?|(?:https:\/\/)?)?(?:www\.)?twitter\.com\/(\w+)$/i
  );
  const result = reTwitterUrl.test(deliveryAddress) ? true : false;
  return result;
}

export function emailOrTwitterRequired(group: FormGroup) {
  const deliveryAddress = group.get('deliveryAddress');
  const deliveryMethod = group.get('deliveryMethod');

  const result =
    (deliveryMethod?.value === 'Email' && isValidEmail(deliveryAddress?.value)) ||
    (deliveryMethod?.value === 'Twitter DM' &&
      (isValidTwitterUrl(deliveryAddress?.value) ||
        isValidTwitterHandle(deliveryAddress?.value)));
  return result ? null : { addressInvalidForDeliveryMethod: true };
}
