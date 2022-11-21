jQuery(document).ready(function($) {
    // Check Pincode
	$('#pincheck_wrapper #check_pin').on('click', function(){
		var pin_el = $(this);
		var pin_code = pin_el.parents('#pincheck_wrapper').find('#pin_code').val();
		var pin_res = pin_el.parents('#pincheck_wrapper').find('#pin_res');
		var pin_check_btn = pin_el.parents('#pincheck_wrapper').find('#check_pin');

        dataString = {
            "pin_code_value" : pin_code,
            "action": "inext_wpc_check_pin_code"
        };

        $.ajax({
            data: dataString,
            type: "POST",
            url: inext_wpc_ajax_variables.ajaxurl,
            beforeSend: function() {
				pin_check_btn.addClass('disabled');
				pin_check_btn.append(loader);
            },
            success: function(response) {
				response = JSON.parse(response);
				pin_check_btn.removeClass('disabled');
				pin_check_btn.find('.' + loader_class + '_wrapper').remove();
				pin_res.removeClass('res_success res_error');
				if(response.status){
					pin_res.addClass('res_success');
					pin_res.html(response.msg);
				}
				else{
					pin_res.addClass('res_error');
		            pin_res.html(response.msg);
				}
                // console.log(res);
            },
    		error: function(error){
    			console.log(error);
    		}
        });
	});

    $('#pincheck_wrapper #pin_code').on('keyup', function(){
		var pin_el = $(this);
		var pin_code = pin_el.parents('#pincheck_wrapper').find('#pin_code').val();
		var pin_res = pin_el.parents('#pincheck_wrapper').find('#pin_res');
		var pin_check_btn = pin_el.parents('#pincheck_wrapper').find('#check_pin');

        if( isNaN(pin_code) ){
            pin_res.addClass('res_error');
            pin_res.html('Please enter valid pin code');
			pin_check_btn.addClass('disabled');
        }
        else{
			if( pin_code.length == 0 ){
				pin_res.removeClass('res_error res_success');
				pin_res.html('');
				pin_check_btn.addClass('disabled');
			}
			else if( pin_code.length > 0 && pin_code.length < pin_code_length ){
                pin_res.addClass('res_error');
                pin_res.html('Please enter minimum '+ pin_code_length +' digits');
				pin_check_btn.addClass('disabled');
            }
            else{
                if( pin_code.length > pin_code_length ){
                    pin_res.addClass('res_error');
                    pin_res.html('Please enter maximum '+ pin_code_length +' digits');
					pin_check_btn.addClass('disabled');
                }
                else{
                    pin_res.removeClass('res_error res_success');
                    pin_res.html('');
                    pin_check_btn.removeClass('disabled');
                }
            }
        }
	});
});
