from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'price', 'category', 'image']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter product name'}),
            'price': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Enter price'}),
            'category': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter category'}),
            'image': forms.ClearableFileInput(attrs={'class': 'form-control'}),
        }
