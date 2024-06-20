import { View, Text, TextInput, Touchable, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'

export type FormFieldProps = {
    title: string;
    value: string;
    handleTextChange: (text: string) => void;
    otherStyles?: string;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    placeholder?: string;
    textStyles?: string;
}

const FormField = ({
  title,
  value,
  handleTextChange,
  otherStyles,
  keyboardType,
  placeholder,
  textStyles,
}: FormFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
        <Text 
            className={`
                text-sm text-gray-100 font-pmedium
                ${textStyles}
            `}
        >
            {title}
        </Text>

        <View 
            className='
                border-2 border-black-200 w-full h-16 mt-3 bg-black-100
                rounded-2xl items-center flex-row px-4
                focus:border-secondary-200
            '
        >
            <TextInput 
                className='
                    flex-1 text-white text-base font-pmedium
                '
                value={value}
                placeholder={placeholder}
                placeholderTextColor={'#7B7B8B'}
                onChangeText={handleTextChange}
                secureTextEntry={title === 'Password' && !showPassword}
            />

            { title === "Password" && <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
            >
                <Image
                    source={showPassword ? icons.eye : icons.eyeHide }
                    className='w-6 h-6 '
                    resizeMode='contain'
                />
            </TouchableOpacity>}
        </View>
    </View>
  );
};

export default FormField