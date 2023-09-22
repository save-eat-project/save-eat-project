from django.urls import path
from django.conf import settings

from .finder import NextJsFinder
from .views import NextJsView
from django.views.decorators.csrf import ensure_csrf_cookie
from django.shortcuts import redirect


def page_path(template: str):
    route = (
        template
        .removesuffix('.html')  # clean url
        .translate(str.maketrans('[]', '<>'))  # nextjs dynamic route
    )

    if route == 'index':
        route = ''

    view = ensure_csrf_cookie(NextJsView.as_view(template_name=template))

    return path(route, view)


finder = NextJsFinder()

if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns = [
        path('init', ensure_csrf_cookie(lambda req: redirect('/'))),
        *static('/', document_root=finder.NEXTJS_DIR),
    ]
else:
    urlpatterns = [
        page_path(template) for template in finder.list_template()
    ]
