from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from mixer.backend.django import mixer

from users.views import UserCustomViewSet
from users.models import User



class TestUserViewSet(TestCase):
    def setUp(self)->None:
        self.name = 'admin'
        self.password = 'admin_123'
        self.email = 'admin_123@mail.ru'
        self.data = {'username':'Sergey', 'first_name':'Sergey', 'last_name':'Sergeev', 'email':'Sergeev@mail.ru'}
        self.data_put = {'username': 'Nikolay', 'first_name': 'Nikolay', 'last_name': 'Nikoleev', 'email': 'Nikoleev@mail.ru'}
        self.url = '/api/users/'
    def test_get_list(self):
        factory = APIRequestFactory()

        request = factory.get(self.url)
        view = UserCustomViewSet.as_view({'get':'list'})
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail(self):
        client = APIClient()
        user = User.objects.create(**self.data)
        response = client.get(f'{self.url}{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    def test_create_user(self):
        client = APIClient()
        user = User.objects.create(**self.data)
        response = client.put(f'{self.url}{user.id}/', self.data_put)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def tearDown(self)->None:
        pass