var fs = require('fs');

fs.readFile('cmudict.txt', function(err, data) {
  if (err) {
    return console.log(err);
  }

  var dictionary = [];
  var lines = data.toString().split('\n');
  lines.forEach(function(line) {
    var line_split = line.split('  ');
    var word = line_split[0];

    var count = line_split[1].split(' ').reduce(function(count, syl) {
      if (syl.match(/\d/)) return ++count;
      else return count;
    }, 0);

    dictionary.push([word, count]);
  });

  var sylStructure = [genSylStructure(5), genSylStructure(7), genSylStructure(5)];

  sylStructure.forEach(function(sylPerLine) {
    var line = [];
    sylPerLine.forEach(function(syl) {
      line.push(getWordBySyl(dictionary, syl))
    });

    console.log(line.join(' '));
  });
});

function getWordBySyl(dictionary, syl) {
  var wordsBySyl = dictionary.filter(function(entry) {
    return entry[1] == syl;
  });

  return wordsBySyl[Math.floor(Math.random()*wordsBySyl.length)][0];
}

function genSylStructure(numSyls) {
  var syls = [];
  var total = 0;
  while (total < numSyls) {
    var newSyl = Math.ceil(Math.random()*(numSyls - total));
    syls.push(newSyl);
    total += newSyl;
  }

  return syls;
}
