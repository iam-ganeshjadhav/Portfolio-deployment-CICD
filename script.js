document.addEventListener('DOMContentLoaded', function(){
  var buttons = Array.from(document.querySelectorAll('.filter-btn'));
  var cards = Array.from(document.querySelectorAll('#portfolio-grid .card'));

  function setActive(btn){
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  function filter(cat){
    cards.forEach(card => {
      if(cat === 'all') card.style.display = '';
      else {
        card.style.display = (card.getAttribute('data-cat') === cat) ? '' : 'none';
      }
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', function(){
      var cat = this.getAttribute('data-cat');
      setActive(this);
      filter(cat);
    });
  });

  var nav = document.querySelector('.main-nav');
  if(nav && window.innerWidth < 700){
    nav.style.display = 'flex';
    nav.style.gap = '8px';
  }
});
