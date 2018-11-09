function lastIndexOfTwoLetters(sourceStr, letterA, letterB) {
  let foundIndex = -1;

  const chooseIndexFromTwo = (indexA, indexB) => {
    if (~indexA) {
      return ~indexB ? Math.max(indexA, indexB) : indexA;
    }

    if (~indexB) {
      return indexB;
    }
  };
  
  if (sourceStr && typeof(sourceStr) === 'string') {
    const sourceLetters = sourceStr.split('');
    let foundIndexA = -1;
    let foundIndexB = -1;
    let sourceLetter;

    for (let i = sourceLetters.length - 1; i > 0; i--) {
      sourceLetter = sourceLetters[i];

      if (sourceLetter === letterA) {
        foundIndexA = i;
      }

      if (sourceLetter === letterB) {
        foundIndexB = i;
      }

      if (~foundIndexA || ~foundIndexB) {
        foundIndex = chooseIndexFromTwo(foundIndexA, foundIndexB);
        break;
      }
    }
  }
  
  return foundIndex;
}