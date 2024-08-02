(function () {
    // สร้างตัวเชื่อมต่อ
    var myConnector = tableau.makeConnector();

    // กำหนด Schema ของข้อมูล
    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "name",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "myTable",
            alias: "My Table",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // ดึงข้อมูลจาก API
    myConnector.getData = function (table, doneCallback) {
        var username = '02f6502c-b949-4b05-8438-017089121ae4';
        var password = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjA1ODFmYjVhLThlMTktNDk0Zi04ZDMxLTFjODkwNzExMGEwYSI.SsATkiN7WLkj7hnMnagrKualUxT_4ZOsNwNv0Km1P_0';
        var auth = "Basic " + btoa(username + ":" + password);

        var xhr = $.ajax({
            url: "https://intelligence.speedtest.net/extracts",
            type: "GET",
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", auth);
            },
            success: function (data) {
                var tableData = [];

                for (var i = 0; i < data.length; i++) {
                    tableData.push({
                        "id": data[i].id,  // คุณอาจต้องปรับ key ให้ตรงกับโครงสร้างข้อมูลจริง
                        "name": data[i].name  // คุณอาจต้องปรับ key ให้ตรงกับโครงสร้างข้อมูลจริง
                    });
                }

                table.appendRows(tableData);
                doneCallback();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log("Error: " + xhr.status + " " + thrownError);
            }
        });
    };

    tableau.registerConnector(myConnector);
})();

function fetchData() {
    tableau.connectionName = "Speedtest API Data"; // ชื่อการเชื่อมต่อ
    tableau.submit(); // ส่งตัวเชื่อมต่อไปยัง Tableau
}
