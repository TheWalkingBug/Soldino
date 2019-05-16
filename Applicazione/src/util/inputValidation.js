function onlyIntegerNumbers(value) {
  const regex = new RegExp('^[0-9]+$');
  return regex.test(value);
}

function onlyFloatNumbers(value) {
  // eslint-disable-next-line no-useless-escape
  const regex = new RegExp('/^[+-]?\d+(\.\d+)?$/');
  return regex.test(value);
}

function isOnlyNumbersAndADot(value) {
  const regex = new RegExp('^\\d*\\.?\\d*$');
  return regex.test(value);
}

function isPositive(value) {
  const v = parseFloat(value);
  if (Number.isNaN(v) || v <= 0) {
    return false;
  }
  return true;
}

// zero accepted
function isPositiveInteger(value) {
  const v = parseInt(value);
  if (Number.isNaN(v) || v < 0) {
    return false;
  }
  return true;
}

function isOneHundredCharacterMax(value) {
  if (value.lenght > 100) {
    return false;
  }
  return true;
}

function isOnlyCharacters(value) {
  const regex = new RegExp('^[A-Za-z]+$');
  return regex.test(value);
}

function isValidFiscalCode(value) {
  const regex = new RegExp('^[A-Z]{6}\\d{2}[A-Z]\\d{2}[A-Z]\\d{3}[A-Z]$');
  return regex.test(value);
}

function isValidEmail(value) {
  // eslint-disable-next-line no-useless-escape
  const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return regex.test(String(value).toLowerCase());
}

function isValidAddress(value) {
  // eslint-disable-next-line no-useless-escape
  const regex = new RegExp("^[a-zA-Z0-9\s,'-]*$");
  return regex.test(String(value));
}

function isValidVAT(value) {
  const regex = new RegExp('^[0-9]{11}');
  return regex.test(String(value));
}

export {
  onlyIntegerNumbers,
  onlyFloatNumbers,
  isPositive,
  isOneHundredCharacterMax,
  isOnlyCharacters,
  isValidFiscalCode,
  isValidEmail,
  isValidAddress,
  isValidVAT,
  isPositiveInteger,
  isOnlyNumbersAndADot,
};
