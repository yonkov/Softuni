function acceptance() {
	let company = $('input[name=shippingCompany]').val();
	let product = $('input[name=productName]').val();
	let quantity = $('input[name=productQuantity]').val();
	let scrape = $('input[name=productScrape]').val();
	
	if (company.length!=='' && product!=='' && quantity!=='' && scrape!=='') {
			console.log(company);
			
		if ($.isNumeric(quantity) && $.isNumeric(scrape) && quantity-scrape>0) {

			$('#warehouse').append($('<div>').append(`<p>[${company}] ${product} - ${quantity-scrape} pieces</p>`)
			.append('<button type ="button">Out of stock'));

			$( 'button' ).on( 'click', function() {
				console.log('kralche');
				
				$(this).parent().remove();
			});
		}
	}


	//possible issues
	$('input[name=shippingCompany]').val('');
	$('input[name=productName]').val('');
	$('input[name=productQuantity]').val('');
	$('input[name=productScrape]').val('');
}
