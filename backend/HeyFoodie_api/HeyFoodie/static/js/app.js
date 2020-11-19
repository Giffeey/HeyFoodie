$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
        $(this).collapse('hide');
    }
});

$(document).ready(function() {
    
    $('[data-toggle=offcanvas]').click(function() {
      $('.row-offcanvas').toggleClass('active');
    });
    
});

$(function () {
          
    var $bestsellmenu = $("#chBar");
    $.ajax({
      url: $bestsellmenu.data("url"),
      success: function (data) {

        var ctx = $bestsellmenu[0];
        Chart.defaults.global.defaultFontFamily = 'Kanit';
    if(ctx){
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.labels,
            datasets: [{
              label: 'จำนวนครั้งที่สั่ง',
              backgroundColor: '#007bff',
              data: data.data
            }]          
          },
          options: {
            responsive: true,
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'กราฟแสดงเมนูที่ขายได้ในวันนี้',
              fontSize: 18
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "black",
                        fontSize: 18,
                        stepSize: 1,
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "black",
                        fontSize: 14,
                        stepSize: 1,
                        beginAtZero: true
                    }           
                }]
            }
          }
        });
        }
      }
    });
    
  });

