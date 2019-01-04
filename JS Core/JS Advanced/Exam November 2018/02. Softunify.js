let expect = require('chai').expect;
class SoftUniFy {
    constructor() {
        this.allSongs = {};
    }

    downloadSong(artist, song, lyrics) {
        if (!this.allSongs[artist]) {
            this.allSongs[artist] = {rate: 0, votes: 0, songs: []}
        }

        this.allSongs[artist]['songs'].push(`${song} - ${lyrics}`);

        return this;
    }

    playSong(song) {
        let songArtists = Object.keys(this.allSongs).reduce((acc, cur) => {

            let songs = this.allSongs[cur]['songs']
                .filter((songInfo) => songInfo
                    .split(/ - /)[0] === song);

            if(songs.length > 0){
                acc[cur] = songs;
            }

            return acc;
        }, {});

        let arr = Object.keys(songArtists);
        let output = "";

        if(arr.length > 0){

            arr.forEach((artist) => {
                output += `${artist}:\n`;
                output += `${songArtists[artist].join('\n')}\n`;
            });

        } else {
            output = `You have not downloaded a ${song} song yet. Use SoftUniFy's function downloadSong() to change that!`
        }

        return output;
    }

    get songsList() {
        let songs = Object.values(this.allSongs)
            .map((v) => v['songs'])
            .reduce((acc, cur) => {
                return acc.concat(cur);
            }, []);

        let output;

        if (songs.length > 0) {
            output = songs.join('\n');
        } else {
            output = 'Your song list is empty';
        }

        return output;

    }

    rateArtist() {
        let artistExist = this.allSongs[arguments[0]];
        let output;

        if (artistExist) {

            if (arguments.length === 2) {
                artistExist['rate'] += +arguments[1];
                artistExist['votes'] += 1;
            }

            let currentRate = (+(artistExist['rate'] / artistExist['votes']).toFixed(2));
            isNaN(currentRate) ? output = 0 : output = currentRate;

        } else {
            output = `The ${arguments[0]} is not on your artist list.`
        }

        return output;
    }
}

describe("TODO …", function() {
    let sofunify;
    beforeEach ( () =>{
        sofunify = new SoftUniFy();
    });
    
    describe('downloadSongWorks', function () {
        it('correct', function() {
            expect(sofunify.allSongs).eql({});
            expect(sofunify.songsList).to.equal('Your song list is empty');
            expect(sofunify.playSong()).to.equal(`You have not downloaded a undefined song yet. Use SoftUniFy's function downloadSong() to change that!`);
            expect(sofunify.rateArtist()).to.equal(`The ${arguments[0]} is not on your artist list.`);
        });

        describe('allSongsWorks', function () {
            it('correct', function() {
                sofunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
                expect(sofunify.songsList).to.equal('Venom - Knock, Knock let the devil in...');
                expect(sofunify.playSong('Eminem')).to.be.eql(`You have not downloaded a Eminem song yet. Use SoftUniFy's function downloadSong() to change that!`);
                sofunify.downloadSong('Eminem', 'Phenomenal', 'IM PHENOMENAL...');
                sofunify.downloadSong('Dub Fx', 'Light Me On Fire', 'You can call me a liar.. ');
                expect(sofunify.allSongs).to.equal('{ Object (Eminem, Dub Fx) }');

            });
        });

        });
    });
