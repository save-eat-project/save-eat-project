from django.db import models


from user.models import User
# from django.contrib.gis.db import models


class Place(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    code = models.CharField(max_length=20, null=True)
    # geolocation = models.GeometryField(null=True)
    address = models.CharField(max_length=100)


class Eat(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=20)
    rating = models.PositiveSmallIntegerField()
    price = models.IntegerField()
    comment = models.CharField(max_length=50)
    eat_time = models.DateTimeField()
    tags = models.ManyToManyField('Tag', through='EatTag')
    place = models.ForeignKey(Place, on_delete=models.CASCADE, null=True)


class Tag(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)


class EatTag(models.Model):
    eat = models.ForeignKey(Eat, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=('eat', 'tag'),
                name='unique_tag_per_eat'
            ),
        ]


class EatImage(models.Model):
    eat = models.ForeignKey(Eat, on_delete=models.CASCADE)
    # image = models.ImageField()
