from django.urls import path
from django.conf import settings

from .finder import NextJsFinder
from .views import NextJsView


def page_path(template: str):
    route = (
        template
        .removesuffix('.html')  # clean url
        .translate(str.maketrans('[]', '<>'))  # nextjs dynamic route
    )

    if route == 'index':
        route = ''

    return path(route, NextJsView.as_view(template_name=template))


finder = NextJsFinder()

urlpatterns = [
    page_path(template) for template in finder.list_template()
]

if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static('/', document_root=finder.NEXTJS_DIR)
