var express = require('express');
var fs = require('fs');
var path = require("path");

var app = express();

var bodyParser = require('body-parser');

// var mysql = require('mysql');

const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({
    extended: false
}));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(cors());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    next();
});


var http = require('http');
// var https = require('https');

// var privateKey = fs.readFileSync('/mnt/volume_sgp1_05/ba4ng5lato5w2er/ssl.key', 'utf8');
// var certificate = fs.readFileSync('/mnt/volume_sgp1_05/ba4ng5lato5w2er/ssl.cert', 'utf8');

// var credentials = { key: privateKey, cert: certificate };

var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);

const dbConfig = require("./ssr/dbCon/dbConfig");
const bnConfig = dbConfig.bnConfig();
const enConfig = dbConfig.enConfig();
const mediaConfig = dbConfig.mediaConfig();
// const genConfig = dbConfig.genConfig();

var FEndPort = 3600;
var FEndUrl = 'https://www.bangla.deshkalnews.com';
var BEndUrl = 'https://backoffice.deshkalnews.com';
var CDNUrl = 'https://assets.deshkalnews.com';

app.enable('trust proxy')

app.use(function (request, response, next) {
    if (request.secure && request.headers.host.slice(0, 4) !== "www.") {
        var newHost = "www." + request.headers.host;
        return response.redirect(301, request.protocol + "://" + newHost + request.originalUrl);
    }
    else if (!request.secure && request.headers.host.slice(0, 4) !== "www.") {
        var newHost = "www." + request.headers.host;
        return response.redirect(301, "https://" + newHost + request.url);
    }
    else if (!request.secure && request.headers.host.slice(0, 4) === "www.") {
        return response.redirect(301, "https://" + request.headers.host + request.url);
    }
    next();
}) // auto redirect to www.


