from django.db import models

from users.models import User


class Project(models.Model):
    name = models.CharField(max_length=50)
    url = models.URLField()
    users = models.ManyToManyField(User)

class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.CharField(max_length=250)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    active = models.BooleanField(default=False)