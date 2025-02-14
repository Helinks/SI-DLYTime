<?php


require 'db/con_db.php';
session_start();


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calendario Web</title>
    
    <script src="js/jquery.min.js"></script>
    <script src="js/moment.min.js"></script>
    <!-- Full Calendar -->
    <link rel="stylesheet" href="css/fullcalendar.min.css">

    <link rel="stylesheet" href="css/index.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    
    <script src="js/fullcalendar.min.js"></script>
    <script src="js/es.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>

</head>
<body>
 <header>
     <div>
       <?php require 'partials/header.php' ?>
     </div>
 </header>
  <main>  
    <div class="container">
        <div class="row">
            <div class="col"></div>
            <div class="col-7"> <div id="CalendarioWeb"> </div></div>
            <div class="col"></div>
        </div>
    </div>
    <script>
        $(document).ready(function(){
            $('#CalendarioWeb').fullCalendar({
                header:{
                    left:'title',
                    right:'prev,next,today,month,agendaWeek,agendaDay,Miboton'
                },
                customButtons:{
                    Miboton:{
                        text:"Gestionar las citas",
                        click:function(){
                          window.location.href = "adm_citas.php";
                        }
                    }
                },
                dayClick:function(date,jsEvent,view){
                    $('#CalendarioWeb').fullCalendar('changeView', 'agendaDay', date);
                    
                },
                events : 'http://localhost/dlytime/eventos.php',
                
                eventClick:function(calEvent,jsEvent,view){
                    $('#tituloEvento').html(calEvent.title);
                    $('#descripcionEvento').html(calEvent.description);
                    $("#exampleModal").modal();
                }
                
            });
        });
    </script>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="tituloEvento"></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        <div id="descripcionEvento"></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
      </main>
</body>
</html>