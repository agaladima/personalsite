class UserMailer < ApplicationMailer
	default from: 'arum.galadima@gmail.com'

	def signup_confirmation(user)
		@user
		@greeting = 'Hi'

		mail(to: user.email, subject: 'Thanks for reaching out!')
	end
end
