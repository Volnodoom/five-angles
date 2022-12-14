const MOBILE_WIDTH = 300;
const STYLE = 'style';
const AUTO_HIGHT = 'height: auto;';

const textAreas = $('.form__input--textarea');
const addressField = $(textAreas.get(0));

let isAddressFieldValid = addressField.val().trim().length > 0;

const setTextAreaHight = (element) => {
  element.style.height = 0;
  element.style.height = (element.scrollHeight) + 'px';
}

const initiateStartHeight = (index, element) => {
  if(!isAddressFieldValid) {
    $(element).height(18);
    return;
  }

  setTextAreaHight(element)
}

const handleTextAreaInput = (evt) => {
  setTextAreaHight(evt.target);
  isAddressFieldValid = evt.target.value.trim().length > 0;

  if(!isAddressFieldValid) {
    evt.target.setAttribute(STYLE, AUTO_HIGHT);
  }
}

const handleTextAreaFocus = (evt) => {
  const isMobileAddress = $(textAreas.get(0)).width() < MOBILE_WIDTH;

  if(!isAddressFieldValid && evt.target === textAreas.get(0)) {
    evt.target.setAttribute(STYLE, AUTO_HIGHT);

    if(isMobileAddress) {
      return;
    }
  }

  setTextAreaHight(evt.target);
}

const handleTextAreaBlur = (evt) => {
  if(!isAddressFieldValid) {
    addressField.height(19); console.log('blur')
  }

  evt.target.value = evt.target.value.trim();
  setTextAreaHight(evt.target);
}

textAreas.each(initiateStartHeight).on('input', handleTextAreaInput);
textAreas.on('focus', handleTextAreaFocus);
textAreas.on('blur', handleTextAreaBlur);
