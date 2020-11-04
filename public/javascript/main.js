function isValidInt(value) {
  return value && parseInt(value) > 0
}

function isValidString(value) {
  return value  !== "";
}

function getValueString(id) {
  const VALUE = $(`#${id}`).val();
  let resp = "";
  if(isValidString(VALUE)){
    resp = VALUE;
  }
  return resp;
}

function getValue(id, defaultValue) {
  const VALUE = $(`#${id}`).val();
  let resp = defaultValue;
  if(isValidInt(VALUE)){
    resp = VALUE;
  }
  return parseInt(resp);
}

function getQtdOfDices() {
  const ID = 'qtdOfDices';
  const DEFAULT_QUANTITY_OF_DICES = 1;
  return getValue(ID, DEFAULT_QUANTITY_OF_DICES);
}

function getNumberOfSides() {
  const ID = 'numberOfSides';
  const DEFAULT_NUMBER_OF_SIDES = 6;
  return getValue(ID, DEFAULT_NUMBER_OF_SIDES);
}

function getAuthor() {
  const ID = 'author';
  return getValueString(ID);
}

function getContent() {
  const ID = 'content';
  return getValueString(ID);
}


$(function () {
  $('#submitDice').click(function () {
    let dice = getQtdOfDices();
    let sides = getNumberOfSides();
    const query = `query RollDice($dice: Int!, $sides: Int) {
      rollDice(numDice: $dice, numSides: $sides)
    }`;
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { dice, sides },
      })
    })
    .then(r => r.json())
    .then(data => {
      console.log(data);
      $('#outputDice').empty();
      $('#outputDice').append(JSON.stringify(data));
    });
  });

  $('#submitMessage').click(function () {
    var author = getAuthor();
    var content = getContent();
    const query = `mutation CreateMessage($input: MessageInput) {
      createMessage(input: $input) {
        id,
        content,
        author
      }
    }`;

    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          input: {
            author,
            content,
          }
        }
      })
    })
    .then(r => r.json())
    .then(data => {
      console.log(data);
      $('#outputMessage').empty();
      $('#outputMessage').append(JSON.stringify(data));
    });
  });
})
