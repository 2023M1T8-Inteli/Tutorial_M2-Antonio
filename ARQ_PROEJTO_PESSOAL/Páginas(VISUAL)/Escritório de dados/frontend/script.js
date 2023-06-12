$(document).ready(function() {

     // Variaveis, abrir ocorrencias
     let ocShow = '.choq-tip-1'


    // Botão abrir ocorrências
   $('.cst-btn-1').on("click", function(event) { 
        $('.choq-tip-1').show();
        $('.cst-btn-1').hide();
        $('.cst-btn-1-1').show();
        $('.choq-tip-2').show();
        $('.p-c').show();

   });

   // Botão fechar ocorrências
   $('.cst-btn-1-1').on("click", function(event) {
        $('.choq-tip-1').hide();
        $('.cst-btn-1').show();
        $('.cst-btn-1-1').hide();
        $('.cst-range1').hide();
        $('.cst-range2').hide();
        $('.cst-range3').hide();
        $('.choq-tip-2').hide();
        $('.p-c').hide();
        $('.chq-t-1f').hide();
        $('.chq-t-1a').show();
        $('.chq-t-2f').hide();
        $('.chq-t-2a').show();
        $('.p-cf').hide();
        $('.p-ca').show();
   });

   // Botão abrir choque tipo 1 ocorrencias

   $('.chq-t-1a').on("click", function(event) {
    $('.cst-range1').show();
    $('.chq-t-1a').hide();
    $('.chq-t-1f').show()

   });

   // Botao fechar choque tipo 1 ocorrencia

   $('.chq-t-1f').on("click", function(event) {
    $('.cst-range1').hide();
    $('.chq-t-1a').show();
    $('.chq-t-1f').hide()

   });

   // Botao abrir choque tipo 2 ocorrencia

   $('.chq-t-2a').on("click", function(event) {
    $('.cst-range2').show();
    $('.chq-t-2a').hide();
    $('.chq-t-2f').show();
   })

   // Botao fechar choque tipo 2 ocorrencia

   $('.chq-t-2f').on("click", function(event) {
    $('.cst-range2').hide();
    $('.chq-t-2a').show();
    $('.chq-t-2f').hide();
   })

   // Botao abrir ponto critico

   $('.p-ca').on("click", function(event) {
    $('.cst-range3').show();
    $('.p-ca').hide();
    $('.p-cf').show();

   })

   // Botao fechar ponto critico

   $('.p-cf').on("click", function(event) {
    $('.cst-range3').hide();
    $('.p-ca').show();
    $('.p-cf').hide();
    
    
   })

   // Botao abrir tipos de dados

   $('.cst-btn-2').on("click", function(event) {
     $('.cst-btn-2').hide();
     $('.cst-btn-2-2').show();
     $('.histograma').show();
     $('.markov').show();
     $('.graficos').show();
   })

   // Botao fechar tipos de dados

   $('.cst-btn-2-2').on("click", function(event) {
     $('.cst-btn-2').show();
     $('.cst-btn-2-2').hide();
     $('.histograma').hide();
     $('.markov').hide();
     $('.graficos').hide();
   })

   // Botao abrir pico

   $('.cst-btn-3').on("click", function(event) {
     $('.cst-btn-3').hide();
     $('.cst-btn-3-2').show();
     $('.cst-range4').show();
   })

   // Botao fechar pico

   $('.cst-btn-3-2').on("click", function(event) {
     $('.cst-range4').hide();
     $('.cst-btn-3').show();
     $('.cst-btn-3-2').hide();
   })


   // Código filtragem

   const url = `/mapData/choque`;
   
   fetch(url)
   .then((response) => {
    return response.json();
   })
   .then((data) => {
    let info = data

    info.map(function(item) {
      vetor.push([item.Latitude, item.Longitude, item.Velocidade, item.Data_Hora ,item.Position, item.Placa_Virtual, item.Trecho, item.F_max ,item.ACT, item.PEG])
      console.log(vetor);
   })
  })
})