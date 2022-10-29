//Atamalar
const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');
//Sayfa ilk yüklendiği zaman localStorage'dan bilgilerimizi çekiyoruz
getFromLocalStorage();
calculateTotal();

//Container içerisinde bulunan elementlerden sadece alınmamış koltukları seçebilmek için 
//toggle eğer içerisindeki değer elementte bulunuyorsa onu kaldırır yoksa ekler
container.addEventListener('click', function (e) {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');
        calculateTotal()
    }
});
//Seçtiğimiz film değerini değiştirmeyi sağlar
select.addEventListener('change', function (e) {
    calculateTotal();
});

function calculateTotal() {
    const selectedSeats = container.querySelectorAll('.seat.selected');
//localStorage içinde tutacağımız koltukların index numaralarına ulaşmak için dizi kullanıyoruz
    const selectedSeatsArr = [];
    const seatsArr = [];
//Diziye koltuk ekleme işlemi
    selectedSeats.forEach(function (seat) {
        selectedSeatsArr.push(seat);
    });

    seats.forEach(function (seat) {
        seatsArr.push(seat);
    });

//Seçilen koltuklar dizimizdeki her elemanı bir işlemden geçirmek için map kullanıyoruz
//Seçilen koltukları Tüm koltuklar dizisindeki indexlerini alıyoruz
    let selectedSeatIndexs = selectedSeatsArr.map(function (seat) {
        return seatsArr.indexOf(seat);
    });
//Seçilen koltuk adeti ve fiyatını gösteriyoruz
    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;

    saveToLocalStorage(selectedSeatIndexs);
}
//JSON kullanarak localStorage'daki bilgileri çekiyoruz
function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function (seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }



    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    }
}
//Seçilen bilgileri localStorage'a ekleme kısmı
function saveToLocalStorage(indexs) {
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}