app.get('/', function (request, response) {
    console.log('Home page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', async function (err, data) {
        if (err) {
            return console.log(err);
        }
        // ✅ Set language for Bangla site
        data = data.replace(/\$HTML_LANG/g, "bn");

        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'DeshKalNews.com | বাংলাদেশ ও বিশ্ব সংবাদ | সর্বশেষ খবর');
        data = data.replace(/\$OG_DESCRIPTION/g, "DeshKalNews.com || দেশকালনিউজ.কম: Find breaking Bangladeshi news, Economic, Business updates, and Crime reports. Get 24/7 coverage on national, international news, entertainment, celebrity, sports, technology, lifestyle news and more at deshkalnews");
        data = data.replace(/\$OG_KEYWORDS/g, "DeshKalNews.com, Deshkal News, বাংলাদেশ সংবাদ, সর্বশেষ খবর, বাংলা নিউজ, জাতীয় খবর, রাজনীতি, আন্তর্জাতিক সংবাদ, খেলার খবর, বিনোদন, অর্থনীতি, প্রযুক্তি, ব্রেকিং নিউজ, আজকের খবর, মতামত, চাকরির খবর, ইসলাম");
        data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
        // var fullUrl = request.protocol + '://' + request.hostname + request.originalUrl;
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});
app.get('/archives', function (request, response) {
    console.log('archive page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', async function (err, data) {
        if (err) {
            return console.log(err);
        }

        // ✅ Set language for Bangla site
        data = data.replace(/\$HTML_LANG/g, "bn");
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'আর্কাইভ | পুরনো সব গুরুত্বপূর্ণ খবর ও রেকর্ড');
        data = data.replace(/\$OG_DESCRIPTION/g, "দেশকাল নিউজের সংরক্ষিত পুরনো সব প্রতিবেদন এক জায়গায়");
        data = data.replace(/\$OG_KEYWORDS/g, "আর্কাইভ, পুরনো খবর, সংরক্ষণ, News Archive");
        data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
        // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});
app.get('/latest', function (request, response) {
    console.log('latest page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', async function (err, data) {
        if (err) {
            return console.log(err);
        }
        // ✅ Set language for Bangla site
        data = data.replace(/\$HTML_LANG/g, "bn");
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'আজকের সর্বশেষ খবর, ব্রেকিং নিউজ | Latest news, Breaking news | DeshkalNews.com');
        data = data.replace(/\$OG_DESCRIPTION/g, "Read today's breaking news of Bangladesh on politics, sports, business, entertainment, weather, lifestyle, education, tourism, and latest bd news leading Bangla News portal Deshkal News");
        data = data.replace(/\$OG_KEYWORDS/g, "সব খবর, আজকের খবর, আজকের সর্বশেষ সংবাদ, ব্রেকিং নিউজ, বাংলা সংবাদ, দেশকালনিউজ.কম");
        data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
        // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});
app.get('/tags', function (request, response) {
    console.log('tags page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', async function (err, data) {
        if (err) {
            return console.log(err);
        }
        // ✅ Set language for Bangla site
        data = data.replace(/\$HTML_LANG/g, "bn");
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'দেশকালনিউজ :: ট্যাগ সমূহ');
        data = data.replace(/\$OG_DESCRIPTION/g, "দেশকালনিউজ :: ট্যাগ সমূহ");
        data = data.replace(/\$OG_KEYWORDS/g, "দেশকালনিউজ, পত্রিকা, বাংলাদেশ, আজকের পত্রিকা, জাতীয়, সারাদেশ, বরিশাল, চট্টগ্রাম, ঢাকা,খুলনা, রাজশাহী, সিলেট, রংপুর, ময়মনসিংহ, রাজধানী, আন্তর্জাতিক, রাজনীতি, বিনোদন , দেশি, বিদেশি, খেলা, ক্রিকেট, বিশ্বকাপ ক্রিকেট, বিশেষ কলাম, অর্থনীতি, ধর্ম, লাইফস্টাইল, ফ্যাশন, রেসিপি, সাত রঙ, সাতরঙ,  দূরবীন, প্রথম প্রহর, বইমেলা, তথ্যপ্রযুক্তি, শিক্ষাঙ্গন, আইন-আদালত, আইন আদালত, শিল্প ও সাহিত্, শিল্প সাহিত্, স্বাস্থ্য ও চিকিৎসা, স্বাস্থ্য চিকিৎসা, ফিচার, বিজ্ঞান, ভ্রমণ, মুক্তকথা, মুখোমুখি, প্রবাস জীবন, জব কর্নার, জব, মজার খবর, কার্টুন, সোশ্যাল মিডিয়া, সাইবার স্পেস, আর্কাইভ, সাহিত্য, কম্পিউটার, মোবাইল ফোন, গেমস, সরকার, অপরাধ, আইন ও বিচার, পরিবেশ, দুর্ঘটনা, সংসদ, রাজধানী, শেয়ার বাজার, বাণিজ্য, পোশাক শিল্প, ফুটবল, সকাল, বিকাল");
        data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
        // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

app.get('/writers', function (request, response) {
    console.log('writers page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', async function (err, data) {
        if (err) {
            return console.log(err);
        }
        // ✅ Set language for Bangla site
        data = data.replace(/\$HTML_LANG/g, "bn");
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'দেশকালনিউজ :: লেখক সমূহ');
        data = data.replace(/\$OG_DESCRIPTION/g, "দেশকালনিউজ :: লেখক সমূহ");
        data = data.replace(/\$OG_KEYWORDS/g, "দেশকালনিউজ, পত্রিকা, বাংলাদেশ, আজকের পত্রিকা, জাতীয়, সারাদেশ, বরিশাল, চট্টগ্রাম, ঢাকা,খুলনা, রাজশাহী, সিলেট, রংপুর, ময়মনসিংহ, রাজধানী, আন্তর্জাতিক, রাজনীতি, বিনোদন , দেশি, বিদেশি, খেলা, ক্রিকেট, বিশ্বকাপ ক্রিকেট, বিশেষ কলাম, অর্থনীতি, ধর্ম, লাইফস্টাইল, ফ্যাশন, রেসিপি, সাত রঙ, সাতরঙ,  দূরবীন, প্রথম প্রহর, বইমেলা, তথ্যপ্রযুক্তি, শিক্ষাঙ্গন, আইন-আদালত, আইন আদালত, শিল্প ও সাহিত্, শিল্প সাহিত্, স্বাস্থ্য ও চিকিৎসা, স্বাস্থ্য চিকিৎসা, ফিচার, বিজ্ঞান, ভ্রমণ, মুক্তকথা, মুখোমুখি, প্রবাস জীবন, জব কর্নার, জব, মজার খবর, কার্টুন, সোশ্যাল মিডিয়া, সাইবার স্পেস, আর্কাইভ, সাহিত্য, কম্পিউটার, মোবাইল ফোন, গেমস, সরকার, অপরাধ, আইন ও বিচার, পরিবেশ, দুর্ঘটনা, সংসদ, রাজধানী, শেয়ার বাজার, বাণিজ্য, পোশাক শিল্প, ফুটবল, সকাল, বিকাল");
        data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
        // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});



app.get('/videos', function (request, response) {
    console.log('videos page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', async function (err, data) {
        if (err) {
            return console.log(err);
        }
        // ✅ Set language for Bangla site
        data = data.replace(/\$HTML_LANG/g, "bn");
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'দেশকালনিউজ :: ভিডিও গ্যালারী');
        data = data.replace(/\$OG_DESCRIPTION/g, "দেশকালনিউজ :: ভিডিও গ্যালারী");
        data = data.replace(/\$OG_KEYWORDS/g, "দেশকালনিউজ, পত্রিকা, বাংলাদেশ, আজকের পত্রিকা, জাতীয়, সারাদেশ, বরিশাল, চট্টগ্রাম, ঢাকা,খুলনা, রাজশাহী, সিলেট, রংপুর, ময়মনসিংহ, রাজধানী, আন্তর্জাতিক, রাজনীতি, বিনোদন , দেশি, বিদেশি, খেলা, ক্রিকেট, বিশ্বকাপ ক্রিকেট, বিশেষ কলাম, অর্থনীতি, ধর্ম, লাইফস্টাইল, ফ্যাশন, রেসিপি, সাত রঙ, সাতরঙ,  দূরবীন, প্রথম প্রহর, বইমেলা, তথ্যপ্রযুক্তি, শিক্ষাঙ্গন, আইন-আদালত, আইন আদালত, শিল্প ও সাহিত্, শিল্প সাহিত্, স্বাস্থ্য ও চিকিৎসা, স্বাস্থ্য চিকিৎসা, ফিচার, বিজ্ঞান, ভ্রমণ, মুক্তকথা, মুখোমুখি, প্রবাস জীবন, জব কর্নার, জব, মজার খবর, কার্টুন, সোশ্যাল মিডিয়া, সাইবার স্পেস, আর্কাইভ, সাহিত্য, কম্পিউটার, মোবাইল ফোন, গেমস, সরকার, অপরাধ, আইন ও বিচার, পরিবেশ, দুর্ঘটনা, সংসদ, রাজধানী, শেয়ার বাজার, বাণিজ্য, পোশাক শিল্প, ফুটবল, সকাল, বিকাল");
        data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
        // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

app.get('/photo', function (request, response) {
    console.log('photo gallery visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', async function (err, data) {
        if (err) {
            return console.log(err);
        }
        // ✅ Set language for Bangla site
        data = data.replace(/\$HTML_LANG/g, "bn");
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'ছবিতে সংবাদ | ফটোজার্নালিজম ও চিত্র প্রতিবেদন');
        data = data.replace(/\$OG_DESCRIPTION/g, "খবরকে জীবন্ত করে তুলেছে আমাদের তোলা ছবিগুলো");
        data = data.replace(/\$OG_KEYWORDS/g, "সংবাদ ছবি, ছবি প্রতিবেদন, ছবিতে সংবাদ");
        data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
        // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

// bangla staff page
app.get('/staff-member', function (request, response) {
    console.log('staff-member page visited for Bangla site!');
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        // ✅ Set language for Bangla site
        data = data.replace(/\$HTML_LANG/g, "bn");
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'দেশকালনিউজ :: স্টাফ');
        data = data.replace(/\$OG_DESCRIPTION/g, "দেশকালনিউজ :: স্টাফ");
        data = data.replace(/\$OG_KEYWORDS/g, "দেশকালনিউজ, পত্রিকা, বাংলাদেশ, আজকের পত্রিকা, জাতীয়, সারাদেশ, বরিশাল, চট্টগ্রাম, ঢাকা,খুলনা, রাজশাহী, সিলেট, রংপুর, ময়মনসিংহ, রাজধানী, আন্তর্জাতিক, রাজনীতি, বিনোদন , দেশি, বিদেশি, খেলা, ক্রিকেট, বিশ্বকাপ ক্রিকেট, বিশেষ কলাম, অর্থনীতি, ধর্ম, লাইফস্টাইল, ফ্যাশন, রেসিপি, সাত রঙ, সাতরঙ,  দূরবীন, প্রথম প্রহর, বইমেলা, তথ্যপ্রযুক্তি, শিক্ষাঙ্গন, আইন-আদালত, আইন আদালত, শিল্প ও সাহিত্, শিল্প সাহিত্, স্বাস্থ্য ও চিকিৎসা, স্বাস্থ্য চিকিৎসা, ফিচার, বিজ্ঞান, ভ্রমণ, মুক্তকথা, মুখোমুখি, প্রবাস জীবন, জব কর্নার, জব, মজার খবর, কার্টুন, সোশ্যাল মিডিয়া, সাইবার স্পেস, আর্কাইভ, সাহিত্য, কম্পিউটার, মোবাইল ফোন, গেমস, সরকার, অপরাধ, আইন ও বিচার, পরিবেশ, দুর্ঘটনা, সংসদ, রাজধানী, শেয়ার বাজার, বাণিজ্য, পোশাক শিল্প, ফুটবল, সকাল, বিকাল");
        data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
        // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

app.get('/privacy-policy', function (request, response) {
    console.log('privacy-policy page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        // ✅ Set language for Bangla site
        data = data.replace(/\$HTML_LANG/g, "bn");
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'দেশকালনিউজ :: Privacy Policy');
        data = data.replace(/\$OG_DESCRIPTION/g, "দেশকালনিউজ :: Privacy Policy");
        data = data.replace(/\$OG_KEYWORDS/g, "দেশকালনিউজ, পত্রিকা, বাংলাদেশ, আজকের পত্রিকা, জাতীয়, সারাদেশ, বরিশাল, চট্টগ্রাম, ঢাকা,খুলনা, রাজশাহী, সিলেট, রংপুর, ময়মনসিংহ, রাজধানী, আন্তর্জাতিক, রাজনীতি, বিনোদন , দেশি, বিদেশি, খেলা, ক্রিকেট, বিশ্বকাপ ক্রিকেট, বিশেষ কলাম, অর্থনীতি, ধর্ম, লাইফস্টাইল, ফ্যাশন, রেসিপি, সাত রঙ, সাতরঙ,  দূরবীন, প্রথম প্রহর, বইমেলা, তথ্যপ্রযুক্তি, শিক্ষাঙ্গন, আইন-আদালত, আইন আদালত, শিল্প ও সাহিত্, শিল্প সাহিত্, স্বাস্থ্য ও চিকিৎসা, স্বাস্থ্য চিকিৎসা, ফিচার, বিজ্ঞান, ভ্রমণ, মুক্তকথা, মুখোমুখি, প্রবাস জীবন, জব কর্নার, জব, মজার খবর, কার্টুন, সোশ্যাল মিডিয়া, সাইবার স্পেস, আর্কাইভ, সাহিত্য, কম্পিউটার, মোবাইল ফোন, গেমস, সরকার, অপরাধ, আইন ও বিচার, পরিবেশ, দুর্ঘটনা, সংসদ, রাজধানী, শেয়ার বাজার, বাণিজ্য, পোশাক শিল্প, ফুটবল, সকাল, বিকাল");
        data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
        // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

app.get('/terms-service', function (request, response) {
    console.log('terms-conditions page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        // ✅ Set language for Bangla site
        data = data.replace(/\$HTML_LANG/g, "bn");
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'দেশকালনিউজ :: Terms & Conditions');
        data = data.replace(/\$OG_DESCRIPTION/g, "দেশকালনিউজ :: Terms & Conditions");
        data = data.replace(/\$OG_KEYWORDS/g, "দেশকালনিউজ, পত্রিকা, বাংলাদেশ, আজকের পত্রিকা, জাতীয়, সারাদেশ, বরিশাল, চট্টগ্রাম, ঢাকা,খুলনা, রাজশাহী, সিলেট, রংপুর, ময়মনসিংহ, রাজধানী, আন্তর্জাতিক, রাজনীতি, বিনোদন , দেশি, বিদেশি, খেলা, ক্রিকেট, বিশ্বকাপ ক্রিকেট, বিশেষ কলাম, অর্থনীতি, ধর্ম, লাইফস্টাইল, ফ্যাশন, রেসিপি, সাত রঙ, সাতরঙ,  দূরবীন, প্রথম প্রহর, বইমেলা, তথ্যপ্রযুক্তি, শিক্ষাঙ্গন, আইন-আদালত, আইন আদালত, শিল্প ও সাহিত্, শিল্প সাহিত্, স্বাস্থ্য ও চিকিৎসা, স্বাস্থ্য চিকিৎসা, ফিচার, বিজ্ঞান, ভ্রমণ, মুক্তকথা, মুখোমুখি, প্রবাস জীবন, জব কর্নার, জব, মজার খবর, কার্টুন, সোশ্যাল মিডিয়া, সাইবার স্পেস, আর্কাইভ, সাহিত্য, কম্পিউটার, মোবাইল ফোন, গেমস, সরকার, অপরাধ, আইন ও বিচার, পরিবেশ, দুর্ঘটনা, সংসদ, রাজধানী, শেয়ার বাজার, বাণিজ্য, পোশাক শিল্প, ফুটবল, সকাল, বিকাল");
        data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
        // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});
// bangla contact page
app.get('/contact-us', function (request, response) {
    console.log('Contact page visited for Bangla site!');
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        // ✅ Set language for Bangla site
        data = data.replace(/\$HTML_LANG/g, "bn");
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'দেশকালনিউজ :: যোগাযোগ');
        data = data.replace(/\$OG_DESCRIPTION/g, "দেশকালনিউজ :: যোগাযোগ");
        data = data.replace(/\$OG_KEYWORDS/g, "দেশকালনিউজ, পত্রিকা, বাংলাদেশ, আজকের পত্রিকা, জাতীয়, সারাদেশ, বরিশাল, চট্টগ্রাম, ঢাকা,খুলনা, রাজশাহী, সিলেট, রংপুর, ময়মনসিংহ, রাজধানী, আন্তর্জাতিক, রাজনীতি, বিনোদন , দেশি, বিদেশি, খেলা, ক্রিকেট, বিশ্বকাপ ক্রিকেট, বিশেষ কলাম, অর্থনীতি, ধর্ম, লাইফস্টাইল, ফ্যাশন, রেসিপি, সাত রঙ, সাতরঙ,  দূরবীন, প্রথম প্রহর, বইমেলা, তথ্যপ্রযুক্তি, শিক্ষাঙ্গন, আইন-আদালত, আইন আদালত, শিল্প ও সাহিত্, শিল্প সাহিত্, স্বাস্থ্য ও চিকিৎসা, স্বাস্থ্য চিকিৎসা, ফিচার, বিজ্ঞান, ভ্রমণ, মুক্তকথা, মুখোমুখি, প্রবাস জীবন, জব কর্নার, জব, মজার খবর, কার্টুন, সোশ্যাল মিডিয়া, সাইবার স্পেস, আর্কাইভ, সাহিত্য, কম্পিউটার, মোবাইল ফোন, গেমস, সরকার, অপরাধ, আইন ও বিচার, পরিবেশ, দুর্ঘটনা, সংসদ, রাজধানী, শেয়ার বাজার, বাণিজ্য, পোশাক শিল্প, ফুটবল, সকাল, বিকাল");
        data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
        // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

// bangla advertise page
app.get('/advertise', function (request, response) {
    console.log('Advertisement page visited for Bangla site!');
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        // ✅ Set language for Bangla site
        data = data.replace(/\$HTML_LANG/g, "bn");
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'দেশকালনিউজ :: Advertisement');
        data = data.replace(/\$OG_DESCRIPTION/g, "দেশকালনিউজ :: Advertisement");
        data = data.replace(/\$OG_KEYWORDS/g, "দেশকালনিউজ, পত্রিকা, বাংলাদেশ, আজকের পত্রিকা, জাতীয়, সারাদেশ, বরিশাল, চট্টগ্রাম, ঢাকা,খুলনা, রাজশাহী, সিলেট, রংপুর, ময়মনসিংহ, রাজধানী, আন্তর্জাতিক, রাজনীতি, বিনোদন , দেশি, বিদেশি, খেলা, ক্রিকেট, বিশ্বকাপ ক্রিকেট, বিশেষ কলাম, অর্থনীতি, ধর্ম, লাইফস্টাইল, ফ্যাশন, রেসিপি, সাত রঙ, সাতরঙ,  দূরবীন, প্রথম প্রহর, বইমেলা, তথ্যপ্রযুক্তি, শিক্ষাঙ্গন, আইন-আদালত, আইন আদালত, শিল্প ও সাহিত্, শিল্প সাহিত্, স্বাস্থ্য ও চিকিৎসা, স্বাস্থ্য চিকিৎসা, ফিচার, বিজ্ঞান, ভ্রমণ, মুক্তকথা, মুখোমুখি, প্রবাস জীবন, জব কর্নার, জব, মজার খবর, কার্টুন, সোশ্যাল মিডিয়া, সাইবার স্পেস, আর্কাইভ, সাহিত্য, কম্পিউটার, মোবাইল ফোন, গেমস, সরকার, অপরাধ, আইন ও বিচার, পরিবেশ, দুর্ঘটনা, সংসদ, রাজধানী, শেয়ার বাজার, বাণিজ্য, পোশাক শিল্প, ফুটবল, সকাল, বিকাল");
        data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
        // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

// bangla about page
app.get('/about', function (request, response) {
    console.log('about page visited for Bangla site!');
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        // ✅ Set language for Bangla site
        data = data.replace(/\$HTML_LANG/g, "bn");
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'দেশকালনিউজ :: About');
        data = data.replace(/\$OG_DESCRIPTION/g, "দেশকালনিউজ :: About");
        data = data.replace(/\$OG_KEYWORDS/g, "দেশকালনিউজ, পত্রিকা, বাংলাদেশ, আজকের পত্রিকা, জাতীয়, সারাদেশ, বরিশাল, চট্টগ্রাম, ঢাকা,খুলনা, রাজশাহী, সিলেট, রংপুর, ময়মনসিংহ, রাজধানী, আন্তর্জাতিক, রাজনীতি, বিনোদন , দেশি, বিদেশি, খেলা, ক্রিকেট, বিশ্বকাপ ক্রিকেট, বিশেষ কলাম, অর্থনীতি, ধর্ম, লাইফস্টাইল, ফ্যাশন, রেসিপি, সাত রঙ, সাতরঙ,  দূরবীন, প্রথম প্রহর, বইমেলা, তথ্যপ্রযুক্তি, শিক্ষাঙ্গন, আইন-আদালত, আইন আদালত, শিল্প ও সাহিত্, শিল্প সাহিত্, স্বাস্থ্য ও চিকিৎসা, স্বাস্থ্য চিকিৎসা, ফিচার, বিজ্ঞান, ভ্রমণ, মুক্তকথা, মুখোমুখি, প্রবাস জীবন, জব কর্নার, জব, মজার খবর, কার্টুন, সোশ্যাল মিডিয়া, সাইবার স্পেস, আর্কাইভ, সাহিত্য, কম্পিউটার, মোবাইল ফোন, গেমস, সরকার, অপরাধ, আইন ও বিচার, পরিবেশ, দুর্ঘটনা, সংসদ, রাজধানী, শেয়ার বাজার, বাণিজ্য, পোশাক শিল্প, ফুটবল, সকাল, বিকাল");
        data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
        // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});

// ads.txt 
app.get('/ads.txt', function (request, response) {
    response.setHeader('Content-Type', 'text/plain');
    console.log('ads.txt visited!');
    const filePath = path.resolve(__dirname, './', 'ads.txt');

    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        // ✅ Set language for Bangla site
        data = data.replace(/\$HTML_LANG/g, "bn");
        response.send(data);
    });
});
app.get('/google7e2046947495bf19.html', function (request, response) {
    response.setHeader('Content-Type', 'text/html');
    console.log('google7e2046947495bf19.html visited!');
    const filePath = path.resolve(__dirname, './', 'google7e2046947495bf19.html');

    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        // ✅ Set language for Bangla site
        data = data.replace(/\$HTML_LANG/g, "bn");
        response.send(data);
    });
});
// bangla-sitemap.xml
app.get('/bangla-sitemap.xml', function (request, response) {
    response.setHeader('Content-Type', 'application/xml');
    console.log('bangla sitemap.xml visited!');
    const filePath = path.resolve(__dirname, './sitemap', 'sitemap.xml');

    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        response.send(data);
    });
});
app.get('/robots.txt', function (request, response) {
    response.setHeader('Content-Type', 'text/plain');
    console.log('robots.txt visited!');

    let xml = `User-agent: *\nAllow: /\n\nSitemap: ${FEndUrl}/sitemap.xml\nSitemap: ${FEndUrl}/bangla-sitemap.xml\nSitemap: ${FEndUrl}/english-sitemap.xml\n`
    var todate = new Date()
    xml += `Sitemap: ${FEndUrl}/bangla-sitemap/sitemap-daily-${todate.getFullYear()}-${todate.getMonth() < 9 ? '0' + (todate.getMonth() + 1) : todate.getMonth() + 1}-${todate.getDate() < 10 ? '0' + todate.getDate() : todate.getDate()}.xml\nSitemap: ${FEndUrl}/english-sitemap/sitemap-daily-${todate.getFullYear()}-${todate.getMonth() < 9 ? '0' + (todate.getMonth() + 1) : todate.getMonth() + 1}-${todate.getDate() < 10 ? '0' + todate.getDate() : todate.getDate()}.xml\n`
    todate.setHours(23, 59, 59, 999)
    for (let i = 0; i < 30; i++) {
        todate.setDate(todate.getDate() - 1)
        xml += `Sitemap: ${FEndUrl}/bangla-sitemap/sitemap-daily-${todate.getFullYear()}-${todate.getMonth() < 9 ? '0' + (todate.getMonth() + 1) : todate.getMonth() + 1}-${todate.getDate() < 10 ? '0' + todate.getDate() : todate.getDate()}.xml\nSitemap: ${FEndUrl}/english-sitemap/sitemap-daily-${todate.getFullYear()}-${todate.getMonth() < 9 ? '0' + (todate.getMonth() + 1) : todate.getMonth() + 1}-${todate.getDate() < 10 ? '0' + todate.getDate() : todate.getDate()}.xml\n`
    }
    // for (let i = 0; i < 70; i++) {
    //     xml += `Sitemap: ${FEndUrl}/sitemap-bn/sitemap-bn-${i + 1}.xml\n`
    // }
    // for (let i = 0; i < 16; i++) {
    //     xml += `Sitemap: ${FEndUrl}/sitemap-en/sitemap-en-${i + 1}.xml\n`
    // }
    xml += `Sitemap: ${FEndUrl}/bangla-news-sitemap.xml\nSitemap: ${FEndUrl}/english-news-sitemap.xml\n`
    response.send(xml);
});

app.get('/sitemap.xml', function (request, response) {
    response.setHeader('Content-Type', 'application/xml');
    console.log('sitemap.xml visited!');

    let xml = `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <sitemap>
            <loc>${FEndUrl}/bangla-sitemap.xml</loc>
        </sitemap>
        <sitemap>
            <loc>${FEndUrl}/english-sitemap.xml</loc>
        </sitemap>`
    var todate = new Date()
    xml += `<sitemap>
        <loc>${FEndUrl}/bangla-sitemap/sitemap-daily-${todate.getFullYear()}-${todate.getMonth() < 9 ? '0' + (todate.getMonth() + 1) : todate.getMonth() + 1}-${todate.getDate() < 10 ? '0' + todate.getDate() : todate.getDate()}.xml</loc>
        <lastmod>${todate.toISOString()}</lastmod>
    </sitemap>
    <sitemap>
        <loc>${FEndUrl}/english-sitemap/sitemap-daily-${todate.getFullYear()}-${todate.getMonth() < 9 ? '0' + (todate.getMonth() + 1) : todate.getMonth() + 1}-${todate.getDate() < 10 ? '0' + todate.getDate() : todate.getDate()}.xml</loc>
        <lastmod>${todate.toISOString()}</lastmod>
    </sitemap>`
    todate.setHours(23, 59, 59, 999)
    for (let i = 0; i < 30; i++) {
        todate.setDate(todate.getDate() - 1)
        xml += `<sitemap>
            <loc>${FEndUrl}/bangla-sitemap/sitemap-daily-${todate.getFullYear()}-${todate.getMonth() < 9 ? '0' + (todate.getMonth() + 1) : todate.getMonth() + 1}-${todate.getDate() < 10 ? '0' + todate.getDate() : todate.getDate()}.xml</loc>
            <lastmod>${todate.toISOString()}</lastmod>
        </sitemap>
        <sitemap>
            <loc>${FEndUrl}/english-sitemap/sitemap-daily-${todate.getFullYear()}-${todate.getMonth() < 9 ? '0' + (todate.getMonth() + 1) : todate.getMonth() + 1}-${todate.getDate() < 10 ? '0' + todate.getDate() : todate.getDate()}.xml</loc>
            <lastmod>${todate.toISOString()}</lastmod>
        </sitemap>`
    }
    for (let i = 0; i < 70; i++) {
        xml += `<sitemap>
            <loc>${FEndUrl}/sitemap-bn/sitemap-bn-${i + 1}.xml</loc>
            <lastmod>${todate.toISOString()}</lastmod>
        </sitemap>`
    }
    for (let i = 0; i < 16; i++) {
        xml += `<sitemap>
            <loc>${FEndUrl}/sitemap-en/sitemap-en-${i + 1}.xml</loc>
            <lastmod>${todate.toISOString()}</lastmod>
        </sitemap>`
    }
    xml += `</sitemapindex>`;
    response.send(xml);
});
app.get('/bangla-news-sitemap.xml', async function (request, response) {
    console.log('bangla-news-sitemap visited!');
    response.setHeader('Content-Type', 'application/xml');

    const sql = `
        SELECT bn_contents.ContentID, 
               bn_contents.DetailsHeading, 
               bn_contents.URLAlies, 
               bn_contents.ImageBgPath, 
               bn_contents.ImageBgPathCaption, 
               DATE_FORMAT(bn_contents.created_at, "%Y-%m-%d") as fcreated_at,
               DATE_FORMAT(bn_contents.updated_at, "%Y-%m-%d") as fupdated_at,
               (SELECT bn_bas_categories.Slug 
                FROM bn_bas_categories 
                JOIN bn_category_contents ON bn_category_contents.CategoryID = bn_bas_categories.CategoryID 
                WHERE bn_category_contents.ContentID = bn_contents.ContentID 
                LIMIT 1) AS CategorySlug
        FROM bn_contents PARTITION (p5)
        JOIN bn_category_contents ON bn_contents.ContentID = bn_category_contents.ContentID 
        JOIN bn_bas_categories ON bn_category_contents.CategoryID = bn_bas_categories.CategoryID
        WHERE bn_contents.Deletable = 1 AND bn_contents.ShowContent = 1
        ORDER BY ContentID DESC LIMIT 500`;

    const escapeXml = (unsafe) => {
        return unsafe.replace(/[<>&'"]/g, function (c) {
            switch (c) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '&': return '&amp;';
                case '\'': return '&apos;';
                case '"': return '&quot;';
            }
        });
    };

    try {
        const result = await bnConfig.query(sql);

        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
                        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
                        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">`;

        if (result && result.length > 0) {
            for (let i = 0; i < result.length; i++) {
                const date = (result[i].fupdated_at && result[i].fupdated_at !== '0000-00-00')
                    ? result[i].fupdated_at
                    : result[i].fcreated_at;

                xml += `<url>
                    <loc>${FEndUrl}/${result[i].CategorySlug}/${result[i].ContentID}</loc>
                    <news:news>
                        <news:publication>
                            <news:name>দেশকালনিউজ</news:name>
                            <news:language>bn</news:language>
                        </news:publication>
                        <news:publication_date>${date}</news:publication_date>
                        <news:title>${escapeXml(result[i].DetailsHeading)}</news:title>
                    </news:news>
                </url>`;
            }
        }

        xml += `</urlset>`;
        response.send(xml);

    } catch (error) {
        console.error("Error while executing the query:", error.message || error);
        console.error("Error stack:", error.stack);

        response.status(500).send({
            error: true,
            message: 'Internal Server Error',
            details: error.message || 'Unknown error'
        });
    }
});
app.get('/:catSlug', async function (request, response) {
    let catSlug = request.params.catSlug;
    console.log('Category page visited!' + catSlug);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    let sql = `SELECT CategoryID, CategoryName, Remarks, DisplayCatName, Keywords FROM bn_bas_categories WHERE Slug=?`;

    try {
        const queryData = await bnConfig.query(sql, [catSlug]);
        if (queryData && queryData.length > 0) {
            let category = queryData[0];

            let title = category.CategoryName;
            let displayTitle = category.DisplayCatName || title;
            let description = category.Remarks || title;
            let keyword = category.Keywords || title.split(" ").toString();

            fs.readFile(filePath, 'utf8', async function (err, data) {
                if (err) {
                    return console.log(err);
                }
                // ✅ Set language for Bangla site
                data = data.replace(/\$HTML_LANG/g, "bn");
                // Replace meta placeholders
                data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
                data = data.replace(/\$OG_TITLE/g, `${displayTitle}`);
                data = data.replace(/\$OG_DESCRIPTION/g, `${description}`);
                data = data.replace(/\$OG_KEYWORDS/g, `${keyword}`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);

                // Full URL (ensure correct host/protocol)
                let fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);

                response.send(data);
            });
        }
        else {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                // ✅ Set language for Bangla site
                data = data.replace(/\$HTML_LANG/g, "bn");
                data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
                data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
                // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        }
    }
    catch (err) {
        console.log('contentDetails error');
        console.log(err);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            // ✅ Set language for Bangla site
            data = data.replace(/\$HTML_LANG/g, "bn");
            data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
            data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found - Something Went Wrong`);
            data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
            data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
            // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
            var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            data = data.replace(/\$OG_URL/g, `${fullUrl}`);
            response.send(data);
        });
    }
});
// new rss
app.get('/rss/rss.xml', async function (request, response) {
    response.setHeader("Content-Type", "application/xml; charset=utf-8");
    console.log('rss.xml visited!');

    try {
        const now = new Date();
        const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const curdate = `${weekdayNames[now.getDay()]}, ${now.getDate()} ${monthNames[now.getMonth()]} ${now.getFullYear()}`;

        // sitemap-style joins + CategorySlug subquery
        const sql = `
      SELECT 
        bn_contents.ContentID,
        bn_contents.ContentHeading,
        bn_contents.ContentBrief,
        bn_contents.ImageBgPath,
        bn_contents.URLAlies,
        bn_contents.created_at,
        bn_contents.updated_at,
        (
          SELECT bn_bas_categories.Slug
          FROM bn_bas_categories
          JOIN bn_category_contents 
            ON bn_category_contents.CategoryID = bn_bas_categories.CategoryID
          WHERE bn_category_contents.ContentID = bn_contents.ContentID
          LIMIT 1
        ) AS CategorySlug
      FROM bn_contents
      JOIN bn_category_contents 
        ON bn_contents.ContentID = bn_category_contents.ContentID
      JOIN bn_bas_categories 
        ON bn_category_contents.CategoryID = bn_bas_categories.CategoryID
      WHERE bn_contents.Deletable = 1
        AND bn_contents.ShowContent = 1
      ORDER BY bn_contents.ContentID DESC
      LIMIT 120
    `;

        const result = await bnConfig.query(sql); // same style as your sitemap

        if (result && result.length > 0) {
            let xml = `<rss xmlns:dc="http://purl.org/dc/elements/1.1/"
                       xmlns:content="http://purl.org/rss/1.0/modules/content/"
                       xmlns:atom="http://www.w3.org/2005/Atom"
                       xmlns:media="http://search.yahoo.com/mrss/"
                       xml:base="${FEndUrl}/"
                       version="2.0">
        <channel>
          <title><![CDATA[ দেশকালনিউজ.কম ]]></title>
          <description><![CDATA[ DeshKalNews.com:: দেশকালনিউজ.কম ]]></description>
          <link>${FEndUrl}/</link>
          <image>
            <url>${BEndUrl}/media/common/thumb.jpg</url>
            <title>DeshKalNews.com - RSS</title>
            <link>${FEndUrl}/</link>
          </image>
          <generator>RSS by DeshkalNews.com</generator>
          <lastBuildDate>${curdate}</lastBuildDate>
          <copyright><![CDATA[ Copyright: (C) দেশকালনিউজ.কম. ]]></copyright>
          <language><![CDATA[ bn ]]></language>
          <ttl>15</ttl>
          <atom:link href="${FEndUrl}/rss/rss.xml" rel="self" type="application/rss+xml"/>`;

            for (let i = 0; i < result.length; i++) {
                const row = result[i];
                const lastmod = row.updated_at || row.created_at;
                const pubDate = new Date(lastmod).toUTCString(); // RFC 822

                const title = row.ContentHeading ? row.ContentHeading.replace(/&/g, "&amp;") : "";
                const desc = row.ContentBrief ? row.ContentBrief.replace(/&/g, "&amp;") : "";

                xml += `<item>
          <title><![CDATA[ ${title} ]]></title>
          <description><![CDATA[ ${desc} ]]></description>
          <link>${FEndUrl}/${row.CategorySlug}/${row.ContentID}</link>
          <guid isPermaLink="true">${FEndUrl}/${row.CategorySlug}/${row.ContentID}</guid>
          <pubDate>${pubDate}</pubDate>
          <media:content medium="image" width="800" height="450" url="${CDNUrl}/media/${row.ImageBgPath}"/>
        </item>`;
            }

            xml += `</channel></rss>`;
            return response.send(xml);
        }

        return response.send('');
    } catch (error) {
        console.error("Error in RSS generation:", error);
        return response.status(500).send({
            error: true,
            message: 'Internal Server Error',
            details: error?.message || 'Unknown error'
        });
    }
}); // <— only ONE closer for the route

app.get('/rss/rssvideo.xml', function (request, response) {
    response.setHeader('Content-Type', 'application/xml');
    console.log('rssvideo.xml visited!');

    let date_ob = new Date();
    let weekdayname = ''
    let weekday = date_ob.getDay()
    if (weekday === 0) {
        weekdayname = 'Sun'
    } else if (weekday === 1) {
        weekdayname = 'Mon'
    } else if (weekday === 2) {
        weekdayname = 'Tue'
    } else if (weekday === 3) {
        weekdayname = 'Wed'
    } else if (weekday === 4) {
        weekdayname = 'Thu'
    } else if (weekday === 5) {
        weekdayname = 'Fri'
    } else if (weekday === 6) {
        weekdayname = 'Sat'
    }
    let day = date_ob.getDate()
    let monthname = ''
    let month = date_ob.getMonth()
    if (month === 0) {
        monthname = 'Jan'
    } else if (month === 1) {
        monthname = 'Feb'
    } else if (month === 2) {
        monthname = 'Mar'
    } else if (month === 3) {
        monthname = 'Apr'
    } else if (month === 4) {
        monthname = 'May'
    } else if (month === 5) {
        monthname = 'Jun'
    } else if (month === 6) {
        monthname = 'Jul'
    } else if (month === 7) {
        monthname = 'Aug'
    } else if (month === 8) {
        monthname = 'Sep'
    } else if (month === 9) {
        monthname = 'Oct'
    } else if (month === 10) {
        monthname = 'Nov'
    } else if (month === 11) {
        monthname = 'Dec'
    }
    let year = date_ob.getFullYear()
    let curdate = `${weekdayname}, ${day} ${monthname} ${year}`

    let sql = `SELECT WebTVID, WebTVHeading, WebTVLinkCode, SourceType, Remarks, created_at, updated_at FROM tv_webtvs WHERE Deletable=1 ORDER BY WebTVID DESC LIMIT 120`;
    dbConnMedia.getConnection(function (err, connection) {
        if (err) throw err; // not connected!

        connection.query(sql, function (error, result) {
            // When done with the connection, release it.
            connection.release();

            // Handle error after the release.
            if (error) throw error;

            if (result && result.length > 0) {
                let xml = `<?xml version="1.0" encoding="UTF-8"?>
                <rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dcterms="http://purl.org/dc/terms/">
                <channel>
                <title><![CDATA[ দেশকালনিউজ.কম ]]></title>
                <link>${FEndUrl}/</link>
                <description>DeshKalNews.com:: দেশকালনিউজ.কম</description>
                <image>
                    <url>${BEndUrl}/media/common/thumb.jpg</url>
                    <title>DeshKalNews.com- Video Gallery - RSS</title>
                    <link>${FEndUrl}/</link>
                </image>
                <generator>RSS by DeshKalNews.com</generator>
                <lastBuildDate>${curdate}</lastBuildDate>
                <copyright>
                    <![CDATA[ Copyright: (C) দেশকালনিউজ.কম. ]]>
                </copyright>
                <language>
                    <![CDATA[ bn ]]>
                </language>
                <ttl>15</ttl>
                <atom:link href="${FEndUrl}/rss/rssvideo.xml" rel="self" type="application/rss+xml"/>`;
                for (let i = 0; i < result.length; i++) {
                    let date = '';
                    if (result[i].updated_at && result[i].updated_at != '0000-00-00 00:00:00') {
                        date = result[i].updated_date;
                    } else {
                        date = result[i].create_date;
                    }

                    xml += `<item xmlns:media="http://search.yahoo.com/mrss/" xmlns:dcterms="http://purl.org/dc/terms/">
                        <link>${FEndUrl}/videos/${result[i].Slug}/${result[i].WebTVID}</link>
                        <media:content medium="video" isDefault="true">
                            <media:player url="${result[i].SourceType == 1 ? "https://www.youtube.com/embed/" + result[i].WebTVLinkCode + "?autoplay=1" : result[i].SourceType == 2 ? "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebookapp%2Fvideos%2F" + result[i].WebTVLinkCode + "%2F&show_text=0&width=560" : result[i].SourceType == 3 ? "https://player.vimeo.com/video/" + result[i].WebTVLinkCode : ''}" />
                            <media:title>${result[i].WebTVHeading}</media:title>
                            <media:description>${result[i].Remarks ? result[i].Remarks : result[i].WebTVHeading}</media:description>
                            <media:thumbnail url="https://img.youtube.com/vi/${result[i].WebTVLinkCode}/0.jpg" height="360" width="480"/>
                        </media:content>
                        <media:restriction relationship="allow" type="country">us ca</media:restriction>
                        <dcterms:valid xmlns:dcterms="http://purl.org/dc/terms/">start=${date}; scheme=W3C-DTF</dcterms:valid>
                    </item>`

                    if (i === result.length - 1) {
                        xml += `</channel>
                        </rss>`;
                        response.send(xml);
                    }
                }
            }
            else {
                response.send('');
            }
        });
    });
});
app.get('/sitemap-video/:sitemap', async function (request, response) {
    let sitemap = request.params.sitemap;
    console.log(`sitemap-video/${sitemap} visited!`);


    if (!sitemap || !sitemap.includes("sitemap-video-")) {
        return response.status(400).send({ error: true, message: 'Invalid Sitemap Request' });
    }

    let pageStr = sitemap.replace('sitemap-video-', '').replace('.xml', '');
    let page = parseInt(pageStr);

    if (isNaN(page) || page < 1) {
        return response.status(400).send({ error: true, message: 'Invalid Page Number' });
    }

    let offset = ((page - 1) / 2) * 10000;
    response.setHeader('Content-Type', 'application/xml');

    let sql = `
        SELECT 
            WebTVID, WebTVHeading, WebTVLinkCode, SourceType, Remarks, 
            created_at, updated_at 
        FROM tv_webtvs 
        WHERE Deletable = 1 
        ORDER BY WebTVID ASC 
        LIMIT 5000 OFFSET ?
    `;

    try {
        // Execute query using mediaConfig connection pool
        const result = await mediaConfig.query(sql, [offset]);

        console.log("Videos fetched:", result.length);

        // Build XML
        let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`;

        if (result && result.length > 0) {
            for (const video of result) {
                let lastmod = (video.updated_at && video.updated_at !== '0000-00-00 00:00:00')
                    ? video.updated_at
                    : video.created_at;
                let moddate = isNaN(new Date(lastmod)) ? new Date() : new Date(lastmod);

                let videoUrl = '';
                if (video.SourceType == 1) {
                    videoUrl = `https://www.youtube.com/embed/${video.WebTVLinkCode}?autoplay=1`;
                } else if (video.SourceType == 2) {
                    videoUrl = `https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebookapp%2Fvideos%2F${video.WebTVLinkCode}%2F&show_text=0&width=560`;
                } else if (video.SourceType == 3) {
                    videoUrl = `https://player.vimeo.com/video/${video.WebTVLinkCode}`;
                }

                xml += `
<url>
    <loc>${FEndUrl}/videos/${video.WebTVID}</loc>
    <video:video>
        <video:thumbnail_loc>https://img.youtube.com/vi/${video.WebTVLinkCode}/0.jpg</video:thumbnail_loc>
        <video:title><![CDATA[${video.WebTVHeading}]]></video:title>
        <video:description><![CDATA[${video.Remarks || video.WebTVHeading}]]></video:description>
        <video:player_loc>${videoUrl}</video:player_loc>
        <video:publication_date>${moddate.toISOString()}</video:publication_date>
        <video:family_friendly>yes</video:family_friendly>
        <video:live>no</video:live>
    </video:video>
</url>`;
            }
        }

        xml += `\n</urlset>`;
        response.send(xml);

    } catch (error) {
        console.error("Error generating sitemap-video:", error.message || error);
        console.error("Stack trace:", error.stack);
        response.status(500).send({
            error: true,
            message: 'Internal Server Error',
            details: error.message || 'Unknown error'
        });
    }
});
app.get('/bangla-sitemap/:dailysitemap', async function (request, response) {
    console.log('bangla-sitemap/dailysitemap visited!');

    let dailysitemap = request.params.dailysitemap;

    if (!dailysitemap || !dailysitemap.includes("sitemap-daily-")) {
        return response.status(400).send({ error: true, message: 'Invalid Sitemap Request' });
    }

    let date = dailysitemap.replace('sitemap-daily-', '').replace('.xml', '');
    let datearr = date.split("-");
    let date_ob = new Date(date);

    // Validate the date
    if (!isNaN(date_ob) && datearr.length === 3 && datearr[0].length === 4 && datearr[1].length === 2 && datearr[2].length === 2) {
        response.setHeader('Content-Type', 'application/xml');

        let sql = `
            SELECT bn_contents.ContentID, 
       bn_contents.DetailsHeading, 
       bn_contents.URLAlies, 
       bn_contents.ImageBgPath, 
       bn_contents.ImageBgPathCaption, 
       bn_contents.created_at, 
       bn_contents.updated_at,
       ( SELECT bn_bas_categories.Slug FROM bn_bas_categories JOIN bn_category_contents ON bn_category_contents.CategoryID = bn_bas_categories.CategoryID WHERE bn_category_contents.ContentID = bn_contents.ContentID LIMIT 1 ) AS CategorySlug
       FROM bn_contents JOIN bn_category_contents ON bn_contents.ContentID = bn_category_contents.ContentID JOIN bn_bas_categories ON bn_category_contents.CategoryID = bn_bas_categories.CategoryID
       WHERE bn_contents.Deletable=1 AND bn_contents.ShowContent=1 AND DATE(bn_contents.created_at) = ?`;

        try {
            // Execute query using the connection pool
            const result = await bnConfig.query(sql, [date]);

            // Construct XML response
            let xml = `<urlset xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" 
                            xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" 
                            xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

            if (result && result.length > 0) {
                for (let i = 0; i < result.length; i++) {
                    let lastmoddate = result[i].updated_at || result[i].created_at;
                    let moddate = new Date(lastmoddate);

                    xml += `<url>
    <loc>${FEndUrl}/${result[i].CategorySlug}/${result[i].ContentID}</loc>
    <image:image>
        <image:loc>${CDNUrl}/${result[i].ImageBgPath}</image:loc>
        <image:caption>
            <![CDATA[ ${(result[i].ImageBgPathCaption ? result[i].ImageBgPathCaption.replace("&", "&amp;") : "")} ]]>
        </image:caption>
    </image:image>
    <changefreq>hourly</changefreq>
    <lastmod>${moddate.toISOString()}</lastmod>
</url>`;
                }
            }

            xml += `</urlset>`;

            // Send the XML response
            response.send(xml);
        } catch (error) {
            // Log the exact error to understand why it's failing
            console.error("Error while executing the query:", error.message || error);
            console.error("Error stack:", error.stack);

            response.status(500).send({
                error: true,
                message: 'Internal Server Error',
                details: error.message || 'Unknown error'
            });
        }
    } else {
        return response.status(400).send({ error: true, message: 'Invalid Date Format' });
    }
});

app.get('/search/:searchSlug', function (request, response) {
    console.log('Search page visited!');
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', async function (err, data) {
        if (err) {
            return console.log(err);
        }
        // ✅ Set language for Bangla site
        data = data.replace(/\$HTML_LANG/g, "bn");
        data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
        data = data.replace(/\$OG_TITLE/g, 'খুঁজুন | খুঁজুন সর্বশেষ খবর :: দেশকালনিউজ.কম');
        data = data.replace(/\$OG_DESCRIPTION/g, "খুঁজুন | খুঁজুন সর্বশেষ খবর :: দেশকালনিউজ.কম");
        data = data.replace(/\$OG_KEYWORDS/g, "দেশকালনিউজ, পত্রিকা, বাংলাদেশ, আজকের পত্রিকা, জাতীয়, সারাদেশ, বরিশাল, চট্টগ্রাম, ঢাকা,খুলনা, রাজশাহী, সিলেট, রংপুর, ময়মনসিংহ, রাজধানী, আন্তর্জাতিক, রাজনীতি, বিনোদন , দেশি, বিদেশি, খেলা, ক্রিকেট, বিশ্বকাপ ক্রিকেট, বিশেষ কলাম, অর্থনীতি, ধর্ম, লাইফস্টাইল, ফ্যাশন, রেসিপি, সাত রঙ, সাতরঙ,  দূরবীন, প্রথম প্রহর, বইমেলা, তথ্যপ্রযুক্তি, শিক্ষাঙ্গন, আইন-আদালত, আইন আদালত, শিল্প ও সাহিত্, শিল্প সাহিত্, স্বাস্থ্য ও চিকিৎসা, স্বাস্থ্য চিকিৎসা, ফিচার, বিজ্ঞান, ভ্রমণ, মুক্তকথা, মুখোমুখি, প্রবাস জীবন, জব কর্নার, জব, মজার খবর, কার্টুন, সোশ্যাল মিডিয়া, সাইবার স্পেস, আর্কাইভ, সাহিত্য, কম্পিউটার, মোবাইল ফোন, গেমস, সরকার, অপরাধ, আইন ও বিচার, পরিবেশ, দুর্ঘটনা, সংসদ, রাজধানী, শেয়ার বাজার, বাণিজ্য, পোশাক শিল্প, ফুটবল, সকাল, বিকাল");
        data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
        // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        response.send(data);
    });
});
app.get('/tags/:TagTitle', async function (request, response) {
    let TagTitle = request.params.TagTitle;
    console.log('Tags page visited!' + TagTitle);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    let sql = `SELECT TagID, TagName FROM bn_tags WHERE TagName=?`;
    try {
        const queryData = await bnConfig.query(sql, [TagTitle]);

        if (queryData && queryData.length > 0) {
            let title = queryData[0].TagName;
            let keyword = title.split(" ");
            keyword = keyword.toString();
            fs.readFile(filePath, 'utf8', async function (err, data) {
                if (err) {
                    return console.log(err);
                }
                // ✅ Set language for Bangla site
                data = data.replace(/\$HTML_LANG/g, "bn");
                data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
                data = data.replace(/\$OG_TITLE/g, `${title}`);
                data = data.replace(/\$OG_DESCRIPTION/g, `${title}`);
                data = data.replace(/\$OG_KEYWORDS/g, `${keyword}`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
                // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        } else {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
                data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
                // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        }
    } catch (err) {
        console.log('contentDetails error');
        console.log(err);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
            data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
            // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
            var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            data = data.replace(/\$OG_URL/g, `${fullUrl}`);
            response.send(data);
        });
    }
});

app.get('/writers/:WriterSlug', async function (request, response) {
    let WriterSlug = request.params.WriterSlug;
    console.log('Writers page visited!' + WriterSlug);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    let sql = `SELECT WriterID, WriterName FROM bn_writers WHERE Slug=?`;
    try {
        const queryData = await bnConfig.query(sql, [WriterSlug]);

        if (queryData && queryData.length > 0) {
            let title = queryData[0].WriterName;
            let keyword = title.split(" ");
            keyword = keyword.toString();
            fs.readFile(filePath, 'utf8', async function (err, data) {
                if (err) {
                    return console.log(err);
                }
                // ✅ Set language for Bangla site
                data = data.replace(/\$HTML_LANG/g, "bn");
                data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
                data = data.replace(/\$OG_TITLE/g, `${title}`);
                data = data.replace(/\$OG_DESCRIPTION/g, `${title}`);
                data = data.replace(/\$OG_KEYWORDS/g, `${keyword}`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
                // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        } else {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
                data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
                // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        }
    }
    catch (err) {
        console.log('contentDetails error');
        console.log(err);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
            data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
            // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
            var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            data = data.replace(/\$OG_URL/g, `${fullUrl}`);
            response.send(data);
        });
    }
});
app.get('/divisions/:divisionSlug', async function (request, response) {
    let divisionSlug = request.params.divisionSlug;
    console.log('Division page visited!' + divisionSlug);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    let sql = `SELECT DivisionID, DivisionNameBn, DivisionName FROM bas_divisions WHERE DivisionSlug=?`;
    try {
        const queryData = await bnConfig.query(sql, [divisionSlug]);

        if (queryData && queryData.length > 0) {
            let title = queryData[0].DivisionName;
            let keyword = title.split(" ");
            keyword = keyword.toString();
            fs.readFile(filePath, 'utf8', async function (err, data) {
                if (err) {
                    return console.log(err);
                }
                // ✅ Set language for Bangla site
                data = data.replace(/\$HTML_LANG/g, "bn");
                data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
                data = data.replace(/\$OG_TITLE/g, `${title}`);
                data = data.replace(/\$OG_DESCRIPTION/g, `${title}`);
                data = data.replace(/\$OG_KEYWORDS/g, `${keyword}`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
                // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        } else {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
                data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
                // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        }
    }
    catch (err) {
        console.log('contentDetails error');
        console.log(err);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
            data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
            // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
            var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            data = data.replace(/\$OG_URL/g, `${fullUrl}`);
            response.send(data);
        });
    }
});
app.get('/videos/:vdoID', async function (request, response) {
    let vdoID = request.params.vdoID;
    console.log('video details page visited!' + vdoID);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    let sql = `SELECT tv_webtvs.WebTVHeading, tv_webtvs.WebTVLinkCode FROM tv_webtvs WHERE tv_webtvs.WebTVID=? LIMIT 1`;
    // let sql = `SELECT tv_webtvs.*, tv_webtv_categories.Slug catSlug FROM tv_webtvs JOIN tv_webtv_categories ON tv_webtv_categories.CategoryID=tv_webtvs.CategoryID WHERE tv_webtvs.WebTVID=? LIMIT 1`;
    try {
        const queryData = await mediaConfig.query(sql, [vdoID]);

        if (queryData && queryData.length > 0) {
            let title = queryData[0].WebTVHeading;
            let keyword = title.split(" ");
            keyword = keyword.toString();
            let description = queryData[0].WebTVHeading;
            let image = queryData[0].WebTVLinkCode;
            fs.readFile(filePath, 'utf8', async function (err, data) {
                if (err) {
                    return console.log(err);
                }
                // ✅ Set language for Bangla site
                data = data.replace(/\$HTML_LANG/g, "bn");
                data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
                data = data.replace(/\$OG_TITLE/g, `${title}`);
                data = data.replace(/\$OG_DESCRIPTION/g, `${description}`);
                data = data.replace(/\$OG_KEYWORDS/g, `${keyword}`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
                data = data.replace(/\$OG_IMAGE/g, `https://img.youtube.com/vi/${image}/0.jpg`);
                // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        } else {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
                data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
                // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        }
    } catch (err) {
        console.log('contentDetails error');
        console.log(err);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
            data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found - Something Went Wrong`);
            data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
            data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
            // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
            var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            data = data.replace(/\$OG_URL/g, `${fullUrl}`);
            response.send(data);
        });
    }
});
// Event Page SSR

app.get('/events/:EventSlug', async function (request, response) {
    let EventSlug = request.params.EventSlug;
    console.log('Events page visited in Bangla site!' + EventSlug);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    let sql = `SELECT EventID, EventTitle FROM bn_events WHERE Slug=?`;
    try {
        const queryData = await bnConfig.query(sql, [EventSlug]);

        if (queryData && queryData.length > 0) {
            let title = queryData[0].EventTitle;
            let keyword = title.split(" ");
            keyword = keyword.toString();
            fs.readFile(filePath, 'utf8', async function (err, data) {
                if (err) {
                    return console.log(err);
                }
                // ✅ Set language for Bangla site
                data = data.replace(/\$HTML_LANG/g, "bn");
                data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
                data = data.replace(/\$OG_TITLE/g, `${title}`);
                data = data.replace(/\$OG_DESCRIPTION/g, `${title}`);
                data = data.replace(/\$OG_KEYWORDS/g, `${keyword}`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
                // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        } else {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
                data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
                // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        }
    } catch (err) {
        console.log('Ëvent Page error');
        console.log(err);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
            data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found - Something Went Wrong`);
            data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
            data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
            // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
            var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            data = data.replace(/\$OG_URL/g, `${fullUrl}`);
            response.send(data);
        });
    }
});

app.get('/photo/:photoID', async function (request, response) {
    let photoID = request.params.photoID;
    console.log('Photo Feature Detail page visited!' + photoID);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    // let sql = `SELECT photo_features.PhotoFeatureID, photo_features.PhotoFeatureTitle, photo_features.ShortBrief, ImageBgPath FROM photo_features WHERE photo_features.Deletable=1 AND photo_features.PhotoFeatureID=? LIMIT 1;`;
    let sql = `SELECT bn_content_albums.Title, bn_content_photo_galleries.ImagePath FROM bn_content_albums LEFT JOIN bn_content_photo_galleries ON bn_content_photo_galleries.AlbumID=bn_content_albums.AlbumID WHERE bn_content_albums.Deletable!=1 AND bn_content_albums.AlbumID=? LIMIT 1;`;
    try {
        const queryData = await bnConfig.query(sql, [photoID]);

        if (queryData && queryData.length > 0) {
            let title = queryData[0].Title;
            let description = queryData[0].Title;
            // if (!description) {
            //     description = title
            // } else {
            //     description = (queryData[0].Title).replace(/(<([^>]+)>)/ig, '')
            // }
            let image = '';
            if (queryData[0].ImagePath) {
                image = queryData[0].ImagePath
            } else {
                image = 'common/thumb.jpg'
            }
            let keyword = '';
            keyword = title.split(" ");
            keyword = keyword.toString();
            fs.readFile(filePath, 'utf8', async function (err, data) {
                if (err) {
                    return console.log(err);
                }
                // ✅ Set language for Bangla site
                data = data.replace(/\$HTML_LANG/g, "bn");
                data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
                data = data.replace(/\$OG_TITLE/g, `${title}`);
                data = data.replace(/\$OG_DESCRIPTION/g, `${description}`);
                data = data.replace(/\$OG_KEYWORDS/g, `${keyword}`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
                data = data.replace(/\$OG_IMAGE/g, `${CDNUrl}/media/${image}`);
                // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                data = data.replace(/\$AMP_URL/g, '');
                response.send(data);
            });
        } else {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
                data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
                // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                data = data.replace(/\$AMP_URL/g, '');
                response.send(data);
            });
        }
    } catch (err) {
        console.log('contentDetails error');
        console.log(err);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
            data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found - Something Went Wrong`);
            data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
            data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
            // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
            var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            data = data.replace(/\$OG_URL/g, `${fullUrl}`);
            data = data.replace(/\$AMP_URL/g, '');
            response.send(data);
        });
    }
});

app.get('/:catSlug/sub/:subCatSlug', async function (request, response) {
    let catSlug = request.params.catSlug;
    let subCatSlug = request.params.subCatSlug;
    console.log('sub Category page visited! ' + catSlug + '/' + subCatSlug);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    // let sql = `SELECT bn_bas_categories.CategoryID subCatID, bn_bas_categories.CategoryName subCatTitle FROM bn_bas_categories WHERE bn_bas_categories.Slug=? AND bn_bas_categories.ParentID!=0`;
    let sql = `SELECT a.CategoryID subCatID, a.CategoryName subCatTitle FROM bn_bas_categories a JOIN bn_bas_categories b ON a.ParentID=b.CategoryID WHERE a.Slug=? AND b.Slug=? AND a.ParentID!=0;`;
    try {
        const queryData = await bnConfig.query(sql, [subCatSlug, catSlug]);
        if (queryData && queryData.length > 0) {
            let title = queryData[0].subCatTitle;
            let keyword = title.split(" ");
            keyword = keyword.toString();
            fs.readFile(filePath, 'utf8', async function (err, data) {
                if (err) {
                    return console.log(err);
                }
                // ✅ Set language for Bangla site
                data = data.replace(/\$HTML_LANG/g, "bn");
                data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
                data = data.replace(/\$OG_TITLE/g, `${title}`);
                data = data.replace(/\$OG_DESCRIPTION/g, `${title}`);
                data = data.replace(/\$OG_KEYWORDS/g, `${keyword}`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
                // var fullUrl = request.protocol + '://' + request.get('host') + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        } else {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
                data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
                // var fullUrl = request.protocol + '://' + request.get('host') + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        }
    } catch (err) {
        console.log('contentDetails error');
        console.log(err);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
            data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found - Something Went Wrong`);
            data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
            data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
            // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
            var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            data = data.replace(/\$OG_URL/g, `${fullUrl}`);
            response.send(data);
        });
    }
});
app.get('/:catSlug/:id', async function (request, response) {
    let catSlug = request.params.catSlug;
    let id = request.params.id;
    console.log('Detail page visited!' + catSlug + ' ' + id);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    // let sql = `SELECT bn_contents.ContentID, bn_contents.CategoryIDs, bn_contents.ContentHeading, bn_contents.ContentBrief, bn_contents.ImageBgPath, bn_contents.URLAlies, bn_contents.Keywords, bn_contents.PlateType, bn_contents.ImagePlatePath FROM bn_contents WHERE bn_contents.ContentID=? AND bn_contents.ShowContent=1 AND bn_contents.Deletable=1`;
    let sql = `SELECT bn_contents.ContentID, bn_bas_categories.CategoryID, bn_contents.DetailsHeading, bn_contents.ContentBrief, bn_contents.ImageBgPath, bn_contents.URLAlies, bn_contents.Keywords, bn_contents.PlateType, bn_contents.ImagePlatePath FROM bn_contents JOIN bn_category_contents ON bn_category_contents.ContentID=bn_contents.ContentID JOIN bn_bas_categories ON bn_bas_categories.CategoryID=bn_category_contents.CategoryID WHERE bn_contents.ContentID=? AND bn_bas_categories.Slug=? AND bn_contents.ShowContent=1 AND bn_contents.Deletable=1;`;

    try {
        const contentDetails = await bnConfig.query(sql, [id, catSlug]);
        if (contentDetails && contentDetails.length > 0) {
            let title = contentDetails[0].DetailsHeading;
            let description = contentDetails[0].ContentBrief;
            if (!description) {
                description = title
            } else {
                description = (contentDetails[0].ContentBrief).replace(/(<([^>]+)>)/ig, '')
            }
            let image = '';
            if (contentDetails[0].PlateType > 0) {
                image = contentDetails[0].ImagePlatePath;
            } else {
                image = contentDetails[0].ImageBgPath
            }
            let keyword = '';
            if (contentDetails[0].Keywords) {
                keyword = contentDetails[0].Keywords
            } else {
                keyword = title.split(" ");
                keyword = keyword.toString();
            }
            fs.readFile(filePath, 'utf8', async function (err, data) {
                if (err) {
                    return console.log(err);
                }
                // ✅ Set language for Bangla site
                data = data.replace(/\$HTML_LANG/g, "bn");
                data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
                data = data.replace(/\$OG_TITLE/g, `${title}`);
                data = data.replace(/\$OG_DESCRIPTION/g, `${description}`);
                data = data.replace(/\$OG_KEYWORDS/g, `${keyword}`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
                data = data.replace(/\$OG_IMAGE/g, `${CDNUrl}/media/${image}`);
                // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        } else {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                // ✅ Set language for Bangla site
                data = data.replace(/\$HTML_LANG/g, "bn");
                data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
                data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
                // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        }
    }
    catch (err) {
        console.log('contentDetails error');
        console.log(err);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            // ✅ Set language for Bangla site
            data = data.replace(/\$HTML_LANG/g, "bn");
            data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
            data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found - Something Went Wrong`);
            data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
            data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
            // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
            var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            data = data.replace(/\$OG_URL/g, `${fullUrl}`);
            response.send(data);
        });
    }
});
app.get('/divisions/:divisionSlug/:districtSlug', async function (request, response) {
    let divisionSlug = request.params.divisionSlug;
    let districtSlug = request.params.districtSlug;
    console.log('District page visited!' + divisionSlug + ' ' + districtSlug);
    const filePath = path.resolve(__dirname, './build', 'index.html');

    let sql = `SELECT bas_districts.DistrictID, bas_districts.DistrictNameBN FROM bas_districts WHERE bas_districts.DistrictSlug=?`;
    try {
        const queryData = await bnConfig.query(sql, [districtSlug]);

        if (queryData && queryData.length > 0) {
            let title = queryData[0].DistrictNameBN;
            let keyword = title.split(" ");
            keyword = keyword.toString();
            fs.readFile(filePath, 'utf8', async function (err, data) {
                if (err) {
                    return console.log(err);
                }
                // ✅ Set language for Bangla site
                data = data.replace(/\$HTML_LANG/g, "bn");
                data = data.replace(/\$OG_ROBOTS/g, `index, follow`);
                data = data.replace(/\$OG_TITLE/g, `${title}`);
                data = data.replace(/\$OG_DESCRIPTION/g, `${title}`);
                data = data.replace(/\$OG_KEYWORDS/g, `${keyword}`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
                // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        } else {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                // ✅ Set language for Bangla site
                data = data.replace(/\$HTML_LANG/g, "bn");
                data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
                data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
                data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
                data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
                data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
                // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
                var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
                data = data.replace(/\$OG_URL/g, `${fullUrl}`);
                response.send(data);
            });
        }
    } catch (err) {
        console.log('contentDetails error');
        console.log(err);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            // ✅ Set language for Bangla site
            data = data.replace(/\$HTML_LANG/g, "bn");
            data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
            data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found - Something Went Wrong`);
            data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found - Something Went Wrong`);
            data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
            data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
            // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
            var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
            data = data.replace(/\$OG_URL/g, `${fullUrl}`);
            response.send(data);
        });
    }
});
app.use(express.static(path.resolve(__dirname, './build')));
// app.use('/amp', express.static(path.resolve(__dirname, './buildAmp')))


app.get('*', function (request, response) {
    const filePath = path.resolve(__dirname, './build', 'index.html');
    // response.sendFile(filePath);

    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        // ✅ Set language for Bangla site
        data = data.replace(/\$HTML_LANG/g, "bn");

        data = data.replace(/\$OG_ROBOTS/g, `noindex, nofollow`);
        data = data.replace(/\$OG_TITLE/g, `404 - Nothing Found`);
        data = data.replace(/\$OG_DESCRIPTION/g, `404 - Nothing Found`);
        data = data.replace(/\$OG_KEYWORDS/g, `404, Nothing Found`);
        data = data.replace(/\$AUTHOR/g, "DeshKalNews :: দেশকালনিউজ.কম");
        data = data.replace(/\$OG_IMAGE/g, `${BEndUrl}/media/common/thumb.jpg`);
        // var fullUrl = request.protocol + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        // var fullUrl = request.get('x-forwarded-proto') + '://' + request.get('X-Forwarded-Host') + (request.originalUrl).replace(/\/+$/, '');
        var fullUrl = request.get('x-forwarded-proto') + '://' + request.hostname + (request.originalUrl).replace(/\/+$/, '');
        data = data.replace(/\$OG_URL/g, `${fullUrl}`);
        data = data.replace(/\$AMP_URL/g, '');
        response.send(data);
    });
});

// // =========datebase connection close=======
// dbConn.end();
// dbConnMedia.end();

httpServer.listen(FEndPort, function () {
    console.log('Node app is running on port ' + FEndPort);
});
// httpsServer.listen(3400, function () {
//     console.log('Node app is running on port 3400');
// });

module.exports = app;