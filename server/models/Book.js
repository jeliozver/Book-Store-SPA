const MONGOOSE = require('mongoose');

const STRING = MONGOOSE.Schema.Types.String;
const DATE = MONGOOSE.Schema.Types.Date;
const NUMBER = MONGOOSE.Schema.Types.Number;
const OBJECT_ID = MONGOOSE.Schema.Types.ObjectId;

const BOOK_SCHEMA = MONGOOSE.Schema({
    title: { type: STRING, required: true },
    author: { type: STRING, required: true },
    genre: { type: STRING, required: true },
    year: { type: NUMBER, required: true },
    description: { type: STRING, required: true },
    cover: { type: STRING, required: true },
    isbn: { type: STRING, required: true },
    pagesCount: { type: NUMBER, required: true },
    price: { type: NUMBER, required: true },
    creationDate: { type: DATE, default: Date.now },
    currentRating: { type: NUMBER, default: 0 },
    ratingPoints: { type: NUMBER, default: 0 },
    ratedCount: { type: NUMBER, default: 0 },
    purchasesCount: { type: NUMBER, default: 0 },
    comments: [{ type: OBJECT_ID, ref: 'Comment' }]
});

const BOOK = MONGOOSE.model('Book', BOOK_SCHEMA);

module.exports = BOOK;

