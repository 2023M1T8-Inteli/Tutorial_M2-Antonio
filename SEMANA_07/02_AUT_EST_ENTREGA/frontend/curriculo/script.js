api = 'http://127.0.0.1:3000'

$(document).ready(function(){
    const hiddenBox = $(".hidden");
    const moreBtn = $(".btn-continue");
    const lessBtn = $(".btn-return");
    $('#getDB').hide();
    $(".btn-continue").on("click", function(event) {
        hiddenBox.show();
        moreBtn.hide();
        lessBtn.show();
    
   

});
    $(".btn-return").on("click", function(event) {
        hiddenBox.hide();
        moreBtn.show();
        lessBtn.hide();
});

    $('.cst-btn-show-users').on('click', function(event) {
        $('#getDB').show();
        $('.cst-btn-show-users').hide();
        $('.cst-btn-hide-users').show();
    })

    $('.cst-btn-hide-users').on('click', function(event) {
        $('#getDB').hide();
        $('.cst-btn-show-users').show();
        $('.cst-btn-hide-users').hide();
    })

users.list();

});



var users = {
    list() {
        $.ajax({
            url: api + '/usuarios',
            type: 'GET',
            success: function(data)  {
                console.log(data);
                var tx = '';
                tx += '<div class="insert" onclick="user.insert()">Inserir</div>';
                data.forEach(element => {
                    tx += '<div class="user">';
                        tx +='<div class="title">' + `${element.Nome} - ${element.CPF} - ${element.Idade} - ${element.Endereco} - ${element.Telefone} - ${element.Email}` + '</div>';
                        tx += '<div class="actions">';
                            tx += '<div class="action" onclick="user.update(' + element.CPF + ',\'' + element.Nome + '\')">Editar</div>';
                            tx += '<div class="action" onclick="user.delete(' + element.CPF + ')">Excluir</div>';
                        tx += '</div>';
                    tx += '</div>';
                });
                $('#getDB').html(tx);
                console.log(tx);
            }
        });
    }
};

var user = {

    insert() {
        var Nome = prompt('Digite o nome:');
        var CPF = prompt('Digite o CPF:');
        var Idade = prompt('Digite a idade:');
        var Endereco = prompt('Digite seu endereço:');
        var Telefone = prompt('Digite o telefone:');
        var Email = prompt('Digite o email:');
        console.log(`${Nome} - ${CPF} - ${Idade} - ${Endereco} - ${Telefone} - ${Email}`);
        if (Nome && CPF && Idade && Endereco && Telefone && Email) {
            if (Nome.trim() != '' && CPF.trim() != '' && Idade.trim() != '' && Endereco.trim() != '' && Telefone.trim() != '' && Email.trim() != '' ) {
                $.ajax({
                    type: 'POST',
                    url: api + '/insereUsuario',
                    data: {Nome: Nome, CPF: CPF, Idade: Idade, Endereco: Endereco, Telefone: Telefone, Email: Email},
                }).done(function () {
                    users.list();
                }).fail(function (msg) {
                    console.log('Falha');
                }).always(function(msg) {
                    console.log('Sempre');
                });
            }
        }
    },

    update(CPF, oldTitle) {
        var Nome = prompt('Digite o novo nome:', oldTitle);
        if(Nome) {
            if (Nome.trim() != '') {
                $.ajax({
                    type: 'POST',
                    url: api + '/atualizaUsuario',
                    data: {Nome: Nome, CPF: CPF},
                }).done(function () {
                    users.list();
                }).fail(function (msg) {
                    console.log('Falha');
                }).always(function(msg) {
                    console.log('Sempre');
                });
            }
        }
    },

    delete(CPF) {
        if (confirm('Confirma excluir o usuário?')) {
            $.ajax({
                type: 'POST',
                url: api + '/removerUsuario',
                data: {CPF: CPF},
            }).done(function() {
                users.list();
            }).fail(function(msg) {
                console.log('Falhar')
            }).always(function(msg) {
                console.log('Sempre');
            });
        }
    },
}



