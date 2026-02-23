import base64
import os
from datetime import datetime

import requests
from django.utils import timezone


class DarajaService:
    def __init__(self):
        env = os.getenv('DARAJA_ENV', 'sandbox').lower()
        self.base_url = (
            'https://sandbox.safaricom.co.ke'
            if env == 'sandbox'
            else 'https://api.safaricom.co.ke'
        )
        self.consumer_key = os.getenv('DARAJA_CONSUMER_KEY', '')
        self.consumer_secret = os.getenv('DARAJA_CONSUMER_SECRET', '')
        self.shortcode = os.getenv('DARAJA_SHORTCODE', '')
        self.passkey = os.getenv('DARAJA_PASSKEY', '')
        self.callback_url = os.getenv('CALLBACK_URL', '')

    def _timestamp(self):
        return timezone.now().strftime('%Y%m%d%H%M%S')

    def _password(self, timestamp):
        raw = f'{self.shortcode}{self.passkey}{timestamp}'
        return base64.b64encode(raw.encode()).decode()

    def get_access_token(self):
        url = f'{self.base_url}/oauth/v1/generate?grant_type=client_credentials'
        response = requests.get(url, auth=(self.consumer_key, self.consumer_secret), timeout=15)
        response.raise_for_status()
        return response.json().get('access_token')

    def stk_push(self, *, phone_number, amount, account_reference, transaction_desc):
        token = self.get_access_token()
        timestamp = self._timestamp()
        url = f'{self.base_url}/mpesa/stkpush/v1/processrequest'
        headers = {'Authorization': f'Bearer {token}'}
        payload = {
            'BusinessShortCode': self.shortcode,
            'Password': self._password(timestamp),
            'Timestamp': timestamp,
            'TransactionType': 'CustomerPayBillOnline',
            'Amount': int(amount),
            'PartyA': phone_number,
            'PartyB': self.shortcode,
            'PhoneNumber': phone_number,
            'CallBackURL': self.callback_url,
            'AccountReference': account_reference,
            'TransactionDesc': transaction_desc,
        }
        response = requests.post(url, json=payload, headers=headers, timeout=20)
        response.raise_for_status()
        return response.json()

    def query_status(self, *, checkout_request_id):
        token = self.get_access_token()
        timestamp = self._timestamp()
        url = f'{self.base_url}/mpesa/stkpushquery/v1/query'
        headers = {'Authorization': f'Bearer {token}'}
        payload = {
            'BusinessShortCode': self.shortcode,
            'Password': self._password(timestamp),
            'Timestamp': timestamp,
            'CheckoutRequestID': checkout_request_id,
        }
        response = requests.post(url, json=payload, headers=headers, timeout=20)
        response.raise_for_status()
        return response.json()
