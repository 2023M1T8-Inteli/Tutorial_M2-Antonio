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

   // Função para exibir os resultados
   function mostrarIdViagem(resultados) {
    var resultadosContainer = document.getElementById('resultados-container');
    resultadosContainer.innerHTML = ''; // Limpa o conteúdo anterior
  
    if (resultados.length > 0) {
      var uniqueIds = [];
      var ul = document.createElement('ul');
      ul.classList.add('lista-resultados', 'list-group'); // Adiciona classes CSS à lista
  
      resultados.forEach(function(resultado) {
        if (!uniqueIds.includes(resultado.id_viagem)) {
          uniqueIds.push(resultado.id_viagem); // Adiciona o ID da viagem ao array
          var li = document.createElement('li');
          li.textContent = 'Viagem ' + resultado.id_viagem; // Adiciona a palavra "Viagem"
          li.classList.add('list-group-item', 'list-group-item-primary', 'mb-2', 'custom-font'); // Adiciona classes CSS e Bootstrap aos itens da lista
          ul.appendChild(li);
        }
      });
  
      resultadosContainer.appendChild(ul); // Adiciona a lista ao container
    } else {
      var p = document.createElement('h4');
      p.textContent = 'Nenhum resultado encontrado.';
      resultadosContainer.appendChild(p);
    }
  }
  
  
  
  
  
  
  

// Função para fazer a requisição Ajax
   function enviarSolicitacaoAjax(url, valoresSliders) {
    $.ajax({
      url: url,
      method: 'GET',
      data: valoresSliders,
      success: function(response) {
        mostrarIdViagem(response); // Chama a função mostrarIdViagem para exibir os resultados
      },
      error: function(error) {
        console.error(error);
      }
    });
  }
  
  
  // Manipuladores de eventos para os sliders
  $('#slider1, #slider8').on('input', function() {
    if ($('#checkbox-c-1').is(':checked')) {

      var sliderF1 = $('#slider1').val();
      var sliderF2 = $('#slider8').val();
    
      var valoresSliders = {
        sliderF1: sliderF1,
        sliderF2: sliderF2
      };
    
      enviarSolicitacaoAjax('/mapData/choque/f1', valoresSliders); // Chama a função para fazer a requisição Ajax

    }

  });
  
  $('#slider3, #slider10').on('input', function() {
    if ($('#checkbox-c-2').is(':checked')) {


    var sliderF11 = $('#slider3').val();
    var sliderF22 = $('#slider10').val();
  
    var valoresSliders = {
      sliderF11: sliderF11,
      sliderF22: sliderF22
    };
  
    enviarSolicitacaoAjax('/mapData/choque/f2', valoresSliders); // Chama a função para fazer a requisição Ajax
  }

  });
  
  $('#slider5, #slider12').on('input', function() {
    if ($('#checkbox-p-c').is(':checked')) {


    var sliderPC1 = $('#slider5').val();
    var sliderPC2 = $('#slider12').val();
  
    var valoresSliders = {
      sliderPC1: sliderPC1,
      sliderPC2: sliderPC2
    };
  
    enviarSolicitacaoAjax('/mapData/choque/pc', valoresSliders); // Chama a função para fazer a requisição Ajax
  }
  });
  
  $('#slider7, #slider14').on('input', function() {
    if ($('#checkbox-pc').is(':checked')) {



    var sliderP1 = $('#slider7').val();
    var sliderP2 = $('#slider14').val();
  
    var valoresSliders = {
      sliderP1: sliderP1,
      sliderP2: sliderP2
    };
  
    enviarSolicitacaoAjax('/mapData/choque/p', valoresSliders); // Chama a função para fazer a requisição Ajax
  }
  });
  

});

