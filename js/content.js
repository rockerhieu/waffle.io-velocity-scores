function sumScores(scores) {
  var total = 0;
  $.each(scores, function () {
    var v = $(this).text();
    if (v != '?') {
      total += parseInt(v, 10);
    }
  });
  return total;
}
function extractScore(t) {
  var score, matches = t.match(/(?:^|\s)\(([\d]+)\)(?:$|\s)/);
  return matches ? matches[1] : '?';
}
function updateCardScore(card, score) {
  var footer = card.find('.footer');
 
  if (footer.find('.score').length) {
    footer.find('.score strong').text(score);
  } else {
    footer.append('<div class="score"><strong>' + score + '</strong> <i class="fa fa-lightbulb-o"></i></div>');
  }
}
function updateColumnTotal(column, total) {
  var header = column.find('.column-header');
 
  if (header.find('.total-score').length) {
    header.find('.total-score strong').text(total);
  } else {
    header.append('<span class="total-score"><strong>' + total + '</strong> <i class="fa fa-lightbulb-o"></i></span>');
  }
}
function processCardScore() {
  var t = $(this).find('.title').val();
  updateCardScore($(this), extractScore(t));
}
function tallyColumn() {
  updateColumnTotal($(this), sumScores($(this).find('.footer .score strong')));
}

function fetchScores() {
  $('.card-body').each(processCardScore);null
  $('.column-ct').each(tallyColumn);null
  setTimeout(fetchScores, 2000)
}

fetchScores()