from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string


# Send Feedback Email (fails silently)
def send_feedback_email(feedback_data):
    from_email = settings.FEEDBACK_FROM_EMAIL
    to_email = settings.FEEDBACK_TO_EMAIL
    subject = settings.FEEDBACK_SUBJECT
    text_content = render_to_string(settings.FEEDBACK_TEMPLATE, feedback_data)
    send_mail(
        subject,
        text_content,
        from_email,
        [to_email],
        fail_silently=False,
    )