module.exports.init = () => {
    BOOK.findOne({ title: 'The Final Empire (Mistborn #1)' }).then((book) => {
        if (!book) {
            BOOK.create({
                title: 'The Final Empire (Mistborn #1)',
                author: 'Brandon Sanderson',
                genre: 'Fantasy',
                year: '2006',
                description: 'For a thousand years the ash fell and no flowers bloomed. For a thousand years the Skaa slaved in misery and lived in fear. For a thousand years the Lord Ruler, the "Sliver of Infinity," reigned with absolute power and ultimate terror, divinely invincible. Then, when hope was so long lost that not even its memory remained, a terribly scarred, heart-broken half-Skaa rediscovered it in the depths of the Lord Ruler\'s most hellish prison. Kelsier "snapped" and found in himself the powers of a Mistborn. A brilliant thief and natural leader, he turned his talents to the ultimate caper, with the Lord Ruler himself as the mark.',
                cover: 'https://i.imgur.com/VRtPMP2.jpg',
                isbn: '076531178X',
                pagesCount: '541',
                price: '5.75'
            });
        }
    });

    BOOK.findOne({ title: 'The Well of Ascension (Mistborn #2)' }).then((book) => {
        if (!book) {
            BOOK.create({
                title: 'The Well of Ascension (Mistborn #2)',
                author: 'Brandon Sanderson',
                genre: 'Fantasy',
                year: '2007',
                description: 'The impossible has been accomplished. The Lord Ruler -- the man who claimed to be god incarnate and brutally ruled the world for a thousand years -- has been vanquished. But Kelsier, the hero who masterminded that triumph, is dead too, and now the awesome task of building a new world has been left to his young protégé, Vin, the former street urchin who is now the most powerful Mistborn in the land, and to the idealistic young nobleman she loves.',
                cover: 'https://i.imgur.com/lZKZckN.jpg',
                isbn: '0765316889',
                pagesCount: '592',
                price: '11.04'
            });
        }
    });

    BOOK.findOne({ title: 'The Hero of Ages (Mistborn #3)' }).then((book) => {
        if (!book) {
            BOOK.create({
                title: 'The Hero of Ages (Mistborn #3)',
                author: 'Brandon Sanderson',
                genre: 'Fantasy',
                year: '2008',
                description: 'To end the Final Empire and restore freedom, Vin killed the Lord Ruler. But as a result, the Deepness--the lethal form of the ubiquitous mists--is back, along with increasingly heavy ashfalls and ever more powerful earthquakes. Humanity appears to be doomed.',
                cover: 'https://i.imgur.com/7m7fOma.jpg',
                isbn: '0765316897',
                pagesCount: '576',
                price: '8.11'
            });
        }
    });

    BOOK.findOne({ title: 'The Alloy of Law (Mistborn #4)' }).then((book) => {
        if (!book) {
            BOOK.create({
                title: 'The Alloy of Law (Mistborn #4)',
                author: 'Brandon Sanderson',
                genre: 'Fantasy',
                year: '2011',
                description: 'Three hundred years after the events of the Mistborn trilogy, Scadrial is now on the verge of modernity, with railroads to supplement the canals, electric lighting in the streets and the homes of the wealthy, and the first steel-framed skyscrapers racing for the clouds. Kelsier, Vin, Elend, Sazed, Spook, and the rest are now part of history—or religion. Yet even as science and technology are reaching new heights, the old magics of Allomancy and Feruchemy continue to play a role in this reborn world. Out in the frontier lands known as the Roughs, they are crucial tools for the brave men and women attempting to establish order and justice',
                cover: 'https://i.imgur.com/tG6EDty.jpg',
                isbn: '0575105836',
                pagesCount: '333',
                price: '9.59'
            });
        }
    });

    BOOK.findOne({ title: 'Shadows of Self (Mistborn #5)' }).then((book) => {
        if (!book) {
            BOOK.create({
                title: 'Shadows of Self (Mistborn #5)',
                author: 'Brandon Sanderson',
                genre: 'Fantasy',
                year: '2015',
                description: 'When family obligations forced Waxillium Ladrian to forsake the frontier lands and return to the metropolis of his birth to take his place as head of a noble House, he little imagined that the crime-fighting skills acquired during twenty years in the dusty plains would be just as applicable in the big city. He soon learned that there too, just being a talented Twinborn — one who can use both Allomancy and Feruchemy, the dominant magical modes on Scadrial — would not suffice.',
                cover: 'https://i.imgur.com/hEUMqhm.jpg',
                isbn: '9780765378552',
                pagesCount: '385',
                price: '12.09'
            });
        }
    });

    BOOK.findOne({ title: 'The Bands of Mourning (Mistborn #6)' }).then((book) => {
        if (!book) {
            BOOK.create({
                title: 'The Bands of Mourning (Mistborn #6)',
                author: 'Brandon Sanderson',
                genre: 'Fantasy',
                year: '2016',
                description: 'The Bands of Mourning are the mythical metal minds owned by the Lord Ruler, said to grant anyone who wears them the powers that the Lord Ruler had at his command. Hardly anyone thinks they really exist. A kandra researcher has returned to Elendel with images that seem to depict the Bands, as well as writings in a language that no one can read. Waxillium Ladrian is recruited to travel south to the city of New Seran to investigate. Along the way he discovers hints that point to the true goals of his uncle Edwarn and the shadowy organization known as The Set.',
                cover: 'https://i.imgur.com/tJXcf3W.jpg',
                isbn: '9780765378576',
                pagesCount: '448',
                price: '12.28'
            });
        }
    });

    BOOK.findOne({ title: 'The Way of Kings (The Stormlight Archive #1)' }).then((book) => {
        if (!book) {
            BOOK.create({
                title: 'The Way of Kings (The Stormlight Archive #1)',
                author: 'Brandon Sanderson',
                genre: 'Fantasy',
                year: '2010',
                description: 'Roshar is a world of stone and storms. Uncanny tempests of incredible power sweep across the rocky terrain so frequently that they have shaped ecology and civilization alike. Animals hide in shells, trees pull in branches, and grass retracts into the soilless ground. Cities are built only where the topography offers shelter.It has been centuries since the fall of the ten consecrated orders known as the Knights Radiant, but their Shardblades and Shardplate remain: mystical swords and suits of armor that transform ordinary men into near-invincible warriors. Men trade kingdoms for Shardblades. Wars were fought for them, and won by them.',
                cover: 'https://i.imgur.com/xxu5ma0.jpg',
                isbn: '9780765326355',
                pagesCount: '1009',
                price: '11.76'
            });
        }
    });

    BOOK.findOne({ title: 'Words of Radiance (The Stormlight Archive #2)' }).then((book) => {
        if (!book) {
            BOOK.create({
                title: 'Words of Radiance (The Stormlight Archive #2)',
                author: 'Brandon Sanderson',
                genre: 'Fantasy',
                year: '2014',
                description: 'Expected by his enemies to die the miserable death of a military slave, Kaladin survived to be given command of the royal bodyguards, a controversial first for a low-status "darkeyes." Now he must protect the king and Dalinar from every common peril as well as the distinctly uncommon threat of the Assassin, all while secretly struggling to master remarkable new powers that are somehow linked to his honorspren, Syl. The Assassin, Szeth, is active again, murdering rulers all over the world of Roshar, using his baffling powers to thwart every bodyguard and elude all pursuers. Among his prime targets is Highprince Dalinar, widely considered the power behind the Alethi throne. His leading role in the war would seem reason enough, but the Assassin\'s master has much deeper motives.',
                cover: 'https://i.imgur.com/PkOUgGy.jpg',
                isbn: '9780765326362',
                pagesCount: '1088',
                price: '12.91'
            });
        }
    });

    BOOK.findOne({ title: 'Oathbringer (The Stormlight Archive #3)' }).then((book) => {
        if (!book) {
            BOOK.create({
                title: 'Oathbringer (The Stormlight Archive #3)',
                author: 'Brandon Sanderson',
                genre: 'Fantasy',
                year: '2017',
                description: 'In Oathbringer, the third volume of the New York Times bestselling Stormlight Archive, humanity faces a new Desolation with the return of the Voidbringers, a foe with numbers as great as their thirst for vengeance.Dalinar Kholin\'s Alethi armies won a fleeting victory at a terrible cost: The enemy Parshendi summoned the violent Everstorm, which now sweeps the world with destruction, and in its passing awakens the once peaceful and subservient parshmen to the horror of their millennia-long enslavement by humans. While on a desperate flight to warn his family of the threat, Kaladin Stormblessed must come to grips with the fact that the newly kindled anger of the parshmen may be wholly justified.',
                cover: 'https://i.imgur.com/kBAPdwo.jpg',
                isbn: '9780765326379',
                pagesCount: '1220',
                price: '20.18'
            });
        }
    });

    BOOK.findOne({ title: 'A Game of Thrones (A Song of Ice and Fire #1)' }).then((book) => {
        if (!book) {
            BOOK.create({
                title: 'A Game of Thrones (A Song of Ice and Fire #1)',
                author: 'George R. R. Martin',
                genre: 'Fantasy',
                year: '1996',
                description: 'Long ago, in a time forgotten, a preternatural event threw the seasons out of balance. In a land where summers can last decades and winters a lifetime, trouble is brewing. The cold is returning, and in the frozen wastes to the north of Winterfell, sinister forces are massing beyond the kingdom’s protective Wall. To the south, the king’s powers are failing—his most trusted adviser dead under mysterious circumstances and his enemies emerging from the shadows of the throne. At the center of the conflict lie the Starks of Winterfell, a family as harsh and unyielding as the frozen land they were born to. Now Lord Eddard Stark is reluctantly summoned to serve as the king’s new Hand, an appointment that threatens to sunder not only his family but the kingdom itself.',
                cover: 'https://i.imgur.com/ezQpwAd.jpg',
                isbn: '0553103547',
                pagesCount: '819',
                price: '10.49'
            });
        }
    });

    BOOK.findOne({ title: 'A Clash of Kings (A Song of Ice and Fire #2)' }).then((book) => {
        if (!book) {
            BOOK.create({
                title: 'A Clash of Kings (A Song of Ice and Fire #2)',
                author: 'George R. R. Martin',
                genre: 'Fantasy',
                year: '1999',
                description: 'A comet the color of blood and flame cuts across the sky. And from the ancient citadel of Dragonstone to the forbidding shores of Winterfell, chaos reigns. Six factions struggle for control of a divided land and the Iron Throne of the Seven Kingdoms, preparing to stake their claims through tempest, turmoil, and war. It is a tale in which brother plots against brother and the dead rise to walk in the night. Here a princess masquerades as an orphan boy; a knight of the mind prepares a poison for a treacherous sorceress; and wild men descend from the Mountains of the Moon to ravage the countryside. Against a backdrop of incest and fratricide, alchemy and murder, victory may go to the men and women possessed of the coldest steel and the coldest hearts. For when kings clash, the whole land trembles.',
                cover: 'https://i.imgur.com/SjQ8z6n.jpg',
                isbn: '0553108034',
                pagesCount: '770',
                price: '15.17'
            });
        }
    });

    BOOK.findOne({ title: 'A Storm of Swords (A Song of Ice and Fire #3)' }).then((book) => {
        if (!book) {
            BOOK.create({
                title: 'A Storm of Swords (A Song of Ice and Fire #3)',
                author: 'George R. R. Martin',
                genre: 'Fantasy',
                year: '2000',
                description: 'Of the five contenders for power, one is dead, another in disfavor, and still the wars rage as violently as ever, as alliances are made and broken. Joffrey, of House Lannister, sits on the Iron Throne, the uneasy ruler of the land of the Seven Kingdoms. His most bitter rival, Lord Stannis, stands defeated and disgraced, the victim of the jealous sorceress who holds him in her evil thrall. But young Robb, of House Stark, still rules the North from the fortress of Riverrun. Robb plots against his despised Lannister enemies, even as they hold his sister hostage at King’s Landing, the seat of the Iron Throne. Meanwhile, making her way across a blood-drenched continent is the exiled queen, Daenerys, mistress of the only three dragons still left in the world',
                cover: 'https://i.imgur.com/vH8AB8S.jpg',
                isbn: '0553106635',
                pagesCount: '1216',
                price: '13.99'
            });
        }
    });

    BOOK.findOne({ title: 'A Feast for Crows (A Song of Ice and Fire #4)' }).then((book) => {
        if (!book) {
            BOOK.create({
                title: 'A Feast for Crows (A Song of Ice and Fire #4)',
                author: 'George R. R. Martin',
                genre: 'Fantasy',
                year: '2005',
                description: 'It seems too good to be true. After centuries of bitter strife and fatal treachery, the seven powers dividing the land have decimated one another into an uneasy truce. Or so it appears. . . . With the death of the monstrous King Joffrey, Cersei is ruling as regent in King’s Landing. Robb Stark’s demise has broken the back of the Northern rebels, and his siblings are scattered throughout the kingdom like seeds on barren soil. Few legitimate claims to the once desperately sought Iron Throne still exist—or they are held in hands too weak or too distant to wield them effectively. The war, which raged out of control for so long, has burned itself out.',
                cover: 'https://i.imgur.com/1uqC2to.jpg',
                isbn: '0002247437',
                pagesCount: '947',
                price: '14.70'
            });
        }
    });

    BOOK.findOne({ title: 'A Dance with Dragons (A Song of Ice and Fire #5)' }).then((book) => {
        if (!book) {
            BOOK.create({
                title: 'A Dance with Dragons (A Song of Ice and Fire #5)',
                author: 'George R. R. Martin',
                genre: 'Fantasy',
                year: '2011',
                description: 'In the aftermath of a colossal battle, the future of the Seven Kingdoms hangs in the balance—beset by newly emerging threats from every direction. In the east, Daenerys Targaryen, the last scion of House Targaryen, rules with her three dragons as queen of a city built on dust and death. But Daenerys has thousands of enemies, and many have set out to find her. As they gather, one young man embarks upon his own quest for the queen, with an entirely different goal in mind.',
                cover: 'https://i.imgur.com/lJ65073.jpg',
                isbn: '9780007456376',
                pagesCount: '1201',
                price: '13.94'
            });
        }
    });
};