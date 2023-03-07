// Three lists to hold user-inputs.
var nounList = [];
var verbList = [];
var adverbList = [];

onEvent('nounSubmitBtn', 'click', function () {
  for (var i = 0; i < 3; i++) {
    appendItem(nounList, getText('noun' + i));
  }
  setScreen('verbScreen');
});

onEvent('verbSubmitBtn', 'click', function () {
  for (var i = 0; i < 3; i++) {
    appendItem(verbList, getText('verb' + i));
  }
  setScreen('adverbScreen');
});

onEvent('poemGeneratorBtn', 'click', function () {
  appendItem(adverbList, getText('adverb0'));
  appendItem(adverbList, getText('adverb1'));

  var poems = generatePoem(
    nounList,
    verbList,
    adverbList,
    getNumber('numPoemsInput')
  );
  setText('poemDisplay', poems);

  setScreen('finalPoemScreen');
});

// This function is designed to generate a new poem, based on given parameters.
// nList param {string-list} - nouns
// vList param {string-list} - verbs
// advList param {string-list} - adverbs
// numPoems param {number}
function generatePoem(nList, vList, advList, numPoems) {
  var poems = '';

  for (var i = 0; i < numPoems; i++) {
    var poem =
      'The ' +
      getRandomWord(nList) +
      ' ' +
      getRandomWord(vList) +
      ' ' +
      getRandomWord(advList) +
      '.\n' +
      'And ' +
      getRandomWord(advList) +
      ' ' +
      getRandomWord(vList) +
      ' ' +
      getRandomWord(nList) +
      ',\n' +
      getRandomWord(vList) +
      ' ' +
      getRandomWord(nList) +
      '.';
    poems += poem + '\n\n';
  }

  return poems;
}

// This function is designed to get a random word from a list of strings.
// wordList param {string-list}
function getRandomWord(wordList) {
  var randomIndex = randomNumber(0, wordList.length - 1);
  for (var i = 0; i < wordList.length; i++) {
    if (randomIndex == i) {
      return wordList[i];
    }
  }
}

// Users can immediately begin generating a new poem.
onEvent('tryAgainBtn', 'click', function () {
  // Reset global list variables.
  nounList = [];
  verbList = [];
  adverbList = [];

  // Reset inputs.
  for (var i = 0; i < 3; i++) {
    setText('noun' + i, '');
    setText('verb' + i, '');
  }

  setText('adverb0', '');
  setText('adverb1', '');

  // Redirect users.
  setScreen('homeScreen');
});
