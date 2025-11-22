from rest_framework import serializers

# API APP - SERIALIZERS
# Owner: Colin (Backend Lead)
# Status: EMPTY - needs implementation
#
# Purpose: Convert Django models to/from JSON for authentication endpoints
#
# TODO:
# - Create LoginSerializer (email, password)
# - Create SignupSerializer (username, email, password, password_confirm)
# - Add validation methods (validate_email, validate_password)
# - Add password hashing in create method
# - Return appropriate fields (exclude password hash from responses)
#
# Example:
# class SignupSerializer(serializers.Serializer):
#     username = serializers.CharField(max_length=150)
#     email = serializers.EmailField()
#     password = serializers.CharField(write_only=True)
#     
#     def validate_email(self, value):
#         # Check if email already exists
#         pass
#
# Create your serializers here.
