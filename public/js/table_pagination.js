var table = $('#main_table');
$(document).on('change','#row-select',(e)=>{
  // $('#main_table tbody tr').html();
  var trnum = 0;
  var maxRows = parseInt(e.target.value);
  var totalRows = $('#main_table tbody tr').length;
  $('#main_table tr:gt(0)').each((index)=>{
    trnum++;
    if(trnum > maxRows){
      $(`#row${index}`).hide();
    }
    if(trnum <= maxRows){
      $(`#row${index}`).show();

    }
  });
  if(totalRows > maxRows){
    $('#inner-pgn-btn').html("");
    var pagenum = Math.ceil(totalRows/maxRows);
    for(let i=1;i<=pagenum;i++){
      $('#inner-pgn-btn').append(`<button class="button pagn-btn" id="pgn${i}">${i}</button>`).show();
    }

    $('#inner-pgn-btn button:first-child').addClass('active');

    $('#inner-pgn-btn button').on('click',(event)=>{
      $('#inner-pgn-btn button').removeClass('active');
      event.target.classList.add("active");
      var pageNum = parseInt(event.target.id.substring(3));
      var trIndex = 0;
      $('#main_table tr:gt(0)').each((index)=>{
          trIndex++;
          if(trIndex>(maxRows*pageNum) || trIndex <= ((maxRows*pageNum)-maxRows)){
                $(`#row${index}`).hide();
          }else{
                $(`#row${index}`).show();
          }
      })
    });

  }
});














