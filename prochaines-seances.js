var casper = require('casper').create();
var films;

function getFilms() {
    var films = document.querySelectorAll('.movie-row-wrapper');
    var listFilms = [];
    for (var i=0; i <films.length;i++){
    	var film = {};
    	var f= films[i].querySelector('.movie-overview-title a');
    	var horaires =[];
    	var h = films[i].querySelectorAll('.t-seg a');
    		for (var j=0; j<h.length;j++) {
    			var horaire = h[j].innerHTML;
    			horaires.push(horaire);
    		};
    	film['title'] = f.innerHTML;
    	film['horaire'] = horaires;
    	listFilms.push(film);
    };
   return listFilms;
}

casper.start('https://kinepolis.fr/cinemas/kinepolis-nancy/aujourdhui');

casper.then(function () {
    films = this.evaluate(getFilms);
});

casper.run(function () {
	casper.echo("Les prochaines séances :", 'ERROR');
    for(var i in films) {
        casper.echo(films[i].title , 'PARAMETER');
        var horaires = films[i].horaire.join(' - ');
        casper.echo(horaires);
    }
    casper.done();
});
