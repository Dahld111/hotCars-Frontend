console.log('✅ widget.js cargado correctamente');

$(function() {
    
    $("#pickupCity, #dropoffCity").autocomplete({
        source: external_file_Cities
    });

    $("#searchBtn").on("click", function() {
        const params = $.param({
            pickupCity: $("#pickupCity").val(),
            dropoffCity: $("#pickupCity").val(),
            pickupDate: $("#pickupDate").val(),
            dropoffDate: $("#dropoffDate").val()
        });
        window.location.href = "results?" + params;
    });
});