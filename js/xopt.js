(function ($) {
    $(function () {
       /* Ajax flag and unflag content */
       $('.flag').on('click', function () {
           var nid = $(this).data('nid');
           var button = $(this);
           $.ajax({
               type: "POST",
               url: Drupal.settings.xopt.ajax+'/flag',
               data: {nid: nid},
               success: function(data){
                 var classes = data.result;
                 button.find('i').prop('class',classes);
               }
           });
           return false;
       });
       /* Orders */
       $('.order-edit').on('click', function () {
           var oid = $(this).data('oid');
           var nid = $(this).data('nid');
           window.location.href = '/node/'+nid+'?order='+oid;
           return false;
       });
       $('.order-send').on('click', function () {
           var oid = $(this).data('oid');
           var orderid = $(this).data('orderid');
           var orderdate = $(this).data('orderdate');
           var prepayment = $(this).data('prepayment');
           var html = '';
           html+= '<p>'+Drupal.t('Замовлення')+' '+orderid+' '+Drupal.t('від')+' '+orderdate+' '+Drupal.t('буде відправлене в роботу.')+'</p>';
           html+= '<p class="text-danger">'+Drupal.t('Перед відправкою замовлення в роботу Ви повинні отримати передоплату в розмірі')+' '+prepayment+'грн</p>';
           Swal.fire({
              title: Drupal.t('Відправити замовлення в роботу?'),
              html: html,
              customClass: {container:'swal-xopt'},
              showCancelButton: true,
              confirmButtonText: Drupal.t('Відправити в роботу'),
              cancelButtonText: Drupal.t('Скасувати'),
            }).then((result) => {
              if (result.isConfirmed) {
                $.ajax({
                    type: "POST",
                    url: Drupal.settings.xopt.ajax+'/order-send',
                    data: {oid: oid}
                });
                Swal.fire({
                  icon: 'success',
                  title: Drupal.t('Замовлення відправлено в роботу'),
                  showConfirmButton: false,
                  timer: 3500
                });
                setTimeout(function(){
                    window.location.href = '/orders';
                }, 3500);
              }
           });
           return false;
       });
       $('.order-delete').on('click', function () {
           var oid = $(this).data('oid');
           var orderid = $(this).data('orderid');
           var orderdate = $(this).data('orderdate');
           var html = '';
           html+= '<p>'+Drupal.t('Замовлення')+' '+orderid+' '+Drupal.t('від')+' '+orderdate+' '+Drupal.t('буде видалено!')+'</p>';
           Swal.fire({
              title: Drupal.t('Видалити замовлення?'),
              html: html,
              customClass: {container:'swal-xopt'},
              showCancelButton: true,
              confirmButtonText: Drupal.t('Видалити'),
              cancelButtonText: Drupal.t('Скасувати'),
            }).then((result) => {
              if (result.isConfirmed) {
                $.ajax({
                    type: "POST",
                    url: Drupal.settings.xopt.ajax+'/order-delete',
                    data: {oid: oid}
                });
                Swal.fire({
                  icon: 'success',
                  title: Drupal.t('Замовлення видалено'),
                  showConfirmButton: false,
                  timer: 3500
                });
                setTimeout(function(){
                    window.location.href = '/orders';
                }, 3500);
              }
           });
           return false;
       });
    });
})(jQuery);
