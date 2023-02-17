from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from todo.models import Project, Todo
from todo.serializers import ProjectModelSerializer, TodoModelSerializer


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    def get_queryset(self):
        name = self.request.query_params.get('name','')
        project = Project.objects.all()
        if name:
            project = project.filter(name__contains=name)
        return project

class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    def get_queryset(self):
        project = self.request.query_params.get('project','')
        todo = Todo.objects.all()
        if project:
            todo = todo.filter(project=project)
        return todo
