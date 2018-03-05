<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Vote-form</title>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/style.css">
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="js/jquery-3.2.1.min.js"></script>
    <script type="text/javascript">
        const PATH_TO_DB = 'db/data.json';
        google.charts.load('current', {packages: ['corechart']});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            $.getJSON(PATH_TO_DB, function(data) {
                let dataTmp = [];
                dataTmp.push(['Vote', 'Percentage']);
                $.map(data, function(value, index) {
                    dataTmp.push([index, value]);
                });
                data = google.visualization.arrayToDataTable(dataTmp);

                var options = {
                    title: 'Social temperament',
                    backgroundColor: '#dede9f',
                    is3D: true,
                    fontSize: 20
                };
                var chart = new google.visualization.PieChart(document.getElementById('pieCart_3d'));
                chart.draw(data, options);
            });
        }
    </script>
</head>
<body>
<div class="wrapper">
    <div id="pieCart_3d"></div>
</div>
</body>
</html>

