const selector = $('.form__line-wrapper--select');
const spanSelector = $('.basket__select');
const spanChoice = $('.basket__choice');
const isSelectorFieldValid = spanChoice.hasClass('basket__choice--active');

if(!isSelectorFieldValid) {
  spanSelector.addClass('basket__select--invalid');
}

const handleSelectionClick = (evt) => {
  const clickedElement = evt.target;
  const clickedJqueryElement = $(evt.target);
  const value = clickedElement.textContent;
  let selectorState = [];

  const isToggle = clickedElement === selector || spanSelector || spanChoice;
  const itemToChoose = $('.select-item');
  const activeChoice =  $('.select-item--active');

  itemToChoose
  .each((index, element) =>
  selectorState
  .push({
    index,
    isActive: element === clickedElement
  })
  );

  const isChange = selectorState.some((line) => line.isActive === true);
  const hasActiveSelection = itemToChoose.hasClass('select-item--active');
  const isFirstChoice = !itemToChoose.hasClass('select-item--active');

  const isTheSameChoice = !isFirstChoice
    && hasActiveSelection
    && activeChoice.length > 0
    && activeChoice[0] === clickedJqueryElement[0];

  const isNewChoice = hasActiveSelection && !isTheSameChoice;

  if(!isSelectorFieldValid) {
    spanSelector.removeClass('basket__select--invalid');
  }

  if(isToggle) {
    selector.toggleClass('form__line-wrapper--opened');
  }

  if(isTheSameChoice) {
    return;
  }

  if(isChange) {
    spanChoice[0].textContent = value;

    if(isFirstChoice) {
      $(clickedElement).addClass('select-item--active')
    };

    if(isNewChoice) {
      activeChoice.removeClass('select-item--active');
      clickedJqueryElement.addClass('select-item--active');
    }

    if(!isSelectorFieldValid) {
      spanChoice.addClass('basket__choice--active');
      spanSelector.addClass('basket__select--selected');
    }
  }
}

selector.on('click', handleSelectionClick);
