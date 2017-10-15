<?php
if ($_SERVER['REQUEST_METHOD'] === "POST") {
    var_dump($_POST);
    exit;
}

$selectData = array(
    array("id" => 19, "name" => "Lorem ipsum l1/a"),
    array(
        "id" => 55,
        "name" => "Lorem ipsum l1/b",
        "children" => array(
            array("id" => 3, "name" => "Lorem ipsum l2/a p:55"),
            array("id" => 4, "name" => "Lorem ipsum l2/b p:55"),
            array("id" => 5, "name" => "Lorem ipsum l2/c p:55"),
        )
    ),
    array("id" => 6, "name" => "Lorem ipsum l1/c"),
    array(
        "id" => 7,
        "name" => "Lorem ipsum l1/d",
        "children" => array(
            array("id" => 8, "name" => "Lorem ipsum l2/a p:7"),
            array("id" => 9, "name" => "Lorem ipsum l2/b p:7"),
            array("id" => 10, "name" => "Lorem ipsum l2/c p:7"),
        )
    ),
    array("id" => 11, "name" => "Lorem ipsum l1/e"),
    array(
        "id" => 12,
        "name" => "Lorem ipsum l1/f",
        "children" => array(
            array(
                "id" => 13,
                "name" => "Lorem ipsum l2/a p:12",
                "children" => array(
                    array(
                        "id" => 88,
                        "name" => "Lorem ipsum l2/b p:13",
                        "children" => array(
                            array("id" => 14, "name" => "Lorem ipsum l3/c p:88"),
                            array("id" => 15, "name" => "Lorem ipsum l3/c p:88"),
                            array("id" => 42, "name" => "Lorem ipsum l3/c p:88"),
                        ),
                    ),
                ),
            ),
            array("id" => 17, "name" => "Lorem ipsum l2/c p:12"),
        ),
    ),
);
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Title of the document</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <link rel="stylesheet" href="/plugin/css/treeselect.css">
        
    </head>
    <body>
        <div class="container-fluid">
            <h1>TreeSelect plugin example</h1>
            <div class="row">
                <div class="col-md-6">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <form id="filter" action="/" method="POST" class="">
                                <div class="form-group">
                                    <label for="">treeplugin</label>
                                    <input id="treeplugin" name="selectname" 
                                           data-source="<?php echo htmlspecialchars(json_encode($selectData), ENT_QUOTES, 'UTF-8'); ?>" 
                                           class="form-control">
                                </div>

                                <button type="submit" class="btn btn-default">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">Source</div>
                        <div class="panel-body">
                            
                            <pre><?php print_r($selectData); ?></pre>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="/plugin/js/treeselect.js"></script>
        <script>
            $(document).ready(function () {
                $('#treeplugin').treeSelect({
                    multiple: false,
                    parensSelectable: false
                });
            });
        </script>
    </body>
</html> 