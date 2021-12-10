var tipo;

$(document).ready(function() {


  get_datos();
});

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}



function get_datos() {

  $.ajax({
    type: "POST",
    dataType: "JSON",
    url: "./GET/",
    data: {},
    beforeSend: function(event) {
      $("#contenedorElementos").empty();
    },
    success: function(server) {
      let datos = server.datos;

      $.each(datos.orders, function(a, b) {
        var interfaz = interface_Datos(b);
        $("#contenedorElementos").append(interfaz);
      });

      var $table = $('#fresh-table')
      var $alertBtn = $('#alertBtn')
      $(function() {
        $table.bootstrapTable({
          classes: 'table table-hover table-striped',
          toolbar: '.toolbar',

          search: true,
          showToggle: true,
          showColumns: true,
          pagination: true,
          striped: true,
          sortable: true,
          pageSize: 8,
          pageList: [8, 10, 25, 50, 100],

          formatShowingRows: function(pageFrom, pageTo, totalRows) {
            9
            return ''
          },
          formatRecordsPerPage: function(pageNumber) {
            return pageNumber + ' rows visible'
          }
        })

      })

    }
  });
}

function interface_Datos(ordens) {
  let items = JSON.stringify(ordens.items);
  var interfaz = '<tr class="" id="' + ordens.id + '"><td class="col1">' + ordens.number + '</td><td class="col2">' + ordens.name + '</td>';
  interfaz += '<td> <span style="display:none;" id="id_' + ordens.id + '">' + items + '</span><button class="btn btn-success" data-toggle="modal" data-target="#products" onclick="Mostrar(\'' + ordens.id + '\');"  title="Mostrar">Mostrar</button> </td>';
  interfaz += '</tr>';
  return interfaz;
}


function Mostrar(id) {
  console.log(id);
  let items = JSON.parse($("#id_" + id).text());

  $("#contenedor_products").empty();
  $.each(items, function(a, b) {
    $("#contenedor_products").append('<tr id="' + b.id + '"><td>' + b.sku + '</td><td>' + b.name + '</td><td>' + b.quantity + '</td><td>' + b.price + '</td></tr>');

  })

  var $table = $('#fresh-table_products')
  var $alertBtn = $('#alertBtn')
  $(function() {
    $table.bootstrapTable({
      classes: 'table table-hover table-striped',
      toolbar: '.toolbar',

      search: true,
      showToggle: true,
      showColumns: true,
      pagination: true,
      striped: true,
      sortable: true,
      pageSize: 8,
      pageList: [8, 10, 25, 50, 100],

      formatShowingRows: function(pageFrom, pageTo, totalRows) {
        9
        return ''
      },
      formatRecordsPerPage: function(pageNumber) {
        return pageNumber + ' rows visible'
      }
    })

  })
}


$("#form_set_data").submit(function(e) {
  e.preventDefault();
  var sku = $("#sku").val();
  var name = $("#name").val();
  var quantity = $("#quantity").val();
  var price = $("#price").val();
  //validamos campos
  if ($.trim(sku) == "") {
    toastr.error("No ha ingresado Sku", "Aviso!");
    return false;
  }
  if ($.trim(name) == "") {
    toastr.error("No ha ingresado Name", "Aviso!");
    return false;
  }
  if ($.trim(quantity) == "") {
    toastr.error("No ha ingresado quantity", "Aviso!");
    return false;
  }
  if ($.trim(price) == "") {
    toastr.error("No ha ingresado price", "Aviso!");
    return false;
  }
  let id = uniqid(8);
  $("#contenedor_products").append('<tr id="' + id + '" ><td>' + sku + '</td><td>' + name + '</td><td>' + quantity + '</td><td>' + price + '</td></tr>');


  var $table = $('#fresh-table_products')
  var $alertBtn = $('#alertBtn')
  $(function() {
    $table.bootstrapTable({
      classes: 'table table-hover table-striped',
      toolbar: '.toolbar',

      search: true,
      showToggle: true,
      showColumns: true,
      pagination: true,
      striped: true,
      sortable: true,
      pageSize: 8,
      pageList: [8, 10, 25, 50, 100],

      formatShowingRows: function(pageFrom, pageTo, totalRows) {
        9
        return ''
      },
      formatRecordsPerPage: function(pageNumber) {
        return pageNumber + ' rows visible'
      }
    })

  })

});

function uniqid(len) {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var string_length = 5;
  var randomstring = '';

  for (var x = 0; x < string_length; x++) {

    var letterOrNumber = Math.floor(Math.random() * 2);
    if (letterOrNumber == 0) {
      var newNum = Math.floor(Math.random() * 9);
      randomstring += newNum;
    } else {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }

  }
  return randomstring;
}
