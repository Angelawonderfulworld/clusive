from django.urls import path
from . import views

urlpatterns = [
    path('glossdef/<document>/<int:cued>/<word>', views.glossdef, name='glossdef'),
    path('checklist/<document>', views.checklist, name='checklist'),
    path('cuelist/<document>/<int:version>', views.cuelist, name='cuelist'),
    path('rating/<word>/<int:rating>', views.set_word_rating, name='set_word_rating'),
    path('rating/<word>', views.get_word_rating, name='get_word_rating'),
    path('interest/remove/<word>', views.word_bank_remove, name='word_bank_remove'),
]
