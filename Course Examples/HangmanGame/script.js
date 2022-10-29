const word_el = document.getElementById('word');
const popup = document.getElementById('popup-container');
const message_el = document.getElementById('success-message');
const wrongLetters_el = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const PlayAgainBtn = document.getElementById('play-again');
var playControl = true;
const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();

//Dizi içerisine girdiğimiz değerler için rastgele bir sayı üretip o değeri geri döndürüyoruz
function getRandomWord() {
    const words = ["javascript", "java", "python", "css", "html", "assembly", "go", "bootstrap", "git"];
    return words[Math.floor(Math.random() * words.length)];
}
//Boşluklara kelime getirme kısmı
function displayWord() {
    //Html kısmında verdiğmiz word kısmının içini doldurma kısmı  
    //1.Seçilen kelimeyi harf harf bölerek ona bir mapping uyguluyoruz her eleman için html kısmına yeni bir harf kısmı ekliyoruz
    //2.Ternary operation ile correctLetters dizisinin o harfi içerip içermediğini kontrol ediyor içeriyorsa harfi içermiyorsa boş döndürüyoruz
    //3.join ile her karakter kısmına yerleştirme yapıyoruz
    word_el.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </div>
        `).join('')}    
    `;
    //Alt alta sıralanan harflerimizi yanyana birleştirmek için new-line kısımlarını siliyoruz
    const w = word_el.innerText.replace(/\n/g, '');
    //Seçilen kelime ile yazılan kelime aynıysa oyunu kazandığımızı bildiren bir mesaj gönderiyoruz
    if (w === selectedWord) {
        popup.style.display = 'flex';
        popup.lastElementChild.style.backgroundColor = 'green'
        message_el.innerText = 'Tebrikler kazandınız.';
    }
}
//Yanlış kelime dizisini güncelleme kısmı
function updateWrongLetters() {
    //Html kısmında boş verdiğimiz kısımları doldurduğumuz yer
    wrongLetters_el.innerHTML = `
        ${wrongLetters.length > 0 ? '<h3>Hatalı harfler</h3>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}<span>`)}
    `;
    //Adamın bölmelerini foreach ile tek tek dönerek hata sayımıza göre açığa çıkartıyoruz
    items.forEach((item, index) => {
        const errorCount = wrongLetters.length;

        if (index < errorCount) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    })
    //Hata sayımız adamın asılacak parçalarına eşitse oyunu kaybettiğimizi bildiren bir mesaj gönderiyoruz
    if (wrongLetters.length === items.length) {
        playControl = false
        popup.style.display = 'flex';
        popup.lastElementChild.style.backgroundColor = 'red'
        message_el.innerText = 'Maalesef Kaybettiniz.';
    }
}
//Girilen bir harfe yeniden basıldığında gösterilecek olan mesaj
function displayMessage() {
    message.classList.add('show');

    setTimeout(function () {
        message.classList.remove('show');
    }, 2000);
}
//Yeniden oyna butonuna basılınca oyunun değerlerini sıfırlayıp yeniden hazırlıyoruz
PlayAgainBtn.addEventListener('click', function () {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();
    playControl = true
    popup.style.display = 'none';
});
//Sayfa üzerindeyken bastığımız tuşun algılanabilmesi için gerekli olan kısım
window.addEventListener('keydown', function (e) {
    //Eğer playcontrol aktifse bastığımız tuşlar algılanıyor kaybettiğimizde false olduğu için çalışmıyor
    if (playControl) {

        //Basılan tuşların değerlerini alarak hangi tuşa basıldığını belirleme kısmı
        if ((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode == 222) {
            const letter = e.key;

            if (selectedWord.includes(letter)) {
                //Doğru karakterler girilen tuş değerini içermiyorsa ekleme yapıyoruz 
                if (!correctLetters.includes(letter)) {
                    correctLetters.push(letter);
                    displayWord();

                }
                //Doğru karakterler girilen tuş değerini barındırıyorsa tekrar giriş olduğunu belirtiyoruz
                else {

                    displayMessage();
                }
            } else {
                //Yanlış karakterler için yukarıdaki kısım ile aynı
                if (!wrongLetters.includes(letter)) {
                    wrongLetters.push(letter);
                    updateWrongLetters();
                }
                else {
                    displayMessage();
                }
            }
        }
    }
});

displayWord()