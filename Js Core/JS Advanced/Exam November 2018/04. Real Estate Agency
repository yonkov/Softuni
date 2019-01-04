function realEstateAgency() {

	let offers = [];
	let profit = 0;

	$('button[name=regOffer]').on('click', function () {
		let price = $('input[name=apartmentRent]').val();
		let type = $('input[name=apartmentType]').val();
		let commission = $('input[name=agencyCommission]').val();
		
		if ($.isNumeric(price) && $.isNumeric(commission) && commission >= 0 && commission <= 100 && price>0 && type.trim() && !type.includes(":")) {

			$('#building').append('<div class="apartment">');
			$('.apartment').last().append(`<p>Rent: ${price}<p>Type: ${type}<p>Commission: ${commission}`);

			$('#message').text('Your offer was created successfully.');
			offers.push({
				price,
				type,
				commission
			});
		} else {
			$('#message').text('Your offer registration went wrong, try again.');
		}

		$('input[name=apartmentRent]').val('');
		$('input[name=apartmentType]').val('');
		$('input[name=agencyCommission]').val('');
		price = '';
		type = '';
		commission = '';

	});

	$('button[name=findOffer]').on('click', function () {
		
		let budget = $('input[name=familyBudget]').val();
		let type = $('input[name=familyApartmentType]').val();
		let name = $('input[name=familyName]').val();

		
		if(!$("#building").hasClass("apartment")){		
			$("#message").text("We were unable to find you a home, so sorry ??")
		}
		
		if ($.isNumeric(budget) && budget > 0 && type.trim() && name.trim()) {

			for (let offer of offers) {
				let commission = (offer.commission / 100) * offer.price;
				if (type === offer.type && budget >= offer.price + commission) {
				profit += 2 * commission;
					$('#roof h1').text(`Agency profit: ${profit}lv.`);

					//loop through apartments
					$(".apartment").find(`p:contains(${type})`).parent().empty()
						.append(`<p>${name}<p>live here now</p><button>MoveOut</button`)
						.css("border", "2px solid red");
					
						$('#message').text('Enjoy your new home! :))');
						break;
				} else {
					$("#message").text("We were unable to find you a home, so sorry :(")
				}

			}
			//on click remove the apartment
			$('.apartment button').on('click', function () {
				name = $(this).closest('.apartment').find("p:first").text();
				
				$(this).closest('.apartment').remove();
				$('#message').text(`They had found cockroaches in ${name}'s apartment`);
			});
		}
		$('input[name=familyBudget]').val('');
		$('input[name=familyApartmentType]').val('');
		$('input[name=familyName]').val('');

	});

}
