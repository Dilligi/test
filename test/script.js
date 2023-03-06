async function parseEvent() {
    let response = await fetch('https://api.coingecko.com/api/v3/global');

    if (response.ok) {
        let json = await response.json();

        await fetch('database.php', {
            method: 'POST',
            body: JSON.stringify(json.data.market_cap_percentage)
        });

        console.log(json.data.market_cap_percentage);
    }
    else {
        console.error('Ошибка загрузки API');
    }
}

let shown = false, trPrev = null;

function showEvent() {
    $.ajax({
        url: 'database.php',
        method: 'get',
        dataType: 'json',
        success: function(data) {
            let tr;

            data.forEach(el => {

                tr += "<tr>\n";
                tr += "<td>" + el.id + "</td>\n";
                tr += "<td>" + el.percent + "</td>\n";
                tr += "</tr>\n";

            });

            if (!shown && trPrev != tr) {
                $('table').append(tr);
                shown = true;
            }
        }
    });
}