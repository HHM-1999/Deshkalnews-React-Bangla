function ForLazyLoaderImg(lazyloaded) {
    if (!lazyloaded) {
        var images = document.querySelectorAll('.DImgZoomBlock picture img')
        var images2 = document.querySelectorAll('div.Imgresize img')
        var images3 = document.querySelectorAll('.DTopImg img.img-fluid.img100')
        var images4 = document.querySelectorAll('.DetailsPF img')
        let imageOptions = {}
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const image = entry.target
                // console.log(image);
                const newURL = image.getAttribute('data-src')
                image.src = newURL
                observer.unobserve(image)
            })
        }, imageOptions)
        images.forEach((image) => {
            observer.observe(image)
        })
        images2.forEach((image) => {
            observer.observe(image)
        })
        images3.forEach((image) => {
            observer.observe(image)
        })
        images4.forEach((image) => {
            observer.observe(image)
        })
        lazyloaded = true
    }
}


const scrollTop = (e) => {
    if (!e.ctrlKey) {
        setTimeout(function () {
            window.scrollTo({ top: 0, behavior: 'auto' });
        }, 100);
    }
};


const getTimeDistance = (date) => {
    // console.log(date);
    let publishDateTime = date.replace(/-/g, '/');
    let publishTime = new Date(publishDateTime);
    let now = new Date();
    var diff = new Date(now - publishTime);
    var days = parseInt(diff / 1000 / 60 / 60 / 24);
    var hours = parseInt(diff / 1000 / 60 / 60);
    var minutes = parseInt(diff / 1000 / 60);
    var seconds = parseInt(diff / 1000);
    if (days >= 1) {
        days = banglaDateConvetar(days.toString())
        return days + ' দিন আগে';
    }
    else if (hours >= 1) {
        hours = banglaDateConvetar(hours.toString())
        return hours + ' ঘন্টা আগে';
    }
    else if (minutes >= 1) {
        minutes = banglaDateConvetar(minutes.toString())
        return minutes + ' মিনিট আগে';
    }
    else {
        seconds = banglaDateConvetar(seconds.toString())
        return seconds + ' সেকেন্ড আগে';
    }
}
function formatDateToBengali(dateStr) {
   
    const monthsBengali = [
        'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
        'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ];

   
    const daysBengali = [
        'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার',
        'শুক্রবার', 'শনিবার'
    ];

    
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];


    function toBengaliDigits(num) {
        return num.toString().split('').map(digit => bengaliDigits[parseInt(digit)]).join('');
    }

 
    const date = new Date(dateStr);

   
    const dayOfWeek = daysBengali[date.getDay()];
    const dayOfMonth = toBengaliDigits(date.getDate());
    const month = monthsBengali[date.getMonth()];
    const year = toBengaliDigits(date.getFullYear());
    
   
    let hours = date.getHours();
    let minutes = date.getMinutes();

    
    const period = hours >= 12 ? 'বিকেল' : 'সকাল';
    hours = hours % 12;
    hours = hours ? hours : 12;  // Convert 0 to 12
    minutes = toBengaliDigits(minutes < 10 ? '0' + minutes : minutes);

    const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month} ${year}, ${toBengaliDigits(hours)}:${minutes} `;
    return formattedDate;
}


function banglaDateConvetar(engDate) {
    var mapObj = {
        1: "১",
        2: "২",
        3: "৩",
        4: "৪",
        5: "৫",
        6: "৬",
        7: "৭",
        8: "৮",
        9: "৯",
        0: "০",
        January: "জানুয়ারি",
        February: "ফেব্রুয়ারি",
        March: "মার্চ",
        April: "এপ্রিল",
        May: "মে",
        June: "জুন",
        July: "জুলাই",
        August: "আগস্ট",
        September: "সেপ্টেম্বর",
        October: "অক্টোবর",
        November: "নভেম্বর",
        December: "ডিসেম্বর",
        am: "সকাল",
        pm: "দুপুর",
        Saturday: "শনিবার",
        Sunday: "রোববার",
        Monday: "সোমবার",
        Tuesday: "মঙ্গলবার",
        Wednesday: "বুধবার",
        Thursday: "বৃহস্পতিবার",
        Friday: "শুক্রবার",
        'جمادى الأولى': "জামাদিউল আউয়াল",
        'جمادى الآخرة': "জামাদিউছ ছানি",
        'رجب': "রজব",
        'شعبان': "শা’বান",
        'رمضان': "রমজান",
        'شوال': "শাওয়াল",
        'ذو القعدة': "জুল কাইদাহ",
        'ذو الحجة': "জুল হিজ্জাহ",
        'محرم ': "মুহররম ",
        'صفر': "সফর",
        'ربيع الأول': "রবিউল আউয়াল",
        'ربيع الثاني': "রবিউছ ছানি",
    };
    let replaceString = /1|2|3|4|5|6|7|8|9|0|January|February|March|April|May|June|July|August|September|October|November|December|am|pm|Saturday|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|جمادى الأولى|جمادى الآخرة|رجب|شعبان|رمضان|شوال|ذو القعدة|ذو الحجة|محرم |ربيع الأول|صفر|ربيع الثاني/gi;
    engDate = engDate.replace(replaceString, function (matched) {
        return mapObj[matched];
    });
    return (engDate)
}
const getTimeDistanceEn = (date) => {
    const publishTime = new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor((now - publishTime) / 1000);

    const seconds = diffInSeconds % 60;
    console.log("seconds = ", seconds)
    const minutes = Math.floor(diffInSeconds / 60) % 60;
    const hours = Math.floor(diffInSeconds / 3600) % 24;
    const days = Math.floor(diffInSeconds / 86400);

    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } 
    if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } 
    if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } 
    if (seconds > 0) {
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }

    return "Just now";
};
function formatTimestamp(timestamp) {
    const dateObj = new Date(timestamp);
    
    // Extract time
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    
    // Extract date components
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();
    
    // Construct the formatted string
    return `${hours}:${minutes}, ${day} ${month} ${year}`;
}

// Example usage
// console.log(formatTimestamp(timestamp));
// Output: "11:40, 12 January 2025"

export {
    ForLazyLoaderImg,
    scrollTop,
    getTimeDistance,
    banglaDateConvetar,
    formatDateToBengali,
    getTimeDistanceEn,
    formatTimestamp
}
