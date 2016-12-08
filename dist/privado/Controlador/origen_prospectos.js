function GetData() {
    var randomTime = new Date();
    $('#DatosLoad').html('');
    $('#contenedor').append(SalesUp.Sistema.unMomento());
    $.ajaxSetup({'beforeSend' : function(xhr) {xhr.overrideMimeType('text/html; charset=iso-8859-1');}}); 
    $.ajax({async:false, cache: false,dataType: 'html', type: 'POST', url : pagina_datos,
      success : function(data) {
        setTimeout(function(){

          $("#DatosLoad").html(data);
          $('#Esperando').remove();
          num_rows = $('table.simple tbody tr').length;
          $.thickbox();
          $('table.simple tbody tr:even').addClass('zebra');
          (SalesUp.Sistema.RestriccionesCorporativo) ? SalesUp.Sistema.RestriccionesCorporativo():'';
        },500);
      }
    });
  }
