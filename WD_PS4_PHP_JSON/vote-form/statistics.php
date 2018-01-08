<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Vote-form</title>
    <link rel="stylesheet" href="reset.css">
    <link rel="stylesheet" href="style.css">
    <?php $data = json_decode(file_get_contents('data.json'), true); ?>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
        google.charts.load('current', {packages: ['corechart']});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var arrTmp = '<?= json_encode($data); ?>'.replace(/[{}]/g, '').split(',');
            for (var i in arrTmp) {
                arrTmp[i] = arrTmp[i].split(':');
                arrTmp[i][1] = +arrTmp[i][1];
            }
            arrTmp.unshift(['Vote', 'Percentage']);
            var data = google.visualization.arrayToDataTable(arrTmp);

            var options = {
                title: 'Social temperament',
                backgroundColor: '#dede9f',
                is3D: true,
                fontSize: 20
            };
            var chart = new google.visualization.PieChart(document.getElementById('pieCart_3d'));
            chart.draw(data, options);
        }
    </script>
</head>
<body>
<div class="wrapper">
    <div id="pieCart_3d"></div>
</div>
</body>
</html>

