from drf_spectacular.extensions import OpenApiAuthenticationExtension

class TokenAuthenticationScheme(OpenApiAuthenticationExtension):
    target_class = "knox.auth.TokenAuthentication"
    name = "ApiAuthorization"

    def get_security_definition(self, auto_schema):        
        return {
            "type": "apiKey",
            "in": "header",
            "name": "Authorization",
        }

