//Model tanımlamaları
var models = [
    {
        name: '0 sayısı',
        image: '/SliderExample/img/0.jpg',
        link: 'https://tr.wikipedia.org/wiki/0_(sayı)#:~:text=0%20sayısı%20pozitif%20ve%20negatif,Roma%20rakamlarında%20gösterilemeyen%20tek%20rakamdır.&text=Birçok%20skalada%20sıfır%20başlangıç%20ya,artı%2C%20solu%20eksi%20değerleri%20barındırır.',

    },
    {
        name: '1 sayısı',
        image: '/SliderExample/img/1.jpg',
        link: 'https://tr.wikipedia.org/wiki/1_(sayı)',

    },
    {
        name: '2 sayısı',
        image: '/SliderExample/img/2.jpg',
        link: 'https://tr.wikipedia.org/wiki/2_(sayı)',

    },
    {
        name: '3 sayısı',
        image: '/SliderExample/img/3.jpg',
        link: 'https://tr.wikipedia.org/wiki/3_(sayı)',

    },
    {
        name: '4 sayısı',
        image: '/SliderExample/img/4.jpg',
        link: 'https://tr.wikipedia.org/wiki/4_(sayı)',

    }
];
//Slaytın indexi
var index = 0;
//Slaytımızın uzunluğu
var slaytCount = models.length;
//settings sayesinde eğer random true ise slaytlarımızın her 2 saniyede bir otomatik rastgele değişmesini sağladık
var settings = {
    duration: '2000',
    random: false
}
var interval;
init(settings)
//İkonlardan sol ok olanına bir event eklemesi
document.querySelector('.fa-arrow-circle-left').addEventListener('click', function () {
    index--
    console.log(index);
    showSlide(index)
});
//İkonlardan sağ ok olanına bir event eklemesi
document.querySelector('.fa-arrow-circle-right').addEventListener('click', function () {
    index++
    console.log(index);
    showSlide(index)
});
//İkonlar için üstün geldiğimiz zaman otomatik değişmesini etkisiz kılar
document.querySelectorAll('.arrow').forEach(function(item){
    item.addEventListener('mouseenter',function(){
        clearInterval(interval)
    })
})
//İkonlar için üstünden gittiğimiz otomatik değişmesini çalıştırır
document.querySelectorAll('.arrow').forEach(function(item){
    item.addEventListener('mouseleave',function(){
        init(settings);
    })
})
//interval milisaniye cinsinden tanımlanan süreyle belirli aralıkta tanımlanan fonksiyonu çalıştırmaktadır
//Verdiğimiz ayara göre
function init(settings) {
    var previous;
  interval=  setInterval(function () {
        if (settings.random) {
            //random index oluşturur
            do {

                index = Math.floor(Math.random() * slaytCount)
            } while (index == previous) 
            previous=index
        } else {
            //artan index oluşturur
            if(slaytCount==index+1){
                index=-1;
            }
            showSlide(index)
            console.log(index);
            index++;

        }
      
        showSlide(index);

    }, settings.duration)
}
//buton üzerinden rastgele özelliğini aktifleştirip kapatma kısmı
function getRandom(){
   var text= document.querySelector('#randomButton')
    if(text.textContent==='Rastgele getir'){
        text.classList.remove("btn-primary")
        text.classList.add('btn-success')
        settings.random=true;
        text.textContent='Normal getir'
    }
    else if(text.textContent==='Normal getir'){
        text.classList.remove("btn-success")
        text.classList.add('btn-primary')
        settings.random=false;
        text.textContent='Rastgele getir'
    }
}
var button=document.querySelector('#randomButton').addEventListener("click",getRandom);
//slaytları atama kısmı
function showSlide(i) {


    if (i < 0) {
        index = slaytCount - 1
    } else if (i >= slaytCount) {
        index = 0
    }
    document.querySelector('.card-link').setAttribute('href', models[index].link)
    document.querySelector('.card-title').textContent = models[index].name;
    document.querySelector('.card-img-top').setAttribute('src', models[index].image)
}
