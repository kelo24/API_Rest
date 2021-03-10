// Setting and require modules
const { Router } = require('express');
const _ = require('underscore');
const colors = require('colors');
const router = Router();

const wonders = require('../json/wonders.json');

// Functions extra
const ReplaceOficialWeb = _.each(wonders, (wonder, i) => {
    if (!(wonder.web.oficial)) {
        wonder.web.oficial = 'The oficial web is not defined.';
    }
});

// Methods
//// GET Method
////// Get all the wonders
router.get('/', (req, res) => {
    if (wonders.length != 7) {
        const have = wonders.length;
        const nHave = 7 - have;
        console.log(`${nHave} items missing`.red);
        //alert(`${nHave} items missing`.red);
    }
    res.json(wonders);
});

////// Get a specific wonder
router.get('/:abbr', (req, res) => {
    const { abbr } = req.params;

    _.each(wonders, (wonder, i) => {
        if (wonder.abbr == abbr) {
            res.json(wonder);
            console.log(`Showing ${wonder.name}.`.green);
        }
    });
});

////// Get to the image of the specified wonder
router.get('/:abbr/cover', (req, res) => {
    const { abbr } = req.params;
    var cover;
    var name;

    _.each(wonders, (wonder, i) => {
        if (wonder.abbr == abbr) {
            cover = wonder.cover;
            name = wonder.name;
        }
    });

    res.send(`<img src="${cover}" alt="${name}" width="200px"><a href="${cover}" target='_blank'>Go to the picture in new tab</a>`);
});

//// POST Method
router.post('/', (req, res) => {
    const bod = req.body;
    if (!(bod.web.oficial)) {
        bod.web.oficial = 'The oficial web is not defined.';
    }
    wonders.push(bod);
    res.send( wonders );
});

//// DELETE Method ---------------------------------------------- Aquí hay un error por el módulo Express
router.delete('/:abbr', (req, res) => {
    const { abbr } = req.params;

    _.each(wonders, (wonder, i) => {
        if (wonder.abbr == abbr) {
            wonders.splice(i, 1);
            console.log(`${wonder.name} has been eliminated.`.yellow);
            console.log(`${i}`.bgWhite);
        }
    });

    res.send(wonders);
});

//// PUT Method
router.put('/:abbrP', (req, res) => {
    const { abbrP } = req.params;
    const bod = req.body;
    const { id, name, abbr, location, cover, year } = bod;
    const { lat, lon } = bod.geo;
    const { wiki, oficial } = bod.web;

    const { geoMod, geoId } = bod.config;

    const newGeo = `${lat}, ${lon}`;
    
    
    if ( id || name || abbr || location || cover || lat || lon || wiki || oficial || year ) {
        _.each(wonders, (wonder, i) => {
            const namePast = wonder.name;

            if (wonder.abbr == abbrP) {
                wonder.abbr = abbr;
                wonder.name = name;
                wonder.location = location;
                wonder.cover = cover;
                wonder.geo.lat = lat;
                wonder.geo.lon = lon;
                wonder.web.wiki = wiki;
                wonder.web.oficial = oficial;
                wonder.year = year;
            }
            if (geoMod) {
                wonder.geo = newGeo;
            }
            if (geoId) {
                wonder.id = id
            }

            res.send(wonders);

            if (namePast == name) {
                console.log(`Some of ${namePast}'s data has changed successfully.`.green);
            } else {
                console.log(`${namePast} has been succesfully switched to ${name}`.green);
            }
            
        });
    } else {
        res.status(500).send({ error: 'There is no property or object that can be changed.' });
    }
});

//// PATCH Method
////// Reordering the id
router.patch('/reorder', (req, res) => {
    const { action } = req.params;

    _.each(wonders, (wonder, i) => {
        //if (action == 'reorder') {
            var newId = i + 1;

            wonder.id = newId;
        //}
    });
    res.send(wonders);
    console.log('JSON succesfully reordered.'.bgWhite.green);
});

module.exports = router;



/*
router.get('/:abbr/:prop', (req, res) => {
    const { abbr, prop } = req.params;
    // var bod;
    // const cover = bod.cover;
    // const { wiki, oficial } = bod.web;

    //var concat = wonder.${prop};
    
    _.each(wonders, (wonder, i) => {
        //bod = wonder;
        const cover = wonder.cover;
        const { wiki, oficial } = wonder.web;

        if ({ wiki, oficial } != 'The oficial web is not defined.' && cover) {
            console.log('vamo');
        }
    })
    res.send();
})
*/