(function ($) {
  "use strict";

  // Menu bar toggle
  $(document).on('click', '#burgerBarMenu', () => { $('#navbarsMenu').toggleClass('open'); });

  // Scroll to top
  $(window).scroll(function() {
    $(this).scrollTop() > 150 ? $('.backToTop').fadeIn() : $('.backToTop').fadeOut();
	});

	$('.backToTop').click(() => { $('html, body').animate({ scrollTop: 0 }, 'slow'); });

	let visitorName = $('.name');
	let visitorEmail = $('.email');
	let subject = $('.subject');
	let message = $('.message');

	// Submit message form
	$(document).on('submit', '#form', function(e) {
		e.preventDefault();
		
		if(visitorName.val() === '') {
			$(visitorName).addClass('is-invalid');
			$('#validationNameFeedback').text('Name is required! Please enter your name.');
		}
		else if(visitorEmail.val() === '') {
			$(visitorEmail).addClass('is-invalid');
			$('#validationEmailFeedback').text('Email is required! Please enter your email.');
		}
		else if(subject.val() === '') {
			$(subject).addClass('is-invalid');
			$('#validationSubjectFeedback').text('Subject is required! Please enter a subject.');
		}
		else if(message.val() === '') {
			$(message).addClass('is-invalid');
			$('#validationMessageFeedback').text('Message is required! Please enter your message.');
		}
		else {
			//send request to google api:recaptcha
			grecaptcha.ready(function() {
				grecaptcha.execute('6LeVRTopAAAAAKe_yHb5gw2AoLpSxUnLK_h3lGDY', {
					action: 'submit'
				}).then(function(token) {
					const formData = new FormData();
					formData.append('name', visitorName.val());
					formData.append('email', visitorEmail.val());
					formData.append('subject', subject.val());
					formData.append('message', message.val());
					formData.append('ctoken', token);
					formData.append('gaction', 'submit');
	
					Swal.fire({
		       	title: "Confirmation Notice!",
		    		text: "Please ensure that your messages are respectful and avoid any language or content that could be perceived as harmful or threatening. Kindness in communication is greatly appreciated.",
		        icon: "info",
		        showConfirmButton: true,
		        confirmButtonText: "Okay",
		        confirmButtonColor: "#4170a1",
		        showCancelButton: true,
		        cancelButtonText: "Cancel",
		        showLoaderOnConfirm: true,
		        allowEscapeKey : false,
		        allowOutsideClick: false,
		        preConfirm: (result) => { 
		          if(!result) {
		            return false;
		          } else {
		            return new Promise(function(resolve) { 
		              setTimeout(function () { 
		              	// send ajax request to the server
										$.ajax({
				            	method: 'POST',
				            	contentType: false,
							        processData: false,
							        cache: false,
							        data: formData,
				            	dataType: 'json',
							        url: 'PUBLIC_API',
							        success: function(response) {
							        	console.log(response);
							        },
							        error: function(xhr, status, error) {
		    								const response = JSON.parse(xhr.responseText);
										    console.log(response);
										    console.log(error);
							        }
										}); 
		              }, 2000);
		            });
		          }
		        },
		      	allowOutsideClick: () => !Swal.isLoading()
		      });
				});
			});
		}
	});

	// Validation Helper
	visitorName.on('input', function() {
		$(this).removeClass('is-invalid');
		$('#validationNameFeedback').text('');
	});

	visitorEmail.on('input', function() {
		const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		//check if this email entered is valid or not
		if(!EMAIL_REGEX.test($(this).val())) {
			$(this).addClass('is-invalid');
			$('#validationEmailFeedback').text('Invalid email address! Please enter a valid email.');
		} else {
			$(this).removeClass('is-invalid');
			$('#validationEmailFeedback').text('');
		}
	});

	subject.on('input', function() {
		$(this).removeClass('is-invalid');
		$('#validationSubjectFeedback').text('');
	});

	message.on('input', function() {
		$(this).removeClass('is-invalid');
		$('#validationMessageFeedback').text('');
	});

})(jQuery);