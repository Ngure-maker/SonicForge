from django.urls import path
from .views import CallbackView, STKPushView, VerifyPaymentView

urlpatterns = [
    path('stk-push/', STKPushView.as_view(), name='stk-push'),
    path('callback/', CallbackView.as_view(), name='payment-callback'),
    path('verify/', VerifyPaymentView.as_view(), name='payment-verify'),
]
