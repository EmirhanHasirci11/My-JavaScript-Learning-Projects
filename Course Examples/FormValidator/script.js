const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('mail');
const password = document.getElementById('password');
const repassword = document.getElementById('repassword');
//Her yanlış veri girişinde verilecek hata mesajını fonksiyon haline getirdik
function error(input, message) {
    input.className = 'form-control  is-invalid'
    const div = input.nextElementSibling;
    div.innerText = message
    div.className = 'invalid-feedback'
}
//Doğru veri girişi yapıldığıında verilecek mesajı fonksiyon haline getirdik
function success(input) {
    input.className = 'form-control is-valid'
}
//E-mail için bir kontrol ifadesi
function validateEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(input.value)) {
        success(input);
    } else {
        error(input, 'Lütfen geçerli bir mail adresi giriniz');
    }
}
//Girdiğimiz verilerin uygun uzunlukta olup olmadığının kontrolü
function checkLength(input, min, max) {
    if (input.value.length < min) {
        error(input, `${input.id} en az ${min} karakter olmalıdır`);
    } else if (input.value.length > max) {
        error(input, `${input.id} en fazla ${max} karakter olmalıdır`);
    } else {
        success(input);
    }
}
//Şifrelerin birbiriyle eşleşip eşleşmediğinin kontrolü
function checkPasswords(password, repassword) {
    if (password.value !== repassword.value) {
        error(repassword, 'Parolalar eşleşmiyor');
    }
}
//Boş girilen veri kısımları için hazırlanan kısım
function checkRequired(inputs) {
    inputs.forEach(element => {
        if (element.value === '') {
            error(element, `${element.id} zorunludur.`)
        }
        else {
            success(element)
        }
    });

}
//Butona bastıktan sonra gerçekleşecek işlem için hazırlanan fonksiyon
form.addEventListener('submit', function (e) {
    e.preventDefault()
    checkRequired([username, email, password, repassword])
    validateEmail(email)
    checkLength(username, 8, 16);
    checkLength(password, 8, 16);
    checkPasswords(password, repassword);
})

