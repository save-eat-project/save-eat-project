from django.views import View
from django.template.response import TemplateResponse


class NextJsView(View):

    template_name: str | None = None

    def get(self, request, **kwargs):
        return TemplateResponse(request, self.template_name)
