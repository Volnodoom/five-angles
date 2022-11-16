const COUNTRY_CODE = '+7-';
const ONE = 1;
const ELEVEN = 11;
const THREE = 3;
const FOUR = 4;
const SIX = 6;
const EIGHT = 8;
const NINE = 9;
const TWELVE = 12;
const PHONE_DIGITS_NUMBER = 10;
const COVER_TYPE = 'cover-type';
const FormDataKeys = {
  address: 'address',
  name: 'name',
  phone: 'phone',
  email: 'email',
  cover: COVER_TYPE,
  comment: 'comments',
};
const COVER_VALUES = [
  'Без упаковки',
  'Стандартная',
  'Подарочная',
];

const form = $('.form');
const phoneField = $('#user-phone');
const coverField = $('.basket__choice');

const getPhoneWithoutCountryCode = (value) => value.replace(/\D/g,'').substring(ONE, ELEVEN);

const formatPhone = (input) => {
  let value = getPhoneWithoutCountryCode(input);
  const size = value.length;

  if(size === 0) { return ''}
  if (size > 0) {value='('+value}
  if (size > THREE) {value=value.slice(0, FOUR)+')-' +value.slice(FOUR)}
  if (size > SIX) {value=value.slice(0, NINE)+'-' +value.slice(NINE)}
  if (size > EIGHT) {value=value.slice(0, TWELVE)+'-' +value.slice(TWELVE)}

  return COUNTRY_CODE.concat(value);
}

const handlePhoneInput = (evt) => {
  const value = evt.target.value;
  const correction = formatPhone(value);
  evt.target.value = correction;

  const isFullPhone = getPhoneWithoutCountryCode(correction).length === PHONE_DIGITS_NUMBER;
  const inputElement = evt.target;

  if(!isFullPhone) {
    inputElement.setCustomValidity('Введен не полный мобильный номер.')
  } else {
    inputElement.setCustomValidity('');
  }

  inputElement.reportValidity();
}

const handleFormSubmit = (evt) => {
  evt.preventDefault();

  const coverTypeValue = coverField.get(0).textContent;
  const hasMadeSelection = COVER_VALUES.some((line) => line === coverTypeValue);

  if(hasMadeSelection) {
    const results = new FormData(evt.target);
    results.append(COVER_TYPE, coverTypeValue);
    console.log(
      {
        formData: results,
        details: {
          address: results.get(FormDataKeys.address),
          name: results.get(FormDataKeys.name),
          phone: results.get(FormDataKeys.phone),
          email: results.get(FormDataKeys.email),
          cover: results.get(FormDataKeys.cover),
          comment: results.get(FormDataKeys.comment),
        },
      }
    )
  }
}

phoneField.on('blur', handlePhoneInput);
form.on('submit', handleFormSubmit);
