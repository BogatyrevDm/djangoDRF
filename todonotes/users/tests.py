from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from mixer.backend.django import mixer

from user.views import UserCustomViewSet
from users.models import User



class TestUserViewSet():
    def setUp(self)->None:
        self.name = 'admin'
        self.password = 'admin_123'
        self.email = 'admin_123@mail.ru'
        self.data = {'username':'Sergey', 'first_name':'Sergey', 'last_name':'Sergeev', 'email':'Sergeev@mail.ru'}
        self.data_put = {'username': 'Nikolay', 'first_name': 'Nikolay', 'last_name': 'Nikoleev', 'email': 'Nikoleev@mail.ru'}
    def test_get_list(self):
        pass
    def tearDown(self)->None:
        pass