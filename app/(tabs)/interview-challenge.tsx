import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

/**
 * REACT NATIVE DEVELOPER INTERVIEW CHALLENGE
 * 
 * Instructions:
 * Create a user registration form with the following requirements:
 * 
 * FORM FIELDS:
 * 1. First Name (required, min 2 characters)
 * 2. Last Name (required, min 2 characters)
 * 3. Email (required, valid email format)
 * 4. Phone Number (required, format: (XXX) XXX-XXXX)
 * 5. Password (required, min 8 characters, must include: uppercase, lowercase, number)
 * 6. Confirm Password (required, must match password)
 * 7. Country (dropdown/picker, required)
 * 8. Age (required, must be 18 or older)
 * 9. Terms & Conditions checkbox (required)
 * 
 * VALIDATION REQUIREMENTS:
 * - Real-time validation as user types
 * - Show error messages below each field
 * - Disable submit button until all validations pass
 * - Show success message after successful submission
 * 
 * BONUS POINTS:
 * - Smooth animations for error states
 * - Proper keyboard handling
 * - Accessibility features
 * - Clean, professional UI design
 * - TypeScript implementation
 * 
 * TIME LIMIT: 45 minutes
 */

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  country: string;
  age: string;
  acceptTerms: boolean;
};

type FormErrors = {
  [K in keyof FormData]?: string;
};

const countries = [
  { label: 'Select Country', value: '' },
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Australia', value: 'au' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
  { label: 'Mexico', value: 'mx' },
];

export default function InterviewChallenge() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    country: '',
    age: '',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  // TODO: Implement validation functions
  const validateEmail = (email: string): boolean => {
    // Implement email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    // Implement password validation (min 8 chars, uppercase, lowercase, number)
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    return password.length >= 8 && hasUppercase && hasLowercase && hasNumber;
  };

  const validatePhone = (phone: string): boolean => {
    // Implement phone validation (XXX) XXX-XXXX format
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validate all fields
    if (!formData.firstName || formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }
    
    if (!formData.lastName || formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }
    
    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone || !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.password || !validatePassword(formData.password)) {
      newErrors.password = 'Password must meet requirements';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.country) {
      newErrors.country = 'Please select a country';
    }
    
    const age = parseInt(formData.age);
    if (!formData.age || isNaN(age) || age < 18) {
      newErrors.age = 'Age must be 18 or older';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field if it becomes valid
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsSubmitted(true);
      Alert.alert(
        'Success!',
        'Registration completed successfully!',
        [{ text: 'OK', onPress: () => {
          setIsSubmitted(false);
          // Reset form
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            country: '',
            age: '',
            acceptTerms: false,
          });
          setErrors({});
        }}]
      );
    }
  };

  const formatPhoneNumber = (text: string): string => {
    // Remove all non-digits
    const digits = text.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
  };

  const selectCountry = (country: { label: string; value: string }) => {
    handleInputChange('country', country.value);
    setShowCountryPicker(false);
  };

  const getSelectedCountryLabel = () => {
    const selected = countries.find(c => c.value === formData.country);
    return selected ? selected.label : 'Select Country';
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>User Registration</Text>
          <Text style={styles.subtitle}>React Native Developer Challenge</Text>
        </View>

        <View style={styles.form}>
          {/* First Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>First Name *</Text>
            <TextInput
              style={[styles.input, errors.firstName && styles.inputError]}
              value={formData.firstName}
              onChangeText={(text) => handleInputChange('firstName', text)}
              placeholder="Enter your first name"
              autoCapitalize="words"
            />
            {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
          </View>

          {/* Last Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last Name *</Text>
            <TextInput
              style={[styles.input, errors.lastName && styles.inputError]}
              value={formData.lastName}
              onChangeText={(text) => handleInputChange('lastName', text)}
              placeholder="Enter your last name"
              autoCapitalize="words"
            />
            {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          {/* Phone */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={[styles.input, errors.phone && styles.inputError]}
              value={formData.phone}
              onChangeText={(text) => handleInputChange('phone', formatPhoneNumber(text))}
              placeholder="(XXX) XXX-XXXX"
              keyboardType="phone-pad"
              maxLength={14}
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password *</Text>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              placeholder="Enter your password"
              secureTextEntry
              autoCapitalize="none"
            />
            <Text style={styles.helperText}>
              Min 8 characters, include uppercase, lowercase, and number
            </Text>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password *</Text>
            <TextInput
              style={[styles.input, errors.confirmPassword && styles.inputError]}
              value={formData.confirmPassword}
              onChangeText={(text) => handleInputChange('confirmPassword', text)}
              placeholder="Confirm your password"
              secureTextEntry
              autoCapitalize="none"
            />
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
          </View>

          {/* Country Picker */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Country *</Text>
            <TouchableOpacity
              style={[styles.input, styles.countrySelector, errors.country && styles.inputError]}
              onPress={() => setShowCountryPicker(true)}
            >
              <Text style={[styles.countrySelectorText, !formData.country && styles.placeholder]}>
                {getSelectedCountryLabel()}
              </Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
            {errors.country && <Text style={styles.errorText}>{errors.country}</Text>}
          </View>

          {/* Country Picker Modal */}
          <Modal
            visible={showCountryPicker}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowCountryPicker(false)}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              onPress={() => setShowCountryPicker(false)}
            >
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Select Country</Text>
                  <TouchableOpacity
                    onPress={() => setShowCountryPicker(false)}
                    style={styles.closeButton}
                  >
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={countries.filter(c => c.value !== '')}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.countryOption}
                      onPress={() => selectCountry(item)}
                    >
                      <Text style={styles.countryOptionText}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableOpacity>
          </Modal>

          {/* Age */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age *</Text>
            <TextInput
              style={[styles.input, errors.age && styles.inputError]}
              value={formData.age}
              onChangeText={(text) => handleInputChange('age', text)}
              placeholder="Enter your age"
              keyboardType="numeric"
              maxLength={3}
            />
            <Text style={styles.helperText}>Must be 18 or older</Text>
            {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}
          </View>

          {/* Terms & Conditions */}
          <View style={styles.checkboxGroup}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => handleInputChange('acceptTerms', !formData.acceptTerms)}
            >
              <View style={[styles.checkboxBox, formData.acceptTerms && styles.checkboxChecked]}>
                {formData.acceptTerms && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>
                I accept the Terms & Conditions *
              </Text>
            </TouchableOpacity>
            {errors.acceptTerms && <Text style={styles.errorText}>{errors.acceptTerms}</Text>}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, !validateForm() && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={!validateForm()}
          >
            <Text style={[styles.submitButtonText, !validateForm() && styles.submitButtonTextDisabled]}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 5,
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#495057',
  },
  inputError: {
    borderColor: '#dc3545',
  },
  countrySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  countrySelectorText: {
    fontSize: 16,
    color: '#495057',
  },
  placeholder: {
    color: '#6c757d',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#6c757d',
  },
  helperText: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#dc3545',
    marginTop: 4,
  },
  checkboxGroup: {
    marginBottom: 30,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ced4da',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#495057',
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonDisabled: {
    backgroundColor: '#e9ecef',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonTextDisabled: {
    color: '#6c757d',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#6c757d',
  },
  countryOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  countryOptionText: {
    fontSize: 16,
    color: '#495057',
  },
});
