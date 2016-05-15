'use strict';

(function () {
	var INVITER_URL = 'https://tech-munich-inviter.herokuapp.com/invitations';
	var NOTIFICATION_VISIBILITY_CLASS = 'shown';
	var mailFormElementIdentifier = 'invitation[email]';

	var invitationForm = document.querySelector('#invitationForm');
	var notificationSuccess = document.querySelector('#invitationFormSuccess');
	var notificationFail = document.querySelector('#invitationFormFail');

	function restoreViews() {
		notificationSuccess.classList.remove(NOTIFICATION_VISIBILITY_CLASS);
		notificationFail.classList.remove(NOTIFICATION_VISIBILITY_CLASS);
	}

	function delayedHide() {
		setTimeout(restoreViews, 5000);
	}

	invitationForm.addEventListener('submit', function (event) {
		event.preventDefault();

		restoreViews();

		var request = new XMLHttpRequest();
		var mail = invitationForm.elements[mailFormElementIdentifier].value;
		var encodedMail = encodeURIComponent(mail);
		var encodedIdentifier = encodeURIComponent(mailFormElementIdentifier);
		var encodedParams = encodedIdentifier + "=" + encodedMail;

		request.open('POST', INVITER_URL, true);
		request.onload = function () {
			if (request.status >= 200 && request.status < 400) {
				notificationSuccess.classList.add(NOTIFICATION_VISIBILITY_CLASS);
			} else {
				notificationFail.classList.add(NOTIFICATION_VISIBILITY_CLASS);
			}
			invitationForm.disabled = false;
			delayedHide();
		};

		request.onerror = function () {
			notificationFail.classList.add(NOTIFICATION_VISIBILITY_CLASS);
			invitationForm.disabled = false;
			delayedHide();
		};

		invitationForm.disabled = true;

		request.send(encodedParams);
	});
})();
