# React Native Developer Interview Challenge

## Overview
This is a comprehensive React Native form validation challenge designed to test a developer's ability to create functional, well-validated forms with proper user experience.

## Challenge Location
Navigate to the "Challenge" tab in the app to see the interview challenge form.

## What's Already Implemented (Starting Point)
- Basic form structure with all required fields
- UI layout and styling
- TypeScript interfaces for form data
- Basic state management setup
- Custom country picker modal

## What Needs to be Implemented (The Challenge)

### Core Requirements

#### 1. Form Validation Functions
Complete the following validation functions:
- `validateEmail()` - ✅ DONE (Example provided)
- `validatePassword()` - ✅ DONE (Example provided) 
- `validatePhone()` - ✅ DONE (Example provided)
- `validateForm()` - ✅ DONE (Example provided)

#### 2. Real-time Validation
- Implement real-time validation as users type
- Clear errors when fields become valid
- Show appropriate error messages

#### 3. Phone Number Formatting
- Format phone input as user types: `(XXX) XXX-XXXX`
- Auto-format while maintaining cursor position

#### 4. Form Submission
- Prevent submission until all validations pass
- Show success message on valid submission
- Reset form after successful submission

### Validation Rules

| Field | Rules |
|-------|-------|
| First Name | Required, minimum 2 characters |
| Last Name | Required, minimum 2 characters |
| Email | Required, valid email format |
| Phone | Required, format: (XXX) XXX-XXXX |
| Password | Required, min 8 chars, include: uppercase, lowercase, number |
| Confirm Password | Required, must match password |
| Country | Required, must select from dropdown |
| Age | Required, must be 18 or older |
| Terms | Required, must be checked |

### Bonus Points
- Smooth animations for error states
- Proper keyboard handling (KeyboardAvoidingView)
- Accessibility features (screen reader support)
- Clean, professional UI design
- Proper TypeScript implementation
- Performance optimizations

## Time Limit
**45 minutes** for core functionality
**Additional 15 minutes** for bonus features

## Evaluation Criteria

### Technical Skills (40%)
- Code quality and organization
- Proper TypeScript usage
- React hooks implementation
- State management

### Form Handling (30%)
- Validation accuracy
- Real-time feedback
- Error handling
- User experience

### UI/UX (20%)
- Visual design
- Responsiveness
- Accessibility
- Animation/transitions

### Problem Solving (10%)
- Code efficiency
- Edge case handling
- Creative solutions

## Getting Started

1. Navigate to the Challenge tab
2. Examine the existing code structure
3. Implement the TODOs marked in the code
4. Test thoroughly on different devices/orientators

## Tips for Success

1. **Start with core functionality** before adding enhancements
2. **Test each validation rule** as you implement it
3. **Use React DevTools** to debug state changes
4. **Consider edge cases** (empty strings, special characters, etc.)
5. **Focus on user experience** - clear feedback and smooth interactions

## Common Pitfalls to Avoid

- Not handling edge cases in validation
- Poor state management causing unnecessary re-renders
- Forgetting to clear errors when fields become valid
- Not testing on different screen sizes
- Overcomplicated validation logic

Good luck! 🚀
