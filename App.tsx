import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
  DynamicForm,
  FieldType,
  TextInput,
  Toggle,
  RadioGroup,
  Checkbox,
} from '@xkshxt/dynamic-form-lib';
import { z } from 'zod';

export default function App() {
  const formConfig = {
    sections: [
      {
        title: 'Personal Information',
        fields: [
          {
            name: 'firstName',
            type: 'text' as FieldType,
            label: 'First Name',
            required: true,
            validation: z.string().min(2, 'Name must be at least 2 characters'),
          },
          {
            name: 'email',
            type: 'text' as FieldType,
            label: 'Email',
            validation: z.string().email('Invalid email format'),
          },
        ],
      },
      {
        title: 'Preferences',
        fields: [
          {
            name: 'notifications',
            type: 'toggle' as FieldType,
            label: 'Enable Notifications',
          },
          {
            name: 'gender',
            type: 'radio' as FieldType,
            label: 'Gender',
            options: [
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
              { label: 'Other', value: 'other' },
            ],
            props: {
              options: [
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
                { label: 'Other', value: 'other' },
              ]
            }
          },
          {
            name: 'interests',
            type: 'checkbox' as FieldType,
            label: 'Interests',
            validation: z.array(z.string()).min(1, 'Select at least one interest'),
            options: [
              { label: 'Sports', value: 'sports' },
              { label: 'Music', value: 'music' },
              { label: 'Reading', value: 'reading' },
            ],
            props: {
              options: [
                { label: 'Sports', value: 'sports' },
                { label: 'Music', value: 'music' },
                { label: 'Reading', value: 'reading' },
              ],
              multiple: true, // Enable multiple selection
              defaultValue: [], // Initialize with empty array
            }
          },
        ],
      },
    ],
    components: {
      text: TextInput,
      toggle: Toggle,
      radio: RadioGroup,
      checkbox: Checkbox,
    },
  };

  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data);
    // Format the data for better display
    const formattedData = {
      ...data,
      interests: Array.isArray(data.interests) 
        ? data.interests 
        : (data.interests ? ['interests'] : [])
    };
    alert(JSON.stringify(formattedData, null, 2));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <DynamicForm
          {...formConfig}
          onSubmit={handleSubmit}
          formTitle="Demo Form"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
  },
});